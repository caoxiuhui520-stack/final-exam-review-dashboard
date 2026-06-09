import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { StudyProvider } from "./state/StudyContext";
import { DashboardPage } from "./pages/DashboardPage";
import { PracticePage } from "./pages/PracticePage";
import "./styles/tokens.css";
import "./styles/app.css";

export function App() {
  return (
    <StudyProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<DashboardPage />} />
          <Route path="practice/:module" element={<PracticePage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </StudyProvider>
  );
}

