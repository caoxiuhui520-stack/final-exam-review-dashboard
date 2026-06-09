import { ArrowLeft, ArrowRight, Bookmark, CheckCircle2, XCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AudioSegmentPlayer } from "../components/AudioSegmentPlayer";
import { questions } from "../data/questions";
import { gradeQuestion } from "../domain/grading";
import { moduleLabels, type ExamModule } from "../domain/types";
import { useStudy } from "../state/StudyContext";

export function PracticePage() {
  const { module = "listening" } = useParams();
  const examModule = module as ExamModule;
  const pool = useMemo(() => questions.filter((question) => question.module === examModule), [examModule]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { recordAttempt, state, toggleMarked } = useStudy();
  const question = pool[index] ?? questions[0];
  const correct = submitted && gradeQuestion(question, answer);

  const submit = () => {
    if (!answer || submitted) return;
    const isCorrect = gradeQuestion(question, answer);
    recordAttempt({
      questionId: question.id,
      answer,
      correct: isCorrect,
      answeredAt: new Date().toISOString(),
    });
    setSubmitted(true);
  };

  const next = () => {
    setIndex((current) => (current + 1) % pool.length);
    setAnswer("");
    setSubmitted(false);
  };

  return (
    <main className="practice-page page">
      <div className="practice-topline">
        <Link to="/"><ArrowLeft size={17} /> 返回今日任务</Link>
        <div className="mode-switch"><b>练习模式</b><span>即时解析</span></div>
        <span>已自动保存</span>
      </div>
      <div className="practice-layout">
        <section className="question-panel">
          <div className="question-meta">
            <span>{moduleLabels[examModule]} · {question.isVariant ? "变式题" : "原题"}</span>
            <span>第 {index + 1} / {pool.length} 题</span>
          </div>
          {question.audio ? <AudioSegmentPlayer file={question.audio.file} label={question.audio.label} /> : null}
          {question.passage ? <div className="passage">{question.passage}</div> : null}
          <h1>{question.prompt}</h1>
          {question.type === "choice" ? (
            <div className="choice-list">
              {question.options?.map((option) => (
                <button
                  key={option.id}
                  className={`choice-button ${answer === option.id ? "selected" : ""}`}
                  disabled={submitted}
                  onClick={() => setAnswer(option.id)}
                >
                  <b>{option.id}.</b> {option.text}
                </button>
              ))}
            </div>
          ) : (
            <label className="blank-answer">
              <span>填写完整英文内容</span>
              <input value={answer} disabled={submitted} onChange={(event) => setAnswer(event.target.value)} />
            </label>
          )}
          {submitted ? (
            <div className={`feedback ${correct ? "correct" : "incorrect"}`}>
              <div>{correct ? <CheckCircle2 /> : <XCircle />}<strong>{correct ? "回答正确" : `回答错误 · 正确答案：${question.answer}`}</strong></div>
              <p>{question.explanation}</p>
              <small>来源：{question.source}</small>
            </div>
          ) : null}
          <div className="question-actions">
            <button className="button secondary" onClick={() => toggleMarked(question.id)}>
              <Bookmark size={16} fill={state.markedQuestionIds.includes(question.id) ? "currentColor" : "none"} />
              {state.markedQuestionIds.includes(question.id) ? "已标记" : "加入重点"}
            </button>
            {submitted
              ? <button className="button primary" onClick={next}>下一题 <ArrowRight size={16} /></button>
              : <button className="button primary" disabled={!answer} onClick={submit}>提交答案</button>}
          </div>
        </section>
        <aside className="question-sidebar">
          <h2>答题进度</h2>
          <div className="question-numbers">
            {pool.map((item, itemIndex) => (
              <button
                className={itemIndex === index ? "current" : ""}
                key={item.id}
                onClick={() => { setIndex(itemIndex); setAnswer(""); setSubmitted(false); }}
              >{itemIndex + 1}</button>
            ))}
          </div>
          <div className="study-note">
            <strong>学习记录</strong>
            <p>答错或标记的题会进入错题本，并在后续每日任务中再次出现。</p>
          </div>
        </aside>
      </div>
    </main>
  );
}

