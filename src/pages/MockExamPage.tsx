import { Clock3, Flag, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { examSections, mockExamSlots } from "../data/exam";
import { questionsById } from "../data/questions";
import { gradeQuestion } from "../domain/grading";
import { moduleLabels } from "../domain/types";
import { useStudy } from "../state/StudyContext";

export function MockExamPage() {
  const { state, saveDraft } = useStudy();
  const [answers, setAnswers] = useState<Record<string, string>>(() => state.drafts.mock ?? {});
  const [index, setIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const slot = mockExamSlots[index];
  const question = questionsById.get(slot.questionId)!;

  const choose = (answer: string) => {
    const next = { ...answers, [String(slot.number)]: answer };
    setAnswers(next);
    saveDraft("mock", next);
  };

  if (submitted) {
    const earned = mockExamSlots.reduce((sum, current) => {
      const currentQuestion = questionsById.get(current.questionId)!;
      const section = examSections.find((item) => item.key === current.section)!;
      const points = section.points / section.count;
      return sum + (gradeQuestion(currentQuestion, answers[String(current.number)] ?? "") ? points : 0);
    }, 0);
    return (
      <main className="study-page page">
        <header className="page-heading"><div><p className="eyeline">成绩分析</p><h1>模拟考试报告</h1><p>答案已统一判定，可根据模块成绩安排下一轮复习。</p></div></header>
        <section className="result-hero"><ShieldCheck /><div><span>总分</span><strong>{Math.round(earned)}<small>/100</small></strong></div></section>
        <section className="result-grid">
          {examSections.map((section) => {
            const sectionSlots = mockExamSlots.filter((item) => item.section === section.key);
            const score = sectionSlots.reduce((sum, item) => {
              const itemQuestion = questionsById.get(item.questionId)!;
              return sum + (gradeQuestion(itemQuestion, answers[String(item.number)] ?? "") ? section.points / section.count : 0);
            }, 0);
            return <article key={section.key}><span>{section.label}</span><strong>{Math.round(score)} / {section.points}</strong></article>;
          })}
        </section>
      </main>
    );
  }

  return (
    <main className="mock-page page">
      <header className="mock-header">
        <div><p className="eyeline">正式结构 · 75 题</p><h1>模拟考试</h1></div>
        <div className="timer"><Clock3 /><strong>100:00</strong><span>剩余时间</span></div>
        <button className="button primary" onClick={() => setSubmitted(true)}>交卷并查看成绩</button>
      </header>
      <div className="mock-layout">
        <section className="question-panel">
          <div className="question-meta"><span>{moduleLabels[slot.module]} · 第 {slot.number} 题</span><span>答案自动保存</span></div>
          <h1>{question.prompt}</h1>
          {question.type === "choice" ? (
            <div className="choice-list">
              {question.options?.map((option) => (
                <button key={option.id} className={`choice-button ${answers[String(slot.number)] === option.id ? "selected" : ""}`} onClick={() => choose(option.id)}>
                  <b>{option.id}.</b> {option.text}
                </button>
              ))}
            </div>
          ) : (
            <label className="blank-answer"><span>填写完整英文内容</span><input value={answers[String(slot.number)] ?? ""} onChange={(event) => choose(event.target.value)} /></label>
          )}
          <div className="question-actions">
            <button className="button secondary" disabled={index === 0} onClick={() => setIndex(index - 1)}>上一题</button>
            <button className="button" disabled={index === mockExamSlots.length - 1} onClick={() => setIndex(index + 1)}>下一题</button>
          </div>
        </section>
        <aside className="question-sidebar">
          <h2><Flag size={15} /> 答题卡</h2>
          <div className="mock-number-grid">
            {mockExamSlots.map((item, itemIndex) => (
              <button
                key={item.number}
                className={`${itemIndex === index ? "current" : ""} ${answers[String(item.number)] ? "answered" : ""}`}
                onClick={() => setIndex(itemIndex)}
              >{item.number}</button>
            ))}
          </div>
          <p className="mock-summary">已答 {Object.keys(answers).length} / 75</p>
        </aside>
      </div>
    </main>
  );
}

