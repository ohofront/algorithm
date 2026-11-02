import React, { useState, useEffect, useMemo } from 'react';
import { Problem, StudyStatus, UserStudyState } from './types/problem';
import problemList from './data/problems.json';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { ProblemExplorer } from './components/ProblemExplorer';
import { ProblemDetailModal } from './components/ProblemDetailModal';
import { 
  getUserStudyData, 
  updateProblemStudyState, 
  getProblemStudyState 
} from './utils/storage';
import { BookOpen, Github, Heart } from 'lucide-react';

export const App: React.FC = () => {
  const problems = problemList as Problem[];

  const [studyData, setStudyData] = useState<Record<string, UserStudyState>>({});
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'review' | 'bookmarked'>('all');

  // Filters shared with Dashboard
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Load study state from localStorage
  useEffect(() => {
    setStudyData(getUserStudyData());

    const handleStorageChange = () => {
      setStudyData(getUserStudyData());
    };

    window.addEventListener('algostudy-storage-changed', handleStorageChange);
    return () => window.removeEventListener('algostudy-storage-changed', handleStorageChange);
  }, []);

  // Update status handler
  const handleUpdateStatus = (problemId: string, status: StudyStatus) => {
    const updated = updateProblemStudyState(problemId, { status });
    setStudyData((prev) => ({ ...prev, [problemId]: updated }));
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (problemId: string, isBookmarked: boolean) => {
    const updated = updateProblemStudyState(problemId, { isBookmarked });
    setStudyData((prev) => ({ ...prev, [problemId]: updated }));
  };

  // Update notes handler
  const handleUpdateNotes = (problemId: string, notes: string) => {
    const updated = updateProblemStudyState(problemId, { notes });
    setStudyData((prev) => ({ ...prev, [problemId]: updated }));
  };

  // Calculate live statistics
  const stats = useMemo(() => {
    const total = problems.length;
    let solved = 0;
    let mastered = 0;
    let reviewNeeded = 0;
    let bookmarked = 0;

    Object.values(studyData).forEach((s) => {
      if (s.status === 'solved') solved++;
      if (s.status === 'mastered') mastered++;
      if (s.status === 'review_needed') reviewNeeded++;
      if (s.isBookmarked) bookmarked++;
    });

    return { total, solved, mastered, reviewNeeded, bookmarked };
  }, [problems, studyData]);

  // Tab filter integration
  const filteredByTabProblems = useMemo(() => {
    if (activeTab === 'review') {
      return problems.filter((p) => studyData[p.id]?.status === 'review_needed');
    }
    if (activeTab === 'bookmarked') {
      return problems.filter((p) => studyData[p.id]?.isBookmarked);
    }
    return problems;
  }, [problems, studyData, activeTab]);

  const scrollToExplorer = () => {
    const el = document.getElementById('problem-explorer');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stats={stats}
        onScrollToExplorer={scrollToExplorer}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Study Dashboard */}
        {activeTab === 'all' && (
          <Dashboard
            problems={problems}
            studyData={studyData}
            onSelectProblem={setSelectedProblem}
            onFilterCategory={(cat) => {
              setSelectedCategory(cat);
              scrollToExplorer();
            }}
            onFilterPlatform={(plat) => {
              setSelectedPlatform(plat);
              scrollToExplorer();
            }}
            onFilterTier={(tier) => {
              setSelectedTier(tier);
              scrollToExplorer();
            }}
          />
        )}

        {/* Tab Header Banner if review or bookmarked */}
        {activeTab !== 'all' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">
                {activeTab === 'review' ? '🔄 복습이 필요한 문제 모음' : '⭐ 즐겨찾기 등록 문제'}
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                {activeTab === 'review'
                  ? '실수했거나 다시 풀어보기로 표시한 문제들을 집중적으로 복습해보세요.'
                  : '중요하거나 다시 참고하고 싶은 문제들입니다.'}
              </p>
            </div>
            <button
              onClick={() => setActiveTab('all')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              전체 문제로 돌아가기
            </button>
          </div>
        )}

        {/* Problem Explorer (All Problems Catalog) */}
        <ProblemExplorer
          problems={filteredByTabProblems}
          studyData={studyData}
          onSelectProblem={setSelectedProblem}
          onUpdateStatus={handleUpdateStatus}
          onToggleBookmark={handleToggleBookmark}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPlatform={selectedPlatform}
          setSelectedPlatform={setSelectedPlatform}
          selectedTier={selectedTier}
          setSelectedTier={setSelectedTier}
        />
      </main>

      {/* Detail Modal */}
      {selectedProblem && (
        <ProblemDetailModal
          problem={selectedProblem}
          studyState={getProblemStudyState(selectedProblem.id)}
          onClose={() => setSelectedProblem(null)}
          onUpdateStatus={handleUpdateStatus}
          onToggleBookmark={handleToggleBookmark}
          onUpdateNotes={handleUpdateNotes}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-300">AlgoStudy Learning Hub</span>
            <span>—</span>
            <span>백준 & 프로그래머스 풀이 저장소</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
              Netlify Ready Static Deploy
            </span>
            <a
              href="https://github.com/ohofront/algorithm"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
