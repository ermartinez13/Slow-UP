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

export function formatDuration(
  milliseconds: number,
  options?: FormatOptions
): string {
  const { hours, minutes, seconds, tenthsOfASecond } =
    millisecondsToTimeBreakdown(milliseconds);

  return formatTimeString(hours, minutes, seconds, tenthsOfASecond, options);
}

export function formatDateTime(
  milliseconds: number,
  options?: FormatOptions
): string {
  const date = new Date(milliseconds);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = options?.showAmPm ? (hours >= 12 ? "pm" : "am") : "";

  const hours12 = hours % 12 || 12;

  return formatTimeString(hours12, minutes, seconds, 0, options) + ` ${ampm}`;
}

function formatTimeString(
  hours: number,
  minutes: number,
  seconds: number,
  tenthsOfASecond: number,
  options?: FormatOptions
): string {
  const defaultOptions: FormatOptions = {
    showSeconds: true,
    padHours: false,
    showTenthsOfASecond: false,
    showAmPm: false,
  };

  const mergedOptions: FormatOptions = { ...defaultOptions, ...options };

  const hoursStr = mergedOptions.padHours ? padZero(hours) : hours;
  const secondsStr = mergedOptions.showSeconds ? `:${padZero(seconds)}` : "";
  const tenthsOfASecondStr = mergedOptions.showTenthsOfASecond
    ? `.${tenthsOfASecond}`
    : "";

  return `${hoursStr}:${padZero(minutes)}${secondsStr}${tenthsOfASecondStr}`;
}

function padZero(number: number): string {
  return number.toString().padStart(2, "0");
}
