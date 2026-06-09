import { ArrowRight, BookOpen, Clock3, Headphones, Languages, PenLine, WholeWord } from "lucide-react";
import { Link } from "react-router-dom";
import { buildDailyPlan } from "../domain/planner";
import { moduleLabels, type ExamModule } from "../domain/types";
import { calculateModuleMastery } from "../domain/grading";
import { questionsById } from "../data/questions";
import { useStudy } from "../state/StudyContext";

const moduleIcons = {
  listening: Headphones,
  translation: Languages,
  vocabulary: WholeWord,
  reading: BookOpen,
  writing: PenLine,
};

export function DashboardPage() {
  const { state } = useStudy();
  const mastery = Object.fromEntries(
    (Object.keys(moduleLabels) as ExamModule[]).map((module) => [
      module,
      calculateModuleMastery(state.attempts, module, (id) => questionsById.get(id)?.module),
    ]),
  ) as Record<ExamModule, number>;
  const plan = buildDailyPlan("2026-06-09", mastery, []);
  const days = Math.max(0, Math.ceil((new Date("2026-06-25T09:00:00+08:00").getTime() - new Date("2026-06-09T00:00:00+08:00").getTime()) / 86400000));

  return (
    <main className="dashboard page">
      <section className="dashboard-main">
        <div className="dashboard-heading">
          <div>
            <p className="eyeline">今日学习计划</p>
            <h1>今晚，拿下 {plan.length} 个任务</h1>
            <p>建议学习时长 45–60 分钟，薄弱模块会优先出现。</p>
          </div>
          <div className="completion-ring" style={{ "--progress": "0deg" } as React.CSSProperties}>
            <strong>0/{plan.length}</strong><span>今日完成</span>
          </div>
        </div>

        <div className="task-panel">
          {plan.map((task, index) => {
            const Icon = moduleIcons[task.module];
            return (
              <article className="task-row" key={task.id}>
                <div className={`task-icon module-${task.module}`}><Icon /></div>
                <span className="task-number">{index + 1}</span>
                <div className="task-copy">
                  <h2>{task.title}</h2>
                  <p>{task.module === "listening" ? "真题一 / 真题二" : "原题 + 同知识点变式"}</p>
                </div>
                <span className="task-time"><Clock3 size={17} /> {task.minutes} 分钟</span>
                <Link className={index === 0 ? "button primary" : "button"} to={`/practice/${task.module}`}>
                  {index === 0 ? "继续练习" : "开始练习"} <ArrowRight size={15} />
                </Link>
              </article>
            );
          })}
        </div>

        <section className="module-panel">
          <div className="section-heading"><h2>五大题型 · 全面冲刺</h2><span>按题型自由练习</span></div>
          <div className="module-grid">
            {(Object.keys(moduleLabels) as ExamModule[]).map((module) => {
              const Icon = moduleIcons[module];
              return (
                <Link to={`/practice/${module}`} key={module} className="module-card">
                  <div className={`task-icon module-${module}`}><Icon /></div>
                  <strong>{moduleLabels[module]}</strong>
                  <small>{module === "writing" ? "范文填空" : module === "listening" ? "专项突破" : "重点巩固"}</small>
                  <ArrowRight size={17} />
                </Link>
              );
            })}
          </div>
        </section>
      </section>

      <aside className="dashboard-rail">
        <section className="countdown-card">
          <span>距离期末考试</span>
          <strong>{days}<small>天</small></strong>
          <b>2026.06.25</b>
          <p>星期四 · 上午 · 100 分钟</p>
        </section>
        <section className="mastery-card">
          <div className="section-heading"><h2>各模块掌握度</h2></div>
          {(Object.keys(moduleLabels) as ExamModule[]).map((module) => (
            <div className="mastery-row" key={module}>
              <div><span>{moduleLabels[module]}</span><b>{mastery[module]}%</b></div>
              <div className="mastery-track"><i style={{ width: `${mastery[module]}%` }} /></div>
            </div>
          ))}
        </section>
        <section className="exam-card">
          <h2>考试结构</h2>
          <p>听力 25 · 翻译 30 · 词汇 15</p>
          <p>阅读 20 · 写作 10</p>
          <Link to="/mock">开始 100 分钟模拟考试 <ArrowRight size={15} /></Link>
        </section>
      </aside>
    </main>
  );
}
