import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Attempt, StudyState } from "../domain/types";
import { createStudyRepository } from "../storage/studyRepository";

type StudyContextValue = {
  state: StudyState;
  recordAttempt: (attempt: Attempt) => void;
  toggleMarked: (questionId: string) => void;
  saveDraft: (draftId: string, answers: Record<string, string>) => void;
};

const StudyContext = createContext<StudyContextValue | null>(null);

export function StudyProvider({ children }: { children: ReactNode }) {
  const repository = useMemo(() => createStudyRepository(window.localStorage), []);
  const [state, setState] = useState(() => repository.load());

  const update = (next: (current: StudyState) => StudyState) => {
    setState((current) => {
      const value = next(current);
      repository.save(value);
      return value;
    });
  };

  return (
    <StudyContext.Provider value={{
      state,
      recordAttempt: (attempt) => update((current) => ({
        ...current,
        attempts: [...current.attempts, attempt],
      })),
      toggleMarked: (questionId) => update((current) => ({
        ...current,
        markedQuestionIds: current.markedQuestionIds.includes(questionId)
          ? current.markedQuestionIds.filter((id) => id !== questionId)
          : [...current.markedQuestionIds, questionId],
      })),
      saveDraft: (draftId, answers) => update((current) => ({
        ...current,
        drafts: { ...current.drafts, [draftId]: answers },
      })),
    }}>
      {children}
    </StudyContext.Provider>
  );
}

export function useStudy() {
  const value = useContext(StudyContext);
  if (!value) throw new Error("useStudy must be used within StudyProvider");
  return value;
}
