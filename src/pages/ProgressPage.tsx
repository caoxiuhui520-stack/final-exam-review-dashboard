import { calculateModuleMastery } from "../domain/grading";
import { questionsById } from "../data/questions";
import { moduleLabels, type ExamModule } from "../domain/types";
import { useStudy } from "../state/StudyContext";

export function ProgressPage() {
  const { state } = useStudy();
  return (
    <main className="study-page page">
      <header className="page-heading"><div><p className="eyeline">学习数据</p><h1>复习进度</h1><p>掌握度根据近期正确率计算，数据仅保存在当前浏览器。</p></div></header>
      <section className="stats-strip">
        <div><strong>{state.attempts.length}</strong><span>累计作答</span></div>
        <div><strong>{state.attempts.filter((attempt) => attempt.correct).length}</strong><span>回答正确</span></div>
        <div><strong>{state.markedQuestionIds.length}</strong><span>重点标记</span></div>
      </section>
      <section className="progress-list">
        {(Object.keys(moduleLabels) as ExamModule[]).map((module) => {
          const attempts = state.attempts.filter((attempt) => questionsById.get(attempt.questionId)?.module === module);
          const mastery = calculateModuleMastery(state.attempts, module, (id) => questionsById.get(id)?.module);
          return (
            <article key={module}>
              <div><h2>{moduleLabels[module]}</h2><strong>{mastery}%</strong></div>
              <div className="mastery-track"><i style={{ width: `${mastery}%` }} /></div>
              <p>{attempts.length === 0 ? "尚未练习，完成第一组题后开始统计。" : `已完成 ${attempts.length} 次作答。`}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}
