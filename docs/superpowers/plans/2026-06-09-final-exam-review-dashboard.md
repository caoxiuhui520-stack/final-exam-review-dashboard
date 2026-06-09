# Final Exam Review Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a deployable responsive React study app from the supplied exam documents and listening audio, with daily review tasks, practice, mock exams, mistakes, and local progress.

**Architecture:** A Vite React application keeps verified source questions in typed static data and study state in a versioned localStorage repository. Pure domain functions generate daily plans, grade attempts, and calculate mastery; route-level components compose the dashboard, question runner, mock exam, mistakes, and progress views.

**Tech Stack:** React 19, TypeScript, Vite, React Router, Vitest, Testing Library, CSS, static MP3 assets.

---

## File Structure

- `package.json`, `vite.config.ts`, `tsconfig*.json`: build, test, and TypeScript configuration.
- `src/domain/types.ts`: shared question, exam, attempt, and progress contracts.
- `src/domain/planner.ts`: deterministic daily-task selection.
- `src/domain/grading.ts`: answer checking, scores, and mastery calculations.
- `src/data/questions.ts`: verified original questions plus clearly labeled variants.
- `src/data/exam.ts`: official 75-question paper structure and module metadata.
- `src/storage/studyRepository.ts`: versioned localStorage load/save/recovery.
- `src/components/`: app shell, audio player, question card, progress visuals.
- `src/pages/`: dashboard, library, practice, mock exam, mistakes, progress.
- `src/styles/`: tokens and responsive application styles.
- `src/**/*.test.ts(x)`: domain, storage, and interaction tests.
- `public/audio/`: the two supplied listening MP3 files.
- `scripts/extract-source-content.ps1`: repeatable DOCX/PPTX text extraction inventory.

### Task 1: Scaffold And Baseline

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `src/test/setup.ts`

- [ ] Add the Vite/React/TypeScript project configuration with scripts for `dev`, `test`, `lint`, and `build`.
- [ ] Install dependencies with `npm install`.
- [ ] Add one smoke test that imports the test environment and intentionally fails because the application entry does not exist.
- [ ] Run `npm test -- --run` and confirm the expected missing-module failure.
- [ ] Add the minimal app entry and rerun the smoke test to green.
- [ ] Commit the scaffold.

### Task 2: Domain Contracts And Grading

**Files:**
- Create: `src/domain/types.ts`
- Create: `src/domain/grading.test.ts`
- Create: `src/domain/grading.ts`

- [ ] Write failing tests for single-choice grading, writing-blank grading, module score totals, and mastery bounds.
- [ ] Run the grading test and confirm failures are caused by missing functions.
- [ ] Implement `gradeQuestion`, `scoreExam`, and `calculateMastery`.
- [ ] Run the grading test and full test suite.
- [ ] Commit the grading domain.

### Task 3: Versioned Study Storage

**Files:**
- Create: `src/storage/studyRepository.test.ts`
- Create: `src/storage/studyRepository.ts`

- [ ] Write failing tests for default state, round-trip persistence, corrupt JSON recovery, schema migration, and draft restoration.
- [ ] Run the storage test and confirm the expected failures.
- [ ] Implement a storage adapter with dependency-injected `Storage`, schema version `1`, and corrupt-data backup.
- [ ] Run the storage and full test suites.
- [ ] Commit local persistence.

### Task 4: Daily Planner

**Files:**
- Create: `src/domain/planner.test.ts`
- Create: `src/domain/planner.ts`

- [ ] Write failing tests that cap the plan at 60 minutes, prioritize low mastery, include multiple modules, and carry unfinished work without overloading the next day.
- [ ] Run the planner test and confirm failures.
- [ ] Implement deterministic weighted selection with stable date seeds.
- [ ] Run planner and full test suites.
- [ ] Commit daily planning.

### Task 5: Source Content And Audio

