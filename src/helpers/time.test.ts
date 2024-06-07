import { describe, it, expect } from "vitest";
import { millisecondsToTimeBreakdown } from ".";

describe("millisecondsToTimeBreakdown", () => {
  it("should break down a specific time range", () => {
    const milliseconds = 3725130;
    const breakdown = millisecondsToTimeBreakdown(milliseconds);
    expect(breakdown).toEqual({
      hours: 1,
      minutes: 2,
      seconds: 5,
      centiseconds: 3,
      tenthsOfASecond: 1,
    });
  });

  it("should be accurate to hundredths of a second when reconstructing the input from the output", () => {
    const milliseconds = 123456;
    const breakdown = millisecondsToTimeBreakdown(milliseconds);
    const reconstructedMilliseconds =
      breakdown.hours * 60 * 60 * 1000 +
      breakdown.minutes * 60 * 1000 +
      breakdown.seconds * 1000 +
      breakdown.tenthsOfASecond * 100 +
      breakdown.centiseconds * 10;
    expect(reconstructedMilliseconds).toBe(123450);
  });

  it("should ignore thousandths of a second differences", () => {
    const milliseconds1 = 123450;
    const milliseconds2 = 123459;
    const breakdown1 = millisecondsToTimeBreakdown(milliseconds1);
    const breakdown2 = millisecondsToTimeBreakdown(milliseconds2);
    expect(breakdown2).toEqual(breakdown1);
  });
});
