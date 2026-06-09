import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders the exam review dashboard", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: "期末冲刺台" })).toBeInTheDocument();
});
