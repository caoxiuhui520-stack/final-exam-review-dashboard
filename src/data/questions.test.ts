import { describe, expect, test } from "vitest";
import { examSections, mockExamSlots } from "./exam";
import { questions } from "./questions";

describe("question bank", () => {
  test("contains a useful verified set across all five modules", () => {
    expect(questions.length).toBeGreaterThanOrEqual(30);
    expect(new Set(questions.map((question) => question.module))).toEqual(
      new Set(["listening", "translation", "vocabulary", "reading", "writing"]),
    );
  });

  test("uses stable ids and complete answer metadata", () => {
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
    for (const question of questions) {
      expect(question.answer).not.toBe("");
      expect(question.explanation).not.toBe("");
      expect(question.source).not.toBe("");
      if (question.type === "choice") {
        expect(question.options?.filter((option) => option.id === question.answer)).toHaveLength(1);
      }
    }
  });

  test("labels variants and keeps audio references valid", () => {
    expect(questions.some((question) => question.isVariant)).toBe(true);
    const audioQuestions = questions.filter((item) => item.audio);
    expect(new Set(audioQuestions.map((question) => question.audio?.file))).toEqual(
      new Set(["/audio/college-test-one.mp3", "/audio/college-test-two.mp3"]),
    );
    for (const question of audioQuestions) {
      expect(question.audio?.file).toMatch(/^\/audio\/college-test-(one|two)\.mp3$/);
      if (question.audio?.start !== undefined && question.audio.end !== undefined) {
        expect(question.audio.end).toBeGreaterThan(question.audio.start);
      }
    }
  });
});

describe("official exam structure", () => {
  test("represents seventy-five answer slots worth one hundred points", () => {
    expect(mockExamSlots).toHaveLength(75);
    expect(examSections.reduce((sum, section) => sum + section.points, 0)).toBe(100);
    expect(examSections.reduce((sum, section) => sum + section.count, 0)).toBe(75);
  });
});
