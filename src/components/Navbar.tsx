import React from 'react';
import { BookOpen, Star, Sparkles, CheckCircle2, RotateCcw, Github } from 'lucide-react';

interface NavbarProps {
  activeTab: 'all' | 'review' | 'bookmarked';
  setActiveTab: (tab: 'all' | 'review' | 'bookmarked') => void;
  stats: {
    total: number;
    solved: number;
    mastered: number;
    reviewNeeded: number;
    bookmarked: number;
  };
  onScrollToExplorer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  stats,
  onScrollToExplorer,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-tight">AlgoStudy</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 font-medium border border-indigo-500/20">
                  학습 플랫폼
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                백준 & 프로그래머스 155개 알고리즘 풀이 저장소
              </p>
            </div>
          </div>

          {/* Nav Navigation */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => {
                setActiveTab('all');
                onScrollToExplorer();
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'all'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>전체 문제 ({stats.total})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('review');
                onScrollToExplorer();
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'review'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">복습 필요</span>
              <span className="px-1.5 py-0.2 rounded-full text-xs bg-amber-500/20 text-amber-300">
                {stats.reviewNeeded}
              </span>
            </button>

            <button
              onClick={() => {
                setActiveTab('bookmarked');
                onScrollToExplorer();
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                activeTab === 'bookmarked'
                  ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400/30" />
              <span className="hidden sm:inline">즐겨찾기</span>
              <span className="px-1.5 py-0.2 rounded-full text-xs bg-yellow-500/20 text-yellow-300">
                {stats.bookmarked}
              </span>
            </button>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">정복 완료:</span>
              <span className="text-emerald-400 font-bold">{stats.mastered}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-300">{stats.total}</span>
            </div>

            <a
              href="https://github.com/ohofront/algorithm"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
              title="GitHub 저장소 보기"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
