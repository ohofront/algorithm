import React from 'react';
import { Problem, UserStudyState, StudyStatus } from '../types/problem';
import { Star, CheckCircle2, RotateCcw, Clock, Cpu, ExternalLink, ArrowRight } from 'lucide-react';

interface ProblemTableProps {
  problems: Problem[];
  studyData: Record<string, UserStudyState>;
  onSelect: (problem: Problem) => void;
  onUpdateStatus: (problemId: string, status: StudyStatus) => void;
  onToggleBookmark: (problemId: string, isBookmarked: boolean) => void;
}

export const ProblemTable: React.FC<ProblemTableProps> = ({
  problems,
  studyData,
  onSelect,
  onUpdateStatus,
  onToggleBookmark,
}) => {
  const getTierBadge = (tier: string) => {
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

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-900/90 text-xs font-semibold text-slate-400 border-b border-slate-800 uppercase tracking-wider">
          <tr>
            <th className="py-3 px-4 w-12 text-center">즐겨찾기</th>
            <th className="py-3 px-4 w-28">플랫폼 / 번호</th>
            <th className="py-3 px-4">문제 제목</th>
            <th className="py-3 px-4 w-28">난이도</th>
            <th className="py-3 px-4">유형 태그</th>
            <th className="py-3 px-4">시간 / 메모리</th>
            <th className="py-3 px-4 w-36">학습 상태</th>
            <th className="py-3 px-4 w-20 text-center">학습</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {problems.map((problem) => {
            const state = studyData[problem.id] || {
              status: 'not_started',
              isBookmarked: false,
              notes: '',
            };

            return (
              <tr
                key={problem.id}
                onClick={() => onSelect(problem)}
                className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
              >
                {/* Bookmark */}
                <td 
                  className="py-3 px-4 text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(problem.id, !state.isBookmarked);
                  }}
                >
                  <button
                    type="button"
                    className="p-1 rounded text-slate-400 hover:text-yellow-400 transition-colors"
                  >
                    <Star
                      className={`w-4 h-4 ${
                        state.isBookmarked
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-slate-400 group-hover:text-slate-400'
                      }`}
                    />
                  </button>
                </td>

                {/* Platform / ID */}
                <td className="py-3 px-4 font-mono text-xs">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                        problem.platform === 'Baekjoon'
                          ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }`}
                    >
                      {problem.platform === 'Baekjoon' ? 'BOJ' : 'PG'}
                    </span>
                    <span className="text-slate-400">
                      {problem.problemNumber || '-'}
                    </span>
                  </div>
                </td>

                {/* Title */}
                <td className="py-3 px-4 font-semibold text-slate-100 group-hover:text-indigo-300 transition-colors">
                  <div className="flex items-center gap-2">
                    <span>{problem.title}</span>
                  </div>
                  <div className="text-xs text-slate-400 font-normal line-clamp-1">
                    {problem.concept}
                  </div>
                </td>

                {/* Tier */}
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-xs font-medium border ${getTierBadge(
                      problem.tier
                    )}`}
                  >
                    {problem.tier}
                  </span>
                </td>

                {/* Tags */}
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {problem.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-1.5 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                    {problem.tags.length > 2 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{problem.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>

                {/* Time / Memory */}
                <td className="py-3 px-4 text-xs font-mono text-slate-400">
                  {problem.time && <div>{problem.time}</div>}
                  {problem.memory && <div className="text-slate-400">{problem.memory}</div>}
                  {!problem.time && !problem.memory && <span className="text-slate-400">-</span>}
                </td>

                {/* Status Dropdown */}
                <td 
                  className="py-3 px-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <select
                    value={state.status}
                    onChange={(e) => onUpdateStatus(problem.id, e.target.value as StudyStatus)}
                    className="text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 outline-none cursor-pointer"
                  >
                    <option value="not_started">미학습</option>
                    <option value="in_progress">학습 중</option>
                    <option value="review_needed">복습 필요</option>
                    <option value="solved">풀이 완료</option>
                    <option value="mastered">완전 정복</option>
                  </select>
                </td>

                {/* Action */}
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => onSelect(problem)}
                    className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white transition-colors"
                    title="문제 학습 열기"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