**Files:**
- Create: `scripts/extract-source-content.ps1`
- Create: `src/data/questions.ts`
- Create: `src/data/exam.ts`
- Create: `src/data/questions.test.ts`
- Copy: `public/audio/college-test-one.mp3`
- Copy: `public/audio/college-test-two.mp3`

- [ ] Write a failing data validation test for stable IDs, one correct answer, required explanations, source labels, variant labels, official module totals, and valid audio references.
- [ ] Run the validation test and confirm the empty dataset fails.
- [ ] Add a repeatable extraction script for DOCX/PPTX text inventory.
- [ ] Curate a usable verified dataset from the supplied materials, including listening, translation, vocabulary, reading, and writing samples plus variants.
- [ ] Define the official module metadata and 75-answer-slot mock structure.
- [ ] Copy both MP3 files into public assets without modifying the originals.
- [ ] Run data and full test suites.
- [ ] Commit content and media.

### Task 6: Application Shell And Dashboard

**Files:**
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/components/AppShell.tsx`
- Create: `src/components/MasteryBars.tsx`
- Create: `src/pages/DashboardPage.tsx`
- Create: `src/pages/DashboardPage.test.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/app.css`

- [ ] Write a failing dashboard test for exam date, daily tasks, module shortcuts, and responsive navigation labels.
- [ ] Run it and confirm the missing UI failure.
- [ ] Implement the accepted desktop/mobile shell and dashboard using real planner data.
- [ ] Run the dashboard and full test suites.
- [ ] Commit the dashboard.

### Task 7: Practice Runner And Listening

**Files:**
- Create: `src/components/AudioSegmentPlayer.tsx`
- Create: `src/components/QuestionCard.tsx`
- Create: `src/pages/PracticePage.tsx`
- Create: `src/pages/PracticePage.test.tsx`

- [ ] Write failing tests for answer selection, immediate feedback in practice mode, mistake recording, marking, navigation, and audio retry state.
- [ ] Run the tests and confirm failures.
- [ ] Implement the practice runner and reusable audio player.
- [ ] Run practice and full test suites.
- [ ] Commit practice and listening.

### Task 8: Library, Mistakes, And Progress

**Files:**
- Create: `src/pages/LibraryPage.tsx`
- Create: `src/pages/MistakesPage.tsx`
- Create: `src/pages/ProgressPage.tsx`
- Create: `src/pages/StudyPages.test.tsx`

- [ ] Write failing tests for module filtering, original/variant filtering, mistake review, and mastery summaries.
- [ ] Run and confirm failures.
- [ ] Implement the three study pages using repository state and typed question data.
- [ ] Run page and full test suites.
- [ ] Commit the supporting study flows.

### Task 9: Mock Exam

**Files:**
- Create: `src/pages/MockExamPage.tsx`
- Create: `src/pages/MockExamPage.test.tsx`

- [ ] Write failing tests for 100-minute timer display, hidden pre-submit explanations, answer draft persistence, unanswered confirmation, submission, and module score report.
- [ ] Run and confirm failures.
- [ ] Implement the mock-exam state machine and result view.
- [ ] Run mock-exam and full test suites.
- [ ] Commit mock exam.

### Task 10: Production Verification

**Files:**
- Create: `README.md`
- Create: `outputs/final-exam-review-dashboard/` production build output.

- [ ] Run `npm test -- --run`.
- [ ] Run `npm run build`.
- [ ] Start the production preview and verify dashboard, practice, audio playback, mock submission, persistence, and mobile layout in a browser.
- [ ] Capture desktop and mobile screenshots and compare them to the accepted concept for layout, typography, palette, controls, spacing, and responsive behavior.
- [ ] Fix all material issues and rerun tests/build/browser checks.
- [ ] Write concise setup, deployment, content-source, and local-data notes in `README.md`.
- [ ] Copy the verified production build to `outputs/final-exam-review-dashboard/`.
- [ ] Commit the verified deliverable.
