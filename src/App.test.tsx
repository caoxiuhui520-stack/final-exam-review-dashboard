import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, test } from "vitest";
import { App } from "./App";

beforeEach(() => localStorage.clear());

test("renders the real exam dashboard and module shortcuts", () => {
  render(<App />, { wrapper: MemoryRouter });
  expect(screen.getByRole("heading", { name: /今晚，拿下/ })).toBeInTheDocument();
  expect(screen.getAllByText("2026.06.25")).toHaveLength(2);
  expect(screen.getAllByRole("link", { name: /模拟考试/ })).toHaveLength(2);
  expect(screen.getAllByText("写作")).toHaveLength(2);
});

test("shows immediate feedback and records a practice answer", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/practice/listening"]}>
      <App />
    </MemoryRouter>,
  );
  await user.click(screen.getByRole("button", { name: /A\. It hit a bird/ }));
  await user.click(screen.getByRole("button", { name: "提交答案" }));
  expect(screen.getByText(/回答正确/)).toBeInTheDocument();
  expect(JSON.parse(localStorage.getItem("final-exam-study") ?? "{}").attempts).toHaveLength(1);
});
