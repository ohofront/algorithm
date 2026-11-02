import React, { useState, useMemo } from 'react';
import { Problem, UserStudyState, StudyStatus } from '../types/problem';
import { ProblemCard } from './ProblemCard';
import { ProblemTable } from './ProblemTable';
import { 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  RotateCcw,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  Star
} from 'lucide-react';

interface ProblemExplorerProps {
  problems: Problem[];
  studyData: Record<string, UserStudyState>;
  onSelectProblem: (problem: Problem) => void;
  onUpdateStatus: (problemId: string, status: StudyStatus) => void;
  onToggleBookmark: (problemId: string, isBookmarked: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (p: string) => void;
  selectedTier: string;
  setSelectedTier: (t: string) => void;
}

export const ProblemExplorer: React.FC<ProblemExplorerProps> = ({
  problems,
  studyData,
  onSelectProblem,
  onUpdateStatus,
  onToggleBookmark,
  selectedCategory,
  setSelectedCategory,
  selectedPlatform,
  setSelectedPlatform,
  selectedTier,
  setSelectedTier,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'diff_desc' | 'diff_asc' | 'id_asc' | 'title_asc'>('diff_desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  
  // Pagination: 'all' or number
  const [pageSize, setPageSize] = useState<number | 'all'>(30);
  const [currentPage, setCurrentPage] = useState(1);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const set = new Set<string>();
    problems.forEach(p => p.tags.forEach(t => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'ko'));
  }, [problems]);

  // Filtering & Sorting
  const filteredProblems = useMemo(() => {
    return problems
      .filter((problem) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchTitle = problem.title.toLowerCase().includes(q);
          const matchNum = problem.problemNumber.toLowerCase().includes(q);
          const matchTags = problem.tags.some(t => t.toLowerCase().includes(q));
          const matchConcept = problem.concept.toLowerCase().includes(q);
          if (!matchTitle && !matchNum && !matchTags && !matchConcept) {
            return false;
          }
        }

        // Platform
        if (selectedPlatform && selectedPlatform !== 'all') {
          if (problem.platform !== selectedPlatform) return false;
        }

        // Tier
        if (selectedTier && selectedTier !== 'all') {
          if (!problem.tier.toLowerCase().includes(selectedTier.toLowerCase())) {
            return false;
          }
        }

        // Category Tag
        if (selectedCategory && selectedCategory !== 'all') {
          if (!problem.tags.includes(selectedCategory)) return false;
        }

        // Study Status
        const userState = studyData[problem.id];
        if (statusFilter === 'bookmarked') {
          if (!userState?.isBookmarked) return false;
        } else if (statusFilter === 'review_needed') {
          if (userState?.status !== 'review_needed') return false;
        } else if (statusFilter === 'mastered') {
          if (userState?.status !== 'mastered') return false;
        } else if (statusFilter === 'solved') {
          if (userState?.status !== 'solved') return false;
        } else if (statusFilter === 'in_progress') {
          if (userState?.status !== 'in_progress') return false;
        } else if (statusFilter === 'not_started') {
          if (userState && userState.status !== 'not_started') return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'diff_desc') {
          return b.difficultyWeight - a.difficultyWeight;
        }
        if (sortBy === 'diff_asc') {
          return a.difficultyWeight - b.difficultyWeight;
        }
        if (sortBy === 'id_asc') {
          return (parseInt(a.problemNumber, 10) || 0) - (parseInt(b.problemNumber, 10) || 0);
        }
        if (sortBy === 'title_asc') {
          return a.title.localeCompare(b.title, 'ko');
        }
        return 0;
      });
  }, [
    problems,
    searchQuery,
    selectedPlatform,
    selectedTier,
    selectedCategory,
    statusFilter,
    sortBy,
    studyData,
  ]);

  // Reset to page 1 on filter changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedPlatform, selectedTier, selectedCategory, statusFilter, sortBy, pageSize]);

  // Pagination calculation
  const totalItems = filteredProblems.length;
  const isShowAll = pageSize === 'all';
  const effectivePageSize = isShowAll ? totalItems : (pageSize as number);
  const totalPages = isShowAll ? 1 : Math.max(1, Math.ceil(totalItems / effectivePageSize));
  
  const paginatedProblems = useMemo(() => {
    if (isShowAll) return filteredProblems;
    const start = (currentPage - 1) * effectivePageSize;
    return filteredProblems.slice(start, start + effectivePageSize);
  }, [filteredProblems, isShowAll, currentPage, effectivePageSize]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('all');
    setSelectedTier('all');
    setSelectedCategory('all');
    setStatusFilter('all');
    setSortBy('diff_desc');
  };

  const hasActiveFilters = 
    Boolean(searchQuery) ||
    selectedPlatform !== 'all' ||
    selectedTier !== 'all' ||
    selectedCategory !== 'all' ||
    statusFilter !== 'all';

  return (
    <div id="problem-explorer" className="space-y-6">
      {/* Search & Control Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        {/* Top Search Input & View Toggles */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="문제 번호, 제목, 알고리즘 유형(#DP, #스택), 접근법 검색..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-sm text-slate-100 placeholder-slate-400 outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                지우기
              </button>
            )}
          </div>

          {/* View Mode & Page Size */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-slate-950/70 border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="카드 그리드 보기"
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden md:inline">카드</span>
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors ${
                  viewMode === 'table'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="목록 테이블 보기"
              >
                <List className="w-4 h-4" />
                <span className="hidden md:inline">목록</span>
              </button>
            </div>

            {/* Page Size Selector (Show All option included!) */}
            <select
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="px-3 py-2 rounded-xl bg-slate-950/70 border border-slate-800 text-xs font-medium text-slate-300 outline-none cursor-pointer hover:border-slate-700 transition-colors"
            >
              <option value={15}>15개씩 보기</option>
              <option value={30}>30개씩 보기</option>
              <option value={60}>60개씩 보기</option>
              <option value="all">모든 문제 보기 (155개)</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
            필터:
          </span>

          {/* Platform Filter */}
          <div className="flex rounded-lg bg-slate-950 p-0.5 border border-slate-800">
            {['all', 'Baekjoon', 'Programmers'].map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  selectedPlatform === p
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {p === 'all' ? '전체 플랫폼' : p === 'Baekjoon' ? '백준 (123)' : '프로그래머스 (32)'}
              </button>
            ))}
          </div>

          {/* Tier Filter */}
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 outline-none cursor-pointer"
          >
            <option value="all">전체 난이도</option>
            <option value="Gold">Gold (골드)</option>
            <option value="Silver">Silver (실버)</option>
            <option value="Bronze">Bronze (브론즈)</option>
            <option value="Level 2">Level 2</option>
            <option value="Level 1">Level 1</option>
          </select>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 outline-none cursor-pointer max-w-[140px]"
          >
            <option value="all">전체 알고리즘 유형</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          {/* Study Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 outline-none cursor-pointer"
          >
            <option value="all">전체 학습 상태</option>
            <option value="bookmarked">⭐ 즐겨찾기</option>
            <option value="review_needed">🔄 복습 필요</option>
            <option value="mastered">✅ 완전 정복</option>
            <option value="solved">풀이 완료</option>
            <option value="in_progress">학습 중</option>
            <option value="not_started">미학습</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 outline-none cursor-pointer ml-auto"
          >
            <option value="diff_desc">난이도 높은 순</option>
            <option value="diff_asc">난이도 낮은 순</option>
            <option value="id_asc">문제 번호 순</option>
            <option value="title_asc">가나다 순</option>
          </select>

          {/* Reset button */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              초기화
            </button>
          )}
        </div>
      </div>

      {/* Result Status Banner */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          총 <strong className="text-white font-bold">{totalItems}개</strong>의 문제가 검색되었습니다.
          {!isShowAll && totalItems > 0 && (
            <span className="ml-1 text-slate-400">
              ({((currentPage - 1) * effectivePageSize) + 1} ~ {Math.min(currentPage * effectivePageSize, totalItems)}개 표시)
            </span>
          )}
          {isShowAll && (
            <span className="ml-1 text-indigo-400 font-semibold">
              (모든 {totalItems}개 문제 전체 표시 중)
            </span>
          )}
        </div>

        {/* Quick Page Jump if multiple pages */}
        {!isShowAll && totalPages > 1 && (
          <div className="flex items-center gap-1">
            <span>페이지 {currentPage} / {totalPages}</span>
          </div>
        )}
      </div>

      {/* Problems Display: Grid or Table */}
      {paginatedProblems.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">조건에 맞는 문제가 없습니다</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            검색어나 필터 조건을 변경하거나 필터를 초기화하여 전체 155개 문제를 확인하세요.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            전체 문제 보기로 초기화
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProblems.map((problem) => (
            <ProblemCard
              key={problem.id}
              problem={problem}
              studyState={
                studyData[problem.id] || {
                  status: 'not_started',
                  isBookmarked: false,
                  notes: '',
                }
              }
              onSelect={onSelectProblem}
              onUpdateStatus={onUpdateStatus}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      ) : (
        <ProblemTable
          problems={paginatedProblems}
          studyData={studyData}
          onSelect={onSelectProblem}
          onUpdateStatus={onUpdateStatus}
          onToggleBookmark={onToggleBookmark}
        />
      )}

      {/* Pagination Controls */}
      {!isShowAll && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="첫 페이지"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="이전 페이지"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Page numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => {
                return (
                  p === 1 ||
                  p === totalPages ||
                  Math.abs(p - currentPage) <= 2
                );
              })
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && p - prev > 1;

                return (
                  <React.Fragment key={p}>
                    {showEllipsis && (
                      <span className="px-2 text-slate-400 text-xs">...</span>
                    )}
                    <button
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                        currentPage === p
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                    >
                      {p}
                    </button>
                  </React.Fragment>
                );
              })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="다음 페이지"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            title="마지막 페이지"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
