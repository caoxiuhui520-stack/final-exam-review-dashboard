import type { DailyTask, ExamModule } from "./types";

type MasteryMap = Record<ExamModule, number>;

const taskTemplates: Record<ExamModule, Omit<DailyTask, "id" | "questionIds">> = {
  listening: { module: "listening", title: "听力 · 真题精练", minutes: 20 },
  translation: { module: "translation", title: "翻译 · 高频句型", minutes: 15 },
  vocabulary: { module: "vocabulary", title: "词汇 · 易错复测", minutes: 12 },
  reading: { module: "reading", title: "阅读 · 定位训练", minutes: 20 },
  writing: { module: "writing", title: "写作 · 核心表达", minutes: 15 },
};

export function buildDailyPlan(
  date: string,
  mastery: MasteryMap,
  unfinished: DailyTask[],
): DailyTask[] {
  const plan: DailyTask[] = [];
  let minutes = 0;

  for (const task of unfinished) {
    if (minutes + task.minutes > 60) break;
    plan.push({ ...task, carried: true });
    minutes += task.minutes;
  }

  const orderedModules = (Object.keys(mastery) as ExamModule[])
    .toSorted((left, right) => mastery[left] - mastery[right]);

  for (const module of orderedModules) {
    const template = taskTemplates[module];
    if (minutes + template.minutes > 60) continue;
    plan.push({
      ...template,
      id: `${date}-${module}`,
      questionIds: [],
    });
    minutes += template.minutes;
    if (plan.length >= 3) break;
  }

  return plan;
}
