import { CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { questionsById } from "../data/questions";
import { moduleLabels } from "../domain/types";
import { useStudy } from "../state/StudyContext";

export function MistakesPage() {
  const { state } = useStudy();
  const ids = new Set([
    ...state.attempts.filter((attempt) => !attempt.correct).map((attempt) => attempt.questionId),
    ...state.markedQuestionIds,
  ]);
  const mistakes = [...ids].map((id) => questionsById.get(id)).filter(Boolean);

  return (
    <main className="study-page page">
      <header className="page-heading"><div><p className="eyeline">重点回顾</p><h1>错题本</h1><p>错题和主动标记题会集中在这里，方便反复复测。</p></div></header>
      {mistakes.length === 0 ? (
        <section className="empty-state">
          <CheckCircle2 size={44} />
          <h2>还没有错题</h2>
          <p>完成练习后，答错或标记的题会自动出现在这里。</p>
          <Link className="button primary" to="/library">去题库练习</Link>
        </section>
      ) : (
        <section className="question-library">
          {mistakes.map((question) => question ? (
            <article className="library-row" key={question.id}>
              <div><span className="source-tag">{moduleLabels[question.module]}</span></div>
              <h2>{question.prompt}</h2>
              <p>{question.explanation}</p>
              <Link to={`/practice/${question.module}`}>重新练习</Link>
            </article>
          ) : null)}
        </section>
      )}
    </main>
  );
}

