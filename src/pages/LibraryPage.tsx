import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { questions } from "../data/questions";
import { moduleLabels, type ExamModule } from "../domain/types";

type SourceFilter = "all" | "original" | "variant";

export function LibraryPage() {
  const [module, setModule] = useState<ExamModule | "all">("all");
  const [source, setSource] = useState<SourceFilter>("all");
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => questions.filter((question) => {
    if (module !== "all" && question.module !== module) return false;
    if (source === "original" && question.isVariant) return false;
    if (source === "variant" && !question.isVariant) return false;
    return `${question.prompt} ${question.source}`.toLowerCase().includes(query.toLowerCase());
  }), [module, query, source]);

  return (
    <main className="study-page page">
      <header className="page-heading">
        <div><p className="eyeline">自主练习</p><h1>自由题库</h1><p>按题型、原题和变式题筛选，快速找到今天想练的内容。</p></div>
        <div className="question-count"><strong>{filtered.length}</strong><span>道可练习</span></div>
      </header>
      <section className="filter-bar">
        <label><Search size={17} /><input aria-label="搜索题目" placeholder="搜索题目或来源" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        <select aria-label="筛选题型" value={module} onChange={(event) => setModule(event.target.value as ExamModule | "all")}>
          <option value="all">全部题型</option>
          {(Object.keys(moduleLabels) as ExamModule[]).map((key) => <option key={key} value={key}>{moduleLabels[key]}</option>)}
        </select>
        <div className="segmented" aria-label="来源筛选"><Filter size={15} />
          <button className={source === "all" ? "active" : ""} onClick={() => setSource("all")}>全部</button>
          <button className={source === "original" ? "active" : ""} onClick={() => setSource("original")}>只看原题</button>
          <button className={source === "variant" ? "active" : ""} onClick={() => setSource("variant")}>只看变式题</button>
        </div>
      </section>
      <section className="question-library">
        {filtered.map((question) => (
          <article key={question.id} className="library-row">
            <div><span className={`source-tag ${question.isVariant ? "variant" : ""}`}>{question.isVariant ? "变式题" : "原题"}</span><span>{moduleLabels[question.module]}</span></div>
            <h2>{question.prompt}</h2>
            <p>{question.source}</p>
            <Link to={`/practice/${question.module}`}>开始练习</Link>
          </article>
        ))}
      </section>
    </main>
  );
}

