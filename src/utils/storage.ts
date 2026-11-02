import { StudyStatus, UserStudyState } from '../types/problem';

const STORAGE_KEY = 'algostudy_user_data_v1';

interface UserDataMap {
  [problemId: string]: UserStudyState;
}

export function getUserStudyData(): UserDataMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user study data from localStorage', e);
    return {};
  }
}

export function getProblemStudyState(problemId: string): UserStudyState {
  const data = getUserStudyData();
  return (
    data[problemId] || {
      status: 'not_started',
      isBookmarked: false,
      notes: '',
    }
  );
}

export function updateProblemStudyState(
  problemId: string,
  updates: Partial<UserStudyState>
): UserStudyState {
  try {
    const data = getUserStudyData();
    const current = data[problemId] || {
      status: 'not_started',
      isBookmarked: false,
      notes: '',
    };

    const updated: UserStudyState = {
      ...current,
      ...updates,
      lastStudiedAt: new Date().toISOString(),
    };

    data[problemId] = updated;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent('algostudy-storage-changed', { detail: { problemId, updated } }));
    return updated;
  } catch (e) {
    console.error('Failed to save study state to localStorage', e);
    return updates as UserStudyState;
  }
}

export function exportStudyData(): string {
  return localStorage.getItem(STORAGE_KEY) || '{}';
}

export function importStudyData(jsonString: string): boolean {
  try {
    JSON.parse(jsonString); // validate
    localStorage.setItem(STORAGE_KEY, jsonString);
    window.dispatchEvent(new CustomEvent('algostudy-storage-changed'));
    return true;
  } catch (e) {
    return false;
  }
}
