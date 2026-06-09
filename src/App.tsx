import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { StudyProvider } from "./state/StudyContext";
import { DashboardPage } from "./pages/DashboardPage";
import { LibraryPage } from "./pages/LibraryPage";
import { MistakesPage } from "./pages/MistakesPage";
import { MockExamPage } from "./pages/MockExamPage";
import { PracticePage } from "./pages/PracticePage";
import { ProgressPage } from "./pages/ProgressPage";
import "./styles/tokens.css";
import "./styles/app.css";

export function App() {
  return (
    <StudyProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="library" element={<LibraryPage />} />
          <Route path="practice/:module" element={<PracticePage />} />
          <Route path="mock" element={<MockExamPage />} />
          <Route path="mistakes" element={<MistakesPage />} />
          <Route path="progress" element={<ProgressPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </StudyProvider>
  );
}
