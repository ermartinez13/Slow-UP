import type { TimeFormattingOptions, Time } from "@/models";

export function millisecondsToTime(
  milliseconds: number,
  roundTenths: boolean = false
): Time {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;
  const hundredthsOfASecondDetailed = Math.floor((milliseconds % 1000) / 10);
  let tenthsOfASecond = roundTenths
    ? Math.round(hundredthsOfASecondDetailed / 10)
    : Math.floor(hundredthsOfASecondDetailed / 10);
  let secondsAdjusted = seconds;
  let minutesAdjusted = minutes;
  let hoursAdjusted = hours;

  if (tenthsOfASecond === 10) {
    tenthsOfASecond = 0;
    secondsAdjusted++;
    if (secondsAdjusted === 60) {
      secondsAdjusted = 0;
      minutesAdjusted++;
      if (minutesAdjusted === 60) {
        minutesAdjusted = 0;
        hoursAdjusted++;
      }
    }
  }

  return {
    hours: hoursAdjusted,
    minutes: minutesAdjusted,
    seconds: secondsAdjusted,
    tenthsOfASecond,
  };
}

export function durationToString(milliseconds: number): string {
  if (milliseconds < 1000) {
    return "0s";
  }

  const time = millisecondsToTime(milliseconds);
  const units = [];

  if (time.hours > 0) {
    units.push(`${time.hours}hr${time.hours > 1 ? "s" : ""}`);
  }

  if (time.minutes > 0) {
    units.push(`${time.minutes}min${time.minutes > 1 ? "s" : ""}`);
  }

  if (time.seconds > 0) {
    units.push(`${time.seconds}s`);
  }

  return units.join(" ");
}

export function dateTimeToString(
  milliseconds: number,
  options: TimeFormattingOptions
): string {
  const date = new Date(milliseconds);

  const time: Time = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    tenthsOfASecond: Math.floor((date.getMilliseconds() % 1000) / 100),
  };

  return timeToString(time, options);
}

function timeToString(time: Time, options?: TimeFormattingOptions): string {
  const {
    showSeconds = true,
    padHours = false,
    showTenthsOfASecond = false,
    showAmPm = false,
  } = options || {};
  let hours = time.hours;
  let ampm = "";

  if (showAmPm) {
    hours = hours % 12 || 12;
    ampm = time.hours >= 12 ? "pm" : "am";
  }

  const hoursStr = padHours ? padZero(hours) : hours;
  const secondsStr = showSeconds ? `:${padZero(time.seconds)}` : "";
  const tenthsOfASecondStr = showTenthsOfASecond
    ? `.${time.tenthsOfASecond}`
    : "";

  return `${hoursStr}:${padZero(
    time.minutes
  )}${secondsStr}${tenthsOfASecondStr} ${ampm}`.trim();
}

function padZero(number: number): string {
  return number.toString().padStart(2, "0");
}
