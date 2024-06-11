import { describe, it, expect } from "vitest";

import { dateTimeToString, millisecondsToTime } from ".";

describe(`${millisecondsToTime.name}`, () => {
  it("should break down a specific time range", () => {
    const milliseconds = 3725130;
    const breakdown = millisecondsToTime(milliseconds);
    expect(breakdown).toEqual({
      hours: 1,
      minutes: 2,
      seconds: 5,
      tenthsOfASecond: 1,
      hundredthsOfASecond: 3,
    });
  });

  it("should be accurate to hundredths of a second when reconstructing the input from the output", () => {
    const milliseconds = 123456;
    const breakdown = millisecondsToTime(milliseconds);
    const reconstructedMilliseconds =
      breakdown.hours * 60 * 60 * 1000 +
      breakdown.minutes * 60 * 1000 +
      breakdown.seconds * 1000 +
      breakdown.tenthsOfASecond * 100 +
      breakdown.hundredthsOfASecond * 10;
    expect(reconstructedMilliseconds).toBe(123450);
  });

  it("should ignore thousandths of a second differences", () => {
    const milliseconds1 = 123450;
    const milliseconds2 = 123459;
    const breakdown1 = millisecondsToTime(milliseconds1);
    const breakdown2 = millisecondsToTime(milliseconds2);
    expect(breakdown2).toEqual(breakdown1);
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
