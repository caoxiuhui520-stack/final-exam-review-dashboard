import { describe, expect, test } from "vitest";
import type { Attempt, ExamModule, Question } from "./types";
import { calculateMastery, calculateModuleMastery, gradeQuestion, scoreExam } from "./grading";

const choice: Question = {
  id: "q1",
  module: "listening",
  type: "choice",
  prompt: "Question",
  options: [{ id: "A", text: "Answer" }],
  answer: "A",
  explanation: "Because.",
  source: "Test",
  isVariant: false,
  points: 2,
};

test("grades choice answers exactly", () => {
  expect(gradeQuestion(choice, "A")).toBe(true);
  expect(gradeQuestion(choice, "B")).toBe(false);
});

test("accepts normalized writing blank alternatives", () => {
  const blank: Question = {
    ...choice,
    id: "q2",
    module: "writing",
    type: "blank",
    answer: "a close-knit community",
    acceptedAnswers: ["a close knit community"],
  };
  expect(gradeQuestion(blank, "  A CLOSE-KNIT COMMUNITY ")).toBe(true);
  expect(gradeQuestion(blank, "community")).toBe(false);
});

test("scores an exam using question points", () => {
  const attempts: Attempt[] = [
    { questionId: "q1", answer: "A", correct: true, answeredAt: "2026-06-09" },
    { questionId: "q2", answer: "wrong", correct: false, answeredAt: "2026-06-09" },
  ];
  expect(scoreExam([choice, { ...choice, id: "q2", points: 3 }], attempts)).toEqual({
    earned: 2,
    possible: 5,
    percentage: 40,
  });
});

describe("calculateMastery", () => {
  test("returns a neutral starting score", () => {
    expect(calculateMastery([])).toBe(50);
  });

  test("stays between zero and one hundred", () => {
    const correct = Array.from({ length: 30 }, (_, index) => ({
      questionId: `${index}`,
      answer: "A",
      correct: true,
      answeredAt: "2026-06-09",
    }));
    expect(calculateMastery(correct)).toBe(100);
  });
});

test("calculates module mastery from question metadata rather than id prefixes", () => {
  const attempts: Attempt[] = [
    { questionId: "tr-01", answer: "A", correct: true, answeredAt: "2026-06-09" },
    { questionId: "voc-01", answer: "B", correct: false, answeredAt: "2026-06-09" },
  ];
  const modules = new Map<string, ExamModule>([
    ["tr-01", "translation"],
    ["voc-01", "vocabulary"],
  ]);

  expect(calculateModuleMastery(attempts, "translation", (id) => modules.get(id))).toBe(100);
  expect(calculateModuleMastery(attempts, "vocabulary", (id) => modules.get(id))).toBe(0);
});
