import React from 'react';
import { Problem, UserStudyState } from '../types/problem';
import { 
  Trophy, 
  Target, 
  Brain, 
  Flame, 
  Layers, 
  Compass, 
  ArrowRight,
  TrendingUp,
  RotateCcw
} from 'lucide-react';

interface DashboardProps {
  problems: Problem[];
  studyData: Record<string, UserStudyState>;
  onSelectProblem: (problem: Problem) => void;
  onFilterCategory: (category: string) => void;
  onFilterPlatform: (platform: string) => void;
  onFilterTier: (tier: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  problems,
  studyData,
  onSelectProblem,
  onFilterCategory,
  onFilterPlatform,
  onFilterTier,
}) => {
  // Statistics calculations
  const totalCount = problems.length;
  const bjCount = problems.filter(p => p.platform === 'Baekjoon').length;
  const pgCount = problems.filter(p => p.platform === 'Programmers').length;

  const masteredCount = Object.values(studyData).filter(s => s.status === 'mastered').length;
  const solvedCount = Object.values(studyData).filter(s => s.status === 'solved').length;
  const reviewCount = Object.values(studyData).filter(s => s.status === 'review_needed').length;
  const inProgressCount = Object.values(studyData).filter(s => s.status === 'in_progress').length;

  // Tier counts
  const goldCount = problems.filter(p => p.tier.toLowerCase().includes('gold')).length;
  const silverCount = problems.filter(p => p.tier.toLowerCase().includes('silver')).length;
  const bronzeCount = problems.filter(p => p.tier.toLowerCase().includes('bronze')).length;
  const pgLv2Count = problems.filter(p => p.tier.toLowerCase().includes('2')).length;
  const pgLv1Count = pgCount - pgLv2Count;

  // Category counts
  const categoryMap: Record<string, number> = {};
  problems.forEach(p => {
    p.tags.forEach(tag => {
      categoryMap[tag] = (categoryMap[tag] || 0) + 1;
    });
  });

  const topCategories = Object.entries(categoryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Daily random recommendation (unmastered or review needed, or random)
  const candidateProblems = problems.filter(p => {
    const state = studyData[p.id];
    return !state || state.status !== 'mastered';
  });
  const recommended = candidateProblems.length > 0 
    ? candidateProblems[Math.floor(Math.random() * candidateProblems.length)]
    : problems[0];

  return (
    <div className="space-y-6">
      {/* Hero Welcome & Stats */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>알고리즘 마스터 학습 모드</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              체계적인 문제 복습과 핵심 알고리즘 체득
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              백준과 프로그래머스에 풀이한 총 <strong className="text-white font-semibold">{totalCount}개</strong>의
              문제에 대한 소스 코드, 시간/공간 복잡도, 핵심 접근법을 학습하고 나만의 학습 노트를 기록하세요.
            </p>

            {/* Progress Bar */}
            <div className="pt-2 max-w-xl">
              <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                <span>학습 정복도</span>
                <span className="font-semibold text-indigo-400">
                  {Math.round(((masteredCount + solvedCount) / totalCount) * 100)}% ({masteredCount + solvedCount}/{totalCount})
                </span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                <div 
                  className="bg-emerald-500 transition-all duration-500" 
                  style={{ width: `${(masteredCount / totalCount) * 100}%` }}
                  title={`완전 정복: ${masteredCount}개`}
                />
                <div 
                  className="bg-indigo-500 transition-all duration-500" 
                  style={{ width: `${(solvedCount / totalCount) * 100}%` }}
                  title={`풀이 완료: ${solvedCount}개`}
                />
                <div 
                  className="bg-amber-500 transition-all duration-500" 
                  style={{ width: `${(reviewCount / totalCount) * 100}%` }}
                  title={`복습 필요: ${reviewCount}개`}
                />
              </div>
              <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>정복 {masteredCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span>풀이 {solvedCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>복습 필요 {reviewCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                  <span>미완료 {totalCount - (masteredCount + solvedCount + reviewCount + inProgressCount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Recommendation Card */}
          {recommended && (
            <div className="bg-slate-900/90 rounded-xl border border-indigo-500/30 p-5 shadow-xl shadow-indigo-950/20 hover:border-indigo-500/50 transition-all">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                  <Brain className="w-4 h-4" />
                  오늘의 추천 학습
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {recommended.platform}
                </span>
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 line-clamp-1">
                {recommended.problemNumber ? `[${recommended.problemNumber}] ` : ''}{recommended.title}
              </h3>
              <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                {recommended.concept}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                <span className="text-xs text-slate-400">
                  난이도: <strong className="text-indigo-300">{recommended.tier}</strong>
                </span>
                <button
                  onClick={() => onSelectProblem(recommended)}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors shadow-sm"
                >
                  <span>학습 시작</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Grid: Platform Distribution & Tier Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Baekjoon Summary */}
        <div 
          onClick={() => onFilterPlatform('Baekjoon')}
          className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-xl cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-sm border border-sky-500/20">
                BOJ
              </div>
              <span className="font-semibold text-white">백준 (BOJ)</span>
            </div>
            <span className="text-2xl font-black text-white group-hover:text-sky-400 transition-colors">
              {bjCount}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <div 
              onClick={(e) => { e.stopPropagation(); onFilterTier('Gold'); }}
              className="p-2 rounded bg-slate-800/50 hover:bg-amber-500/20 hover:text-amber-300 transition-colors text-center"
            >
              <div className="text-amber-400 font-bold">Gold</div>
              <div className="text-slate-300 font-semibold">{goldCount}개</div>
            </div>
            <div 
              onClick={(e) => { e.stopPropagation(); onFilterTier('Silver'); }}
              className="p-2 rounded bg-slate-800/50 hover:bg-slate-500/20 hover:text-slate-200 transition-colors text-center"
            >
              <div className="text-slate-300 font-bold">Silver</div>
              <div className="text-slate-300 font-semibold">{silverCount}개</div>
            </div>
            <div 
              onClick={(e) => { e.stopPropagation(); onFilterTier('Bronze'); }}
              className="p-2 rounded bg-slate-800/50 hover:bg-orange-500/20 hover:text-orange-300 transition-colors text-center"
            >
              <div className="text-orange-400 font-bold">Bronze</div>
              <div className="text-slate-300 font-semibold">{bronzeCount}개</div>
            </div>
          </div>
        </div>

        {/* Programmers Summary */}
        <div 
          onClick={() => onFilterPlatform('Programmers')}
          className="bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-5 rounded-xl cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold text-sm border border-emerald-500/20">
                PG
              </div>
              <span className="font-semibold text-white">프로그래머스</span>
            </div>
            <span className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">
              {pgCount}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80 text-xs">
            <div 
              onClick={(e) => { e.stopPropagation(); onFilterTier('Level 2'); }}
              className="p-2 rounded bg-slate-800/50 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors text-center"
            >
              <div className="text-emerald-400 font-bold">Level 2</div>
              <div className="text-slate-300 font-semibold">{pgLv2Count}개</div>
            </div>
            <div 
              onClick={(e) => { e.stopPropagation(); onFilterTier('Level 1'); }}
              className="p-2 rounded bg-slate-800/50 hover:bg-teal-500/20 hover:text-teal-300 transition-colors text-center"
            >
              <div className="text-teal-400 font-bold">Lv.0 / 1 / 기초</div>
              <div className="text-slate-300 font-semibold">{pgLv1Count}개</div>
            </div>
          </div>
        </div>

        {/* Study Strategy / Quick Tips */}
        <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              학습 추천 가이드
            </div>
            <h4 className="font-semibold text-white text-sm mb-1">
              블라인드 연습 모드 활용
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              문제를 열 때 정답 코드를 먼저 보지 않고, 요구사항과 예제를 분석한 뒤 접근법을 머릿속으로 떠올려 보세요.
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800 mt-2">
            <span>자신만의 복습 메모 저장</span>
            <span className="text-emerald-400 font-medium">자동 로컬 저장</span>
          </div>
        </div>
      </div>

      {/* Top Algorithm Categories */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Layers className="w-4 h-4 text-indigo-400" />
            <span>주요 알고리즘 유형별 분류</span>
          </div>
          <span className="text-xs text-slate-400">클릭 시 해당 태그 문제 바로 탐색</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {topCategories.map(([category, count]) => (
            <button
              key={category}
              onClick={() => onFilterCategory(category)}
              className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 hover:border-indigo-500/50 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium transition-all flex items-center gap-1.5"
            >
              <span>{category}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-slate-900 text-[10px] text-slate-400 font-mono">
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
