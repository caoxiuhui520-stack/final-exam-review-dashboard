export type ExamModule = "listening" | "translation" | "vocabulary" | "reading" | "writing";

export type ChoiceOption = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  module: ExamModule;
  type: "choice" | "blank";
  prompt: string;
  options?: ChoiceOption[];
  answer: string;
  acceptedAnswers?: string[];
  explanation: string;
  source: string;
  isVariant: boolean;
  points: number;
  audio?: {
    file: string;
    start?: number;
    end?: number;
    label: string;
  };
  passage?: string;
};

export type Attempt = {
  questionId: string;
  answer: string;
  correct: boolean;
  answeredAt: string;
};

export type StudyState = {
  version: 1;
  attempts: Attempt[];
  markedQuestionIds: string[];
  completedTaskIds: string[];
  drafts: Record<string, Record<string, string>>;
};

export type DailyTask = {
  id: string;
  module: ExamModule;
  title: string;
  minutes: number;
  questionIds: string[];
  carried?: boolean;
};

export const moduleLabels: Record<ExamModule, string> = {
  listening: "听力",
  translation: "翻译",
  vocabulary: "词汇",
  reading: "阅读",
  writing: "写作",
};

