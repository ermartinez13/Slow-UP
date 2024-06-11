import type { FormatOptions, Time } from "@/models/time.models";

export function millisecondsToTime(milliseconds: number): Time {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;
  const tenthsOfASecond = Math.floor((milliseconds % 1000) / 100); // 100ms units
  const hundredthsOfASecond = Math.floor((milliseconds % 100) / 10); // 10ms units

  return { hours, minutes, seconds, tenthsOfASecond, hundredthsOfASecond };
}

export function durationToString(
  milliseconds: number,
  options?: FormatOptions
): string {
  const time = millisecondsToTime(milliseconds);
  return timeToString(time, options);
}

export function dateTimeToString(
  milliseconds: number,
  options: FormatOptions
): string {
  const date = new Date(milliseconds);

  const time: Time = {
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
    tenthsOfASecond: Math.floor((date.getMilliseconds() % 1000) / 100),
    hundredthsOfASecond: Math.floor((date.getMilliseconds() % 100) / 10),
  };

  return timeToString(time, options);
}

function timeToString(time: Time, options?: FormatOptions): string {
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
