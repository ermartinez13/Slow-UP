import { describe, it, expect } from "vitest";

import { dateTimeToString, millisecondsToTime } from ".";

describe(`${millisecondsToTime.name}`, () => {
  it("should break down duration in milliseconds to tenths of a second accuracy", () => {
    const milliseconds = 9999;
    const breakdown = millisecondsToTime(milliseconds);
    expect(breakdown).toEqual({
      hours: 0,
      minutes: 0,
      seconds: 9,
      tenthsOfASecond: 9,
    });
  });

  it("should reconstruct duration in milliseconds to tenths of a second accuracy", () => {
    const milliseconds = 999;
    const breakdown = millisecondsToTime(milliseconds);
    const reconstructedMilliseconds =
      breakdown.hours * 60 * 60 * 1000 +
      breakdown.minutes * 60 * 1000 +
      breakdown.seconds * 1000 +
      breakdown.tenthsOfASecond * 100;
    expect(reconstructedMilliseconds).toBe(900);
  });

  it("should ignore hundredths and thousandths of a second differences when not rounding", () => {
    const milliseconds1 = 900;
    const milliseconds2 = 999;
    const breakdown1 = millisecondsToTime(milliseconds1);
    const breakdown2 = millisecondsToTime(milliseconds2);
    expect(breakdown2).toEqual(breakdown1);
    expect(breakdown1.tenthsOfASecond).toBe(9);
    expect(breakdown2.tenthsOfASecond).toBe(9);
  });

  it("should round to the nearest second when shouldRound is true", () => {
    const milliseconds1 = 900;
    const milliseconds2 = 999;
    const breakdown1 = millisecondsToTime(milliseconds1, true);
    const breakdown2 = millisecondsToTime(milliseconds2, true);
    expect(breakdown1.tenthsOfASecond).toBe(9);
    expect(breakdown1.seconds).toBe(0);
    expect(breakdown2.tenthsOfASecond).toBe(0);
    expect(breakdown2.seconds).toBe(1);
  });
});

describe(`${dateTimeToString.name}`, () => {
  it("should format am time correctly", () => {
    const morningDate = new Date("2024-06-07T06:30:00.000Z");
    const result = dateTimeToString(morningDate.getTime(), {
      showSeconds: true,
      showAmPm: true,
    });
    expect(result).toBe("6:30:00 am");
  });

  it("should format pm time correctly", () => {
    const eveningDate = new Date("2024-06-07T18:30:00.000Z");
    const result = dateTimeToString(eveningDate.getTime(), {
      showSeconds: true,
      showAmPm: true,
    });
    expect(result).toBe("6:30:00 pm");
  });

  it("should format 12-hr midnight correctly", () => {
    const midnightDate = new Date("2024-06-07T00:00:00.000Z");
    const result = dateTimeToString(midnightDate.getTime(), {
      showSeconds: true,
      showAmPm: true,
    });
    expect(result).toBe("12:00:00 am");
  });

  it("should format one second before 12-hr midnight correctly", () => {
    const beforeMidnightDate = new Date("2024-06-06T23:59:59.000Z");
    const result = dateTimeToString(beforeMidnightDate.getTime(), {
      showSeconds: true,
      showAmPm: true,
    });
    expect(result).toBe("11:59:59 pm");
  });

  it("should format one second after 12-hr midnight correctly", () => {
    const afterMidnightDate = new Date("2024-06-07T00:00:01.000Z");
    const result = dateTimeToString(afterMidnightDate.getTime(), {
      showSeconds: true,
      showAmPm: true,
    });
    expect(result).toBe("12:00:01 am");
  });

  it("should format 24-hr morning time correctly", () => {
    const morningDate = new Date("2024-06-07T06:30:00.000Z");
    const result = dateTimeToString(morningDate.getTime(), {
      showSeconds: true,
      showAmPm: false,
      padHours: true,
    });
    expect(result).toBe("06:30:00");
  });

  it("should format 24-hr evening time correctly", () => {
    const eveningDate = new Date("2024-06-07T18:30:00.000Z");
    const result = dateTimeToString(eveningDate.getTime(), {
      showSeconds: true,
      showAmPm: false,
    });
    expect(result).toBe("18:30:00");
  });

  it("should format 24-hr midnight correctly", () => {
    const midnightDate = new Date("2024-06-07T00:00:00.000Z");
    const result = dateTimeToString(midnightDate.getTime(), {
      showSeconds: true,
      showAmPm: false,
      padHours: true,
    });
    expect(result).toBe("00:00:00");
  });

  it("should format one second before 24-hr midnight correctly", () => {
    const beforeMidnightDate = new Date("2024-06-06T23:59:59.000Z");
    const result = dateTimeToString(beforeMidnightDate.getTime(), {
      showSeconds: true,
      showAmPm: false,
    });
    expect(result).toBe("23:59:59");
  });

  it("should format one second after 24-hr midnight correctly", () => {
    const afterMidnightDate = new Date("2024-06-07T00:00:01.000Z");
    const result = dateTimeToString(afterMidnightDate.getTime(), {
      showSeconds: true,
      showAmPm: false,
      padHours: true,
    });
    expect(result).toBe("00:00:01");
  });
});
