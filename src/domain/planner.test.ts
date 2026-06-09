import { expect, test } from "vitest";
import { buildDailyPlan } from "./planner";

const mastery = {
  listening: 62,
  translation: 28,
  vocabulary: 74,
  reading: 55,
  writing: 35,
};

test("builds a mixed plan capped at sixty minutes", () => {
  const plan = buildDailyPlan("2026-06-10", mastery, []);
  expect(plan.reduce((sum, task) => sum + task.minutes, 0)).toBeLessThanOrEqual(60);
  expect(new Set(plan.map((task) => task.module)).size).toBeGreaterThan(1);
});

test("prioritizes low mastery modules", () => {
  const plan = buildDailyPlan("2026-06-10", mastery, []);
  expect(["translation", "writing"]).toContain(plan[0].module);
});

test("carries unfinished work without exceeding the cap", () => {
  const plan = buildDailyPlan("2026-06-10", mastery, [{
    id: "old",
    module: "listening",
    title: "昨日听力",
    minutes: 20,
    questionIds: ["q1"],
  }]);
  expect(plan.some((task) => task.id === "old" && task.carried)).toBe(true);
  expect(plan.reduce((sum, task) => sum + task.minutes, 0)).toBeLessThanOrEqual(60);
});
