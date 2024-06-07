import { describe, it, expect } from "vitest";
import { getDayBoundaries } from "./date.helpers";
import { formatDateTime } from "./time.helpers";

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

describe("formatDateTime", () => {
  it("should format am time correctly", () => {
    const morningDate = new Date("2024-06-07T06:30:00.000Z");
    const result = formatDateTime(morningDate.getTime(), {
      showSeconds: true,
      showAmPm: true,
    });
    expect(result).toBe("6:30:00 am");
  });

  it("should format pm time correctly", () => {
    const eveningDate = new Date("2024-06-07T18:30:00.000Z");
    const result = formatDateTime(eveningDate.getTime(), {
      showSeconds: true,
      showAmPm: true,
    });
    expect(result).toBe("6:30:00 pm");
  });

  it("should format 12-hr midnight correctly", () => {
    const midnightDate = new Date("2024-06-07T00:00:00.000Z");
    const result = formatDateTime(midnightDate.getTime(), {
      showSeconds: true,
      showAmPm: true,
    });
    expect(result).toBe("12:00:00 am");
  });

  it("should format one second before 12-hr midnight correctly", () => {
    const beforeMidnightDate = new Date("2024-06-06T23:59:59.000Z");
    const result = formatDateTime(beforeMidnightDate.getTime(), {
      showSeconds: true,
      showAmPm: true,
    });
    expect(result).toBe("11:59:59 pm");
  });

  it("should format one second after 12-hr midnight correctly", () => {
    const afterMidnightDate = new Date("2024-06-07T00:00:01.000Z");
    const result = formatDateTime(afterMidnightDate.getTime(), {
      showSeconds: true,
      showAmPm: true,
    });
    expect(result).toBe("12:00:01 am");
  });

  it("should format 24-hr morning time correctly", () => {
    const morningDate = new Date("2024-06-07T06:30:00.000Z");
    const result = formatDateTime(morningDate.getTime(), {
      showSeconds: true,
      showAmPm: false,
      padHours: true,
    });
    expect(result).toBe("06:30:00");
  });

  it("should format 24-hr evening time correctly", () => {
    const eveningDate = new Date("2024-06-07T18:30:00.000Z");
    const result = formatDateTime(eveningDate.getTime(), {
      showSeconds: true,
      showAmPm: false,
    });
    expect(result).toBe("18:30:00");
  });

  it("should format 24-hr midnight correctly", () => {
    const midnightDate = new Date("2024-06-07T00:00:00.000Z");
    const result = formatDateTime(midnightDate.getTime(), {
      showSeconds: true,
      showAmPm: false,
      padHours: true,
    });
    expect(result).toBe("00:00:00");
  });

  it("should format one second before 24-hr midnight correctly", () => {
    const beforeMidnightDate = new Date("2024-06-06T23:59:59.000Z");
    const result = formatDateTime(beforeMidnightDate.getTime(), {
      showSeconds: true,
      showAmPm: false,
    });
    expect(result).toBe("23:59:59");
  });

  it("should format one second after 24-hr midnight correctly", () => {
    const afterMidnightDate = new Date("2024-06-07T00:00:01.000Z");
    const result = formatDateTime(afterMidnightDate.getTime(), {
      showSeconds: true,
      showAmPm: false,
      padHours: true,
    });
    expect(result).toBe("00:00:01");
  });
});
