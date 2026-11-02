import React from 'react';
import { Problem, UserStudyState, StudyStatus } from '../types/problem';
import { 
  Star, 
  ExternalLink, 
  CheckCircle2, 
  RotateCcw, 
  Clock, 
  Cpu, 
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ProblemCardProps {
  problem: Problem;
  studyState: UserStudyState;
  onSelect: (problem: Problem) => void;
  onUpdateStatus: (problemId: string, status: StudyStatus) => void;
  onToggleBookmark: (problemId: string, isBookmarked: boolean) => void;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  problem,
  studyState,
  onSelect,
  onUpdateStatus,
  onToggleBookmark,
}) => {
  const getTierBadgeColor = (tier: string) => {
    const t = tier.toLowerCase();
    if (t.includes('gold')) {
      return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    }
    if (t.includes('silver')) {
      return 'bg-slate-400/15 text-slate-200 border-slate-400/30';
    }
    if (t.includes('bronze')) {
      return 'bg-orange-500/15 text-orange-300 border-orange-500/30';
    }
    if (t.includes('2')) {
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    }
    return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
  };

  const getStatusBadge = (status: StudyStatus) => {
    switch (status) {
      case 'mastered':
        return {
          label: '완전 정복',
          color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          icon: CheckCircle2,
        };
      case 'solved':
        return {
          label: '풀이 완료',
          color: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
          icon: CheckCircle2,
        };
      case 'review_needed':
        return {
          label: '복습 필요',
          color: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          icon: RotateCcw,
        };
      case 'in_progress':
        return {
          label: '학습 중',
          color: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          icon: BookOpen,
        };
      default:
        return {
          label: '미학습',
          color: 'bg-slate-800 text-slate-400 border-slate-700',
          icon: Sparkles,
        };
    }
  };

  const statusInfo = getStatusBadge(studyState.status);
  const StatusIcon = statusInfo.icon;

  return (
    <div 
      onClick={() => onSelect(problem)}
      className="group relative flex flex-col justify-between bg-slate-900/70 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-xl p-5 transition-all duration-200 hover:shadow-xl hover:shadow-indigo-950/20 cursor-pointer"
    >
      <div>
        {/* Header: Platform + Tier + Bookmark */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                problem.platform === 'Baekjoon'
                  ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}
            >
              {problem.platform === 'Baekjoon' ? 'BOJ' : '프로그래머스'}
            </span>

            <span
              className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getTierBadgeColor(
                problem.tier
              )}`}
            >
              {problem.tier}
            </span>

            {problem.problemNumber && (
              <span className="text-[11px] text-slate-400 font-mono">
                #{problem.problemNumber}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(problem.id, !studyState.isBookmarked);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-yellow-400 hover:bg-slate-800 transition-colors"
            title={studyState.isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'}
          >
            <Star
              className={`w-4 h-4 ${
                studyState.isBookmarked
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-slate-400 group-hover:text-slate-300'
              }`}
            />
          </button>
        </div>

        {/* Title */}
        <h3 className="font-bold text-slate-100 group-hover:text-indigo-300 text-base mb-2 line-clamp-1 transition-colors">
          {problem.title}
        </h3>

        {/* Concept / Strategy */}
        <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
          {problem.concept}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {problem.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[11px] text-slate-300 font-medium"
            >
              #{tag}
            </span>
          ))}
          {problem.tags.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md bg-slate-800 text-[10px] text-slate-400">
              +{problem.tags.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer: Runtime / Memory / Status Selector */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
          {problem.time && (
            <span className="flex items-center gap-1" title="실행 시간">
              <Clock className="w-3 h-3 text-slate-400" />
              {problem.time}
            </span>
          )}
          {problem.memory && (
            <span className="flex items-center gap-1" title="메모리 사용량">
              <Cpu className="w-3 h-3 text-slate-400" />
              {problem.memory}
            </span>
          )}
        </div>

        {/* Status Dropdown */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative inline-block"
        >
          <select
            value={studyState.status}
            onChange={(e) => onUpdateStatus(problem.id, e.target.value as StudyStatus)}
            className={`text-xs px-2.5 py-1 rounded-lg border appearance-none pr-6 cursor-pointer font-medium outline-none transition-colors ${statusInfo.color}`}
          >
            <option value="not_started" className="bg-slate-900 text-slate-300">미학습</option>
            <option value="in_progress" className="bg-slate-900 text-sky-300">학습 중</option>
            <option value="review_needed" className="bg-slate-900 text-amber-300">복습 필요</option>
            <option value="solved" className="bg-slate-900 text-indigo-300">풀이 완료</option>
            <option value="mastered" className="bg-slate-900 text-emerald-300">완전 정복</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-current">
            <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
