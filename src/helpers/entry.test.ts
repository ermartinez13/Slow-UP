import { describe, expect, it } from "vitest";

import { WorkEntry } from "../models/entry.models";
import { findFirstEntryIdxByDate, getEntryIndex } from "@/helpers";

describe("getEntryIndex", () => {
  it("returns -1 when entries is empty", () => {
    const entry: WorkEntry = {
      start: 1000,
      end: 2000,
      description: "test",
      spent: 1000,
    };
    expect(getEntryIndex(entry, [])).toBe(-1);
  });

  it("returns -1 when entry does not exist in entries", () => {
    const entry: WorkEntry = {
      start: 1000,
      end: 2000,
      description: "test",
      spent: 1000,
    };
    const entries: WorkEntry[] = [
      {
        start: 2000,
        end: 3000,
        description: "other",
        spent: 1000,
      },
    ];
    expect(getEntryIndex(entry, entries)).toBe(-1);
  });

  it("returns correct index when entry exists in entries", () => {
    const entry: WorkEntry = {
      start: 1000,
      end: 2000,
      description: "test",
      spent: 1000,
    };
    const entries: WorkEntry[] = [
      {
        start: 500,
        end: 1000,
        description: "other",
        spent: 500,
      },
      entry,
      {
        start: 2000,
        end: 3000,
        description: "other",
        spent: 1000,
      },
    ];
    expect(getEntryIndex(entry, entries)).toBe(1);
  });

  it("returns first index when duplicate entries exist", () => {
    const entry: WorkEntry = {
      start: 1000,
      end: 2000,
      description: "test",
      spent: 1000,
    };
    const entries: WorkEntry[] = [
      {
        start: 500,
        end: 1000,
        description: "other",
        spent: 500,
      },
      entry,
      entry,
      {
        start: 2000,
        end: 3000,
        description: "other",
        spent: 1000,
      },
    ];
    expect(getEntryIndex(entry, entries)).toBe(1);
  });

  it("returns correct index when entries have same start time", () => {
    const entry: WorkEntry = {
      start: 1000,
      end: 2000,
      description: "test",
      spent: 1000,
    };
    const entries: WorkEntry[] = [
      {
        start: 1000,
        end: 1500,
        description: "other",
        spent: 500,
      },
      entry,
    ];
    expect(getEntryIndex(entry, entries)).toBe(1);
  });

  it("returns correct index when entries have same end time", () => {
    const entry: WorkEntry = {
      start: 1000,
      end: 2000,
      description: "test",
      spent: 1000,
    };
    const entries: WorkEntry[] = [
      {
        start: 500,
        end: 2000,
        description: "other",
        spent: 1500,
      },
      entry,
    ];
    expect(getEntryIndex(entry, entries)).toBe(1);
  });

  it("returns -1 when entry exists but entries are not sorted", () => {
    const entry: WorkEntry = { start: 1, end: 2, description: "", spent: 1 };
    const entries: WorkEntry[] = [
      { start: 1, end: 3, description: "", spent: 1 },
      { start: 1, end: 2, description: "", spent: 1 },
    ];
    expect(getEntryIndex(entry, entries)).toBe(-1);
  });
});

describe("findFirstEntryIdxByDate", () => {
  it("returns correct index when date is between multiple entries", () => {
    const entries: WorkEntry[] = [
      { start: 1000, end: 2000, description: "test", spent: 1000 },
      { start: 2000, end: 2500, description: "test", spent: 500 },
      { start: 2500, end: 3000, description: "test", spent: 500 },
    ];
    const date = 2200;
    expect(findFirstEntryIdxByDate(date, entries)).toBe(2);
  });

  it("returns correct index when date is before multiple entries", () => {
    const entries: WorkEntry[] = [
      { start: 1000, end: 2000, description: "test", spent: 1000 },
      { start: 2000, end: 2500, description: "test", spent: 500 },
      { start: 2500, end: 3000, description: "test", spent: 500 },
    ];
    const date = 500;
    expect(findFirstEntryIdxByDate(date, entries)).toBe(0);
  });

  it("returns correct index when date is after multiple entries", () => {
    const entries: WorkEntry[] = [
      { start: 1000, end: 2000, description: "test", spent: 1000 },
      { start: 2000, end: 2500, description: "test", spent: 500 },
      { start: 2500, end: 3000, description: "test", spent: 500 },
    ];
    const date = 3500;
    expect(findFirstEntryIdxByDate(date, entries)).toBe(3);
  });

  it("returns correct index when there are multiple exact matches", () => {
    const entries: WorkEntry[] = [
      { start: 1000, end: 2000, description: "test", spent: 1000 },
      { start: 2000, end: 2500, description: "test", spent: 500 },
      { start: 2000, end: 2500, description: "test", spent: 500 },
    ];
    const date = 2000;
    expect(findFirstEntryIdxByDate(date, entries)).toBe(1);
  });

  it("returns correct index when there are no entries", () => {
    const entries: WorkEntry[] = [];
    const date = 2000;
    expect(findFirstEntryIdxByDate(date, entries)).toBe(0);
  });
});
