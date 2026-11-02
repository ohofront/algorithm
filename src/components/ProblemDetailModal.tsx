import React, { useState, useEffect } from 'react';
import { Problem, UserStudyState, StudyStatus } from '../types/problem';
import { 
  X, 
  ExternalLink, 
  Star, 
  Copy, 
  Check, 
  Code2, 
  Brain, 
  FileText, 
  Play, 
  Eye, 
  EyeOff, 
  Clock, 
  Cpu, 
  CheckCircle2, 
  RotateCcw,
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ProblemDetailModalProps {
  problem: Problem | null;
  studyState: UserStudyState;
  onClose: () => void;
  onUpdateStatus: (problemId: string, status: StudyStatus) => void;
  onToggleBookmark: (problemId: string, isBookmarked: boolean) => void;
  onUpdateNotes: (problemId: string, notes: string) => void;
}

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  problem,
  studyState,
  onClose,
  onUpdateStatus,
  onToggleBookmark,
  onUpdateNotes,
}) => {
  if (!problem) return null;

  const [activeTab, setActiveTab] = useState<'solution' | 'concept' | 'notes' | 'practice'>('solution');
  const [copied, setCopied] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [localNotes, setLocalNotes] = useState(studyState.notes || '');
  const [notesSaved, setNotesSaved] = useState(false);

  // Playground state
  const [playgroundInput, setPlaygroundInput] = useState('');
  const [playgroundOutput, setPlaygroundOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setLocalNotes(studyState.notes || '');
    setIsRevealed(false);
    setPlaygroundOutput('');
    setPlaygroundInput('');
  }, [problem, studyState.notes]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(problem.solutionCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error('Failed to copy code', e);
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalNotes(val);
    onUpdateNotes(problem.id, val);
    setNotesSaved(true);
    setTimeout(() => setNotesSaved(false), 1500);
  };

  const handleInsertTemplate = () => {
    const template = `## 📌 핵심 아이디어
- 

## ⚠️ 주의할 점 & 실수했던 부분
- 

## ⏱️ 복잡도 분석
- 시간 복잡도: ${problem.timeComplexity}
- 공간 복잡도: ${problem.spaceComplexity}

## 💡 다시 볼 포인트
- `;
    const updated = localNotes ? `${localNotes}\n\n${template}` : template;
    setLocalNotes(updated);
    onUpdateNotes(problem.id, updated);
  };

  // Run in-browser JavaScript code
  const handleRunPlayground = () => {
    setIsRunning(true);
    setPlaygroundOutput('실행 중...');

    setTimeout(() => {
      try {
        let logs: string[] = [];
        const customConsole = {
          log: (...args: any[]) => {
            logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
          },
          error: (...args: any[]) => {
            logs.push('[Error] ' + args.join(' '));
          },
          warn: (...args: any[]) => {
            logs.push('[Warn] ' + args.join(' '));
          }
        };

        // Create isolated runner
        const runnerCode = `
          ${problem.solutionCode}
        `;

        const runFn = new Function('console', 'input', runnerCode);
        const result = runFn(customConsole, playgroundInput);

        if (result !== undefined) {
          logs.push(`\n[Return Value]: ${typeof result === 'object' ? JSON.stringify(result, null, 2) : result}`);
        }

        setPlaygroundOutput(logs.join('\n') || '(콘솔 출력 없음 / 실행 정상 완료)');
      } catch (err: any) {
        setPlaygroundOutput(`[실행 에러 발생]: ${err.message || String(err)}`);
      } finally {
        setIsRunning(false);
      }
    }, 50);
  };

  const getTierColor = (tier: string) => {
    const t = tier.toLowerCase();
    if (t.includes('gold')) return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
    if (t.includes('silver')) return 'bg-slate-400/15 text-slate-200 border-slate-400/30';
    if (t.includes('bronze')) return 'bg-orange-500/15 text-orange-300 border-orange-500/30';
    if (t.includes('2')) return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
    return 'bg-teal-500/15 text-teal-300 border-teal-500/30';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative flex flex-col w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold border ${
                problem.platform === 'Baekjoon'
                  ? 'bg-sky-500/10 text-sky-400 border-sky-500/20'
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
              }`}
            >
              {problem.platform === 'Baekjoon' ? '백준 (BOJ)' : '프로그래머스'}
            </span>

            <span className={`px-2.5 py-0.5 rounded-lg text-xs font-medium border ${getTierColor(problem.tier)}`}>
              {problem.tier}
            </span>

            {problem.problemNumber && (
              <span className="text-xs text-slate-400 font-mono">
                #{problem.problemNumber}
              </span>
            )}

            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {problem.title}
            </h2>
          </div>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Status Dropdown */}
            <select
              value={studyState.status}
              onChange={(e) => onUpdateStatus(problem.id, e.target.value as StudyStatus)}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 outline-none cursor-pointer font-medium hover:border-slate-600 transition-colors"
            >
              <option value="not_started">미학습</option>
              <option value="in_progress">학습 중</option>
              <option value="review_needed">복습 필요</option>
              <option value="solved">풀이 완료</option>
              <option value="mastered">완전 정복</option>
            </select>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(problem.id, !studyState.isBookmarked)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-yellow-400 transition-colors"
              title={studyState.isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'}
            >
              <Star
                className={`w-4 h-4 ${
                  studyState.isBookmarked ? 'text-yellow-400 fill-yellow-400' : ''
                }`}
              />
            </button>

            {/* External Link */}
            {problem.link && (
              <a
                href={problem.link}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                title="공식 문제 페이지 열기"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors ml-2"
              title="닫기 (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Split: Left (Problem Specs) | Right (Study Workbench) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 overflow-hidden">
          {/* Left Pane: Problem Description */}
          <div className="flex flex-col h-full overflow-hidden bg-slate-950/40">
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800/80 bg-slate-900/40">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>문제 지문 및 요구사항</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                {problem.time && (
                  <span className="flex items-center gap-1" title="실행 시간">
                    <Clock className="w-3.5 h-3.5" />
                    {problem.time}
                  </span>
                )}
                {problem.memory && (
                  <span className="flex items-center gap-1" title="메모리">
                    <Cpu className="w-3.5 h-3.5" />
                    {problem.memory}
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-5 text-sm text-slate-300 leading-relaxed">
              {/* Category Tags */}
              <div className="flex flex-wrap gap-1.5 pb-3 border-b border-slate-800/60">
                {problem.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Description Body */}
              <div 
                className="problem-markdown prose prose-invert max-w-none prose-pre:bg-slate-950"
                dangerouslySetInnerHTML={{ __html: problem.description }}
              />

              {/* Input Spec (Baekjoon) */}
              {problem.inputDesc && (
                <div className="pt-4 border-t border-slate-800/60">
                  <h4 className="font-bold text-indigo-400 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    입력 형식
                  </h4>
                  <div 
                    className="problem-markdown"
                    dangerouslySetInnerHTML={{ __html: problem.inputDesc }}
                  />
                </div>
              )}

              {/* Output Spec (Baekjoon) */}
              {problem.outputDesc && (
                <div className="pt-4 border-t border-slate-800/60">
                  <h4 className="font-bold text-indigo-400 mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                    출력 형식
                  </h4>
                  <div 
                    className="problem-markdown"
                    dangerouslySetInnerHTML={{ __html: problem.outputDesc }}
                  />
                </div>
              )}

              {/* Source Path */}
              <div className="pt-4 border-t border-slate-800/60 text-xs text-slate-400 font-mono">
                저장소 위치: <span className="text-slate-300">{problem.sourcePath}</span>
              </div>
            </div>
          </div>

          {/* Right Pane: Study Workbench */}
          <div className="flex flex-col h-full overflow-hidden bg-slate-900/60">
            {/* Workbench Navigation Tabs */}
            <div className="flex items-center justify-between px-6 border-b border-slate-800 bg-slate-950/40">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('solution')}
                  className={`py-3.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
                    activeTab === 'solution'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  <span>풀이 소스코드</span>
                </button>

                <button
                  onClick={() => setActiveTab('practice')}
                  className={`py-3.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
                    activeTab === 'practice'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Brain className="w-4 h-4 text-emerald-400" />
                  <span>블라인드 연습 & 실행</span>
                </button>

                <button
                  onClick={() => setActiveTab('concept')}
                  className={`py-3.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
                    activeTab === 'concept'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>핵심 알고리즘 분석</span>
                </button>

                <button
                  onClick={() => setActiveTab('notes')}
                  className={`py-3.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-all ${
                    activeTab === 'notes'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-violet-400" />
                  <span>나만의 학습 노트</span>
                  {localNotes && (
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  )}
                </button>
              </div>

              {/* Quick Actions (Copy / Language) */}
              {activeTab === 'solution' && (
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {problem.solutionLang.toUpperCase()}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 text-xs transition-colors"
                    title="코드 복사"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>복사</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Tab 1: Solution Code */}
            {activeTab === 'solution' && (
              <div className="flex-1 p-4 overflow-y-auto bg-slate-950 font-mono text-xs leading-relaxed">
                <pre className="text-slate-200 whitespace-pre">
                  <code>{problem.solutionCode || '// 풀이 코드가 없습니다.'}</code>
                </pre>
              </div>
            )}

            {/* Tab 2: Practice Mode & In-browser Code Runner */}
            {activeTab === 'practice' && (
              <div className="flex-1 flex flex-col overflow-hidden p-5 space-y-4">
                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Brain className="w-4 h-4 text-emerald-400" />
                      블라인드 문제 복습
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      정답 코드를 가리고 지문만 보면서 해결 전략을 먼저 구상해보세요.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsRevealed(!isRevealed)}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>정답 코드 가리기</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>정답 코드 확인하기</span>
                      </>
                    )}
                  </button>
                </div>

                {isRevealed && (
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs max-h-48 overflow-y-auto">
                    <pre className="text-slate-300 whitespace-pre">
                      <code>{problem.solutionCode}</code>
                    </pre>
                  </div>
                )}

                {/* In-Browser Interactive Playground */}
                <div className="flex-1 flex flex-col rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-emerald-400" />
                      브라우저 코드 실행기 (JavaScript)
                    </span>
                    <button
                      onClick={handleRunPlayground}
                      disabled={isRunning}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1 transition-colors shadow-sm"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{isRunning ? '실행 중...' : '코드 실행'}</span>
                    </button>
                  </div>

                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 p-3 gap-3 overflow-hidden">
                    {/* Custom Input */}
                    <div className="flex flex-col">
                      <label className="text-[11px] font-semibold text-slate-400 mb-1">
                        테스트 입력값 (선택):
                      </label>
                      <textarea
                        value={playgroundInput}
                        onChange={(e) => setPlaygroundInput(e.target.value)}
                        placeholder="예: 3 4 혹은 [1, 2, 3] 등 매개변수나 입력값"
                        className="flex-1 w-full p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>

                    {/* Console Output */}
                    <div className="flex flex-col overflow-hidden">
                      <label className="text-[11px] font-semibold text-slate-400 mb-1">
                        실행 결과 콘솔 출력:
                      </label>
                      <div className="flex-1 p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-300 overflow-y-auto whitespace-pre-wrap">
                        {playgroundOutput || '// "코드 실행" 버튼을 누르면 이 곳에 결과가 출력됩니다.'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Concept & Complexity */}
            {activeTab === 'concept' && (
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 font-medium">시간 복잡도 (Time)</span>
                    <div className="text-lg font-black text-indigo-400 font-mono mt-1">
                      {problem.timeComplexity}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      입력 크기 $N$에 따른 연산 횟수 상한
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-xs text-slate-400 font-medium">공간 복잡도 (Space)</span>
                    <div className="text-lg font-black text-emerald-400 font-mono mt-1">
                      {problem.spaceComplexity}
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      메모리 및 재귀 호출 스택 사용량
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    핵심 접근 전략 및 분류
                  </h4>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium">
                    {problem.concept}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800/80 space-y-3 text-xs text-slate-400 leading-relaxed">
                  <h5 className="font-semibold text-slate-200">학습 체크리스트</h5>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>경계 조건(극단적 $N$, 최소값/최대값, 0 또는 빈 배열)을 올바르게 처리했는가?</li>
                    <li>불필요한 반복이나 메모리 낭비 없이 최적화된 자료구조를 사용했는가?</li>
                    <li>동일한 패턴의 유사 문제(코딩테스트 빈출 유형)에 바로 응용할 수 있는가?</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 4: Study Notes */}
            {activeTab === 'notes' && (
              <div className="flex-1 flex flex-col p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-300">
                      문제별 맞춤 학습 메모
                    </span>
                    {notesSaved && (
                      <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-medium">
                        <Check className="w-3 h-3" />
                        자동 저장됨
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleInsertTemplate}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-indigo-300 border border-indigo-500/20 transition-colors"
                  >
                    학습 템플릿 삽입
                  </button>
                </div>

                <textarea
                  value={localNotes}
                  onChange={handleNotesChange}
                  placeholder="풀이하면서 실수했던 부분, 떠올리지 못했던 아이디어, 다시 볼 포인트 등을 자유롭게 기록하세요. (브라우저 로컬 저장소에 자동 보관됩니다)"
                  className="flex-1 w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-200 placeholder-slate-400 outline-none focus:border-indigo-500 resize-none font-sans leading-relaxed"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
