import type { StudyState } from "../domain/types";

const STORAGE_KEY = "final-exam-study";

export const emptyStudyState = (): StudyState => ({
  version: 1,
  attempts: [],
  markedQuestionIds: [],
  completedTaskIds: [],
  drafts: {},
});

function isStudyState(value: unknown): value is StudyState {
  if (!value || typeof value !== "object") return false;
  const state = value as Partial<StudyState>;
  return state.version === 1
    && Array.isArray(state.attempts)
    && Array.isArray(state.markedQuestionIds)
    && Array.isArray(state.completedTaskIds)
    && typeof state.drafts === "object";
}

export function createStudyRepository(storage: Storage) {
  return {
    load(): StudyState {
      const raw = storage.getItem(STORAGE_KEY);
      if (!raw) return emptyStudyState();
      try {
        const parsed: unknown = JSON.parse(raw);
        return isStudyState(parsed) ? parsed : emptyStudyState();
      } catch {
        storage.setItem(`${STORAGE_KEY}:corrupt`, raw);
        storage.removeItem(STORAGE_KEY);
        return emptyStudyState();
      }
    },
    save(state: StudyState) {
      storage.setItem(STORAGE_KEY, JSON.stringify(state));
    },
    reset() {
      storage.removeItem(STORAGE_KEY);
    },
  };
}

