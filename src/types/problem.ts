export type Platform = 'Baekjoon' | 'Programmers';

export type StudyStatus = 'not_started' | 'in_progress' | 'solved' | 'review_needed' | 'mastered';

export interface Problem {
  id: string;
  problemNumber: string;
  title: string;
  platform: Platform;
  tier: string;
  difficultyWeight: number;
  link: string;
  memory: string;
  time: string;
  submitDate: string;
  tags: string[];
  description: string;
  inputDesc: string;
  outputDesc: string;
  solutionCode: string;
  solutionLang: 'javascript' | 'c' | 'cpp' | 'python';
  solutionFileName: string;
  concept: string;
  timeComplexity: string;
  spaceComplexity: string;
  sourcePath: string;
}

export interface UserStudyState {
  status: StudyStatus;
  isBookmarked: boolean;
  notes: string;
  lastStudiedAt?: string;
}
