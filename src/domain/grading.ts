import type { Attempt, ExamModule, Question } from "./types";

const normalize = (value: string) =>
  value.trim().toLocaleLowerCase().replaceAll("-", " ").replace(/\s+/g, " ");

export function gradeQuestion(question: Question, answer: string) {
  const accepted = [question.answer, ...(question.acceptedAnswers ?? [])].map(normalize);
  return accepted.includes(normalize(answer));
}

export function scoreExam(questions: Question[], attempts: Attempt[]) {
  const answerByQuestion = new Map(attempts.map((attempt) => [attempt.questionId, attempt]));
  const possible = questions.reduce((sum, question) => sum + question.points, 0);
  const earned = questions.reduce((sum, question) => {
    return sum + (answerByQuestion.get(question.id)?.correct ? question.points : 0);
  }, 0);

  return {
    earned,
    possible,
    percentage: possible === 0 ? 0 : Math.round((earned / possible) * 100),
  };
}

export function calculateMastery(attempts: Attempt[]) {
  if (attempts.length === 0) return 50;
  const recent = attempts.slice(-20);
  const correct = recent.filter((attempt) => attempt.correct).length;
  return Math.max(0, Math.min(100, Math.round((correct / recent.length) * 100)));
}

export function calculateModuleMastery(
  attempts: Attempt[],
  module: ExamModule,
  resolveModule: (questionId: string) => ExamModule | undefined,
) {
  return calculateMastery(attempts.filter((attempt) => resolveModule(attempt.questionId) === module));
}
