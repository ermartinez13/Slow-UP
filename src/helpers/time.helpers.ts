interface TimeBreakdown {
  hours: number;
  minutes: number;
  seconds: number;
  centiseconds: number;
  tenthsOfASecond: number;
}

export function millisecondsToTimeBreakdown(
  milliseconds: number
): TimeBreakdown {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;
  const tenthsOfASecond = Math.floor((milliseconds % 1000) / 100); // 100ms units
  const centiseconds = Math.floor((milliseconds % 100) / 10); // updated logic

  return { hours, minutes, seconds, centiseconds, tenthsOfASecond };
}

interface FormatOptions {
  showSeconds?: boolean;
  padHours?: boolean;
  showTenthsOfASecond?: boolean;
  showAmPm?: boolean;
}

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
  tenthsOfASecond: number;
}

export function formatDuration(
  milliseconds: number,
  options?: FormatOptions
): string {
  const { hours, minutes, seconds, tenthsOfASecond } =
    millisecondsToTimeBreakdown(milliseconds);

  const time: Time = {
    hours,
    minutes,
    seconds,
    tenthsOfASecond,
  };

  return formatTimeString(time, options);
}

export function formatDateTime(
  milliseconds: number,
  options: FormatOptions
): string {
  const date = new Date(milliseconds);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const time: Time = {
    hours: options.showAmPm ? hours % 12 || 12 : hours,
    minutes,
    seconds,
    tenthsOfASecond: 0,
  };

  const timeString = formatTimeString(time, options);
  const ampm = options.showAmPm ? formatAmPm(hours) : "";

  return `${timeString} ${ampm}`.trim();
}

function formatTimeString(time: Time, options?: FormatOptions): string {
  const defaultOptions: FormatOptions = {
    showSeconds: true,
    padHours: false,
    showTenthsOfASecond: false,
    showAmPm: false,
  };

  const mergedOptions: FormatOptions = { ...defaultOptions, ...options };

  const hoursStr = mergedOptions.padHours ? padZero(time.hours) : time.hours;
  const secondsStr = mergedOptions.showSeconds
    ? `:${padZero(time.seconds)}`
    : "";
  const tenthsOfASecondStr = mergedOptions.showTenthsOfASecond
    ? `.${time.tenthsOfASecond}`
    : "";

  return `${hoursStr}:${padZero(
    time.minutes
  )}${secondsStr}${tenthsOfASecondStr}`;
}

function formatAmPm(hours: number): string {
  return hours >= 12 ? "pm" : "am";
}

function padZero(number: number): string {
  return number.toString().padStart(2, "0");
}
