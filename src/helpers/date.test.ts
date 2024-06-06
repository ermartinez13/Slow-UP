import { describe, it, expect } from "vitest";
import { getDayBoundaries } from "./date.helpers";

describe("getDayBoundaries", () => {
  it("should return correct boundaries for a date string in ISO format", () => {
    const boundaries = getDayBoundaries("2024-06-06");
    expect(boundaries.start).toBe(
      new Date("2024-06-06T00:00:00.000Z").getTime()
    );
    expect(boundaries.end).toBe(new Date("2024-06-06T23:59:59.999Z").getTime());
  });

  it("should return correct boundaries for a date string in short format", () => {
    const boundaries = getDayBoundaries("2024-06-06T12:00:00");
    expect(boundaries.start).toBe(
      new Date("2024-06-06T00:00:00.000Z").getTime()
    );
    expect(boundaries.end).toBe(new Date("2024-06-06T23:59:59.999Z").getTime());
  });

  it("should return correct boundaries for a date string with timezone offset", () => {
    const boundaries = getDayBoundaries("2024-06-06T12:00:00+02:00");
    expect(boundaries.start).toBe(
      new Date("2024-06-06T00:00:00.000Z").getTime()
    );
    expect(boundaries.end).toBe(new Date("2024-06-06T23:59:59.999Z").getTime());
  });

  it("should return correct boundaries for a number offset", () => {
    const boundaries = getDayBoundaries(1);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 86400000);
    expect(boundaries.start).toBe(yesterday.setHours(0, 0, 0, 0));
    expect(boundaries.end).toBe(yesterday.setHours(23, 59, 59, 999));
  });

  it("should return correct boundaries for a number offset of 0", () => {
    const boundaries = getDayBoundaries(0);
    const today = new Date();
    expect(boundaries.start).toBe(today.setHours(0, 0, 0, 0));
    expect(boundaries.end).toBe(today.setHours(23, 59, 59, 999));
  });

  it("should return correct boundaries for a number offset of -1", () => {
    const boundaries = getDayBoundaries(-1);
    const today = new Date();
    const tomorrow = new Date(today.getTime() + 86400000);
    expect(boundaries.start).toBe(tomorrow.setHours(0, 0, 0, 0));
    expect(boundaries.end).toBe(tomorrow.setHours(23, 59, 59, 999));
  });

  it("should return NaN for Infinity", () => {
    const boundaries = getDayBoundaries(Infinity);
    expect(boundaries.start).toBeNaN();
    expect(boundaries.end).toBeNaN();
  });

  it("should return NaN for -Infinity", () => {
    const boundaries = getDayBoundaries(-Infinity);
    expect(boundaries.start).toBeNaN();
    expect(boundaries.end).toBeNaN();
  });

  it("should return NaN for NaN", () => {
    const boundaries = getDayBoundaries(NaN);
    expect(boundaries.start).toBeNaN();
    expect(boundaries.end).toBeNaN();
  });

  it("should return valid boundaries for a float number", () => {
    const boundaries = getDayBoundaries(1.5);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 86400000);
    expect(boundaries.start).toBeLessThan(yesterday.setHours(0, 0, 0, 0));
    expect(boundaries.end).toBeLessThan(yesterday.setHours(23, 59, 59, 999));
  });

  it("should return NaN for a number outside the safe integer range", () => {
    const boundaries = getDayBoundaries(Number.MAX_SAFE_INTEGER + 1);
    expect(boundaries.start).toBeNaN();
    expect(boundaries.end).toBeNaN();
  });
});
