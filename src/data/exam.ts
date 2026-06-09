import type { ExamModule } from "../domain/types";
import { questions } from "./questions";

export const examSections: Array<{
  key: string;
  label: string;
  module: ExamModule;
  count: number;
  points: number;
}> = [
  { key: "listening", label: "听力", module: "listening", count: 25, points: 25 },
  { key: "sentence-translation", label: "句子翻译", module: "translation", count: 10, points: 20 },
  { key: "phrase-translation", label: "短语翻译", module: "translation", count: 10, points: 10 },
  { key: "vocabulary", label: "词汇与结构", module: "vocabulary", count: 15, points: 15 },
  { key: "reading", label: "阅读理解", module: "reading", count: 10, points: 20 },
  { key: "writing", label: "写作填空", module: "writing", count: 5, points: 10 },
];

export type MockExamSlot = {
  number: number;
  section: string;
  module: ExamModule;
  questionId: string;
};

export const mockExamSlots: MockExamSlot[] = examSections.flatMap((section) => {
  const pool = questions.filter((question) => question.module === section.module);
  return Array.from({ length: section.count }, (_, index) => ({
    number: 0,
    section: section.key,
    module: section.module,
    questionId: pool[index % pool.length].id,
  }));
}).map((slot, index) => ({ ...slot, number: index + 1 }));

