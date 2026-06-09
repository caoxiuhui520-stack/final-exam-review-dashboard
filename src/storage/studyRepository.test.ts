import { describe, expect, test } from "vitest";
import { createStudyRepository, emptyStudyState } from "./studyRepository";

class MemoryStorage implements Storage {
  private values = new Map<string, string>();
  get length() { return this.values.size; }
  clear() { this.values.clear(); }
  getItem(key: string) { return this.values.get(key) ?? null; }
  key(index: number) { return [...this.values.keys()][index] ?? null; }
  removeItem(key: string) { this.values.delete(key); }
  setItem(key: string, value: string) { this.values.set(key, value); }
}

describe("study repository", () => {
  test("loads an empty versioned state by default", () => {
    const repository = createStudyRepository(new MemoryStorage());
    expect(repository.load()).toEqual(emptyStudyState());
  });

  test("round trips progress and drafts", () => {
    const storage = new MemoryStorage();
    const repository = createStudyRepository(storage);
    const state = {
      ...emptyStudyState(),
      markedQuestionIds: ["q1"],
      drafts: { mock: { q1: "A" } },
    };
    repository.save(state);
    expect(repository.load()).toEqual(state);
  });

  test("backs up corrupt data and recovers", () => {
    const storage = new MemoryStorage();
    storage.setItem("final-exam-study", "{broken");
    const repository = createStudyRepository(storage);
    expect(repository.load()).toEqual(emptyStudyState());
    expect(storage.getItem("final-exam-study:corrupt")).toBe("{broken");
  });
});

