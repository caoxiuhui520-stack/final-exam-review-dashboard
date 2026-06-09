import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, expect, test } from "vitest";
import { App } from "../App";

beforeEach(() => localStorage.clear());

function renderRoute(route: string) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>,
  );
}

test("filters the library to variants", async () => {
  const user = userEvent.setup();
  renderRoute("/library");
  expect(screen.getByRole("heading", { name: "自由题库" })).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: "只看变式题" }));
  expect(screen.getAllByText("变式题").length).toBeGreaterThan(0);
  expect(screen.queryByText("原题")).not.toBeInTheDocument();
});

test("shows a useful empty mistake state", () => {
  renderRoute("/mistakes");
  expect(screen.getByRole("heading", { name: "错题本" })).toBeInTheDocument();
  expect(screen.getByText(/还没有错题/)).toBeInTheDocument();
});

test("shows module mastery and attempt totals", () => {
  renderRoute("/progress");
  expect(screen.getByRole("heading", { name: "复习进度" })).toBeInTheDocument();
  expect(screen.getByText("累计作答")).toBeInTheDocument();
  expect(screen.getAllByText("50%")).toHaveLength(5);
});

test("mock exam hides explanations until submission", async () => {
  const user = userEvent.setup();
  renderRoute("/mock");
  expect(screen.getByRole("heading", { name: "模拟考试" })).toBeInTheDocument();
  expect(screen.getByText("100:00")).toBeInTheDocument();
  expect(screen.queryByText(/The report says/)).not.toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /A\. It hit a bird/ }));
  await user.click(screen.getByRole("button", { name: "交卷并查看成绩" }));
  expect(screen.getByRole("heading", { name: "模拟考试报告" })).toBeInTheDocument();
  expect(screen.getByText(/总分/)).toBeInTheDocument();
});
