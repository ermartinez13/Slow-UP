interface TimeBreakdown {
  hours: number;
  minutes: number;
  seconds: number;
  centiseconds: number;
}

export function millisecondsToTimeBreakdown(milliseconds: number): TimeBreakdown {
  const centiseconds = Math.floor((milliseconds % 1000) / 10);
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  return { hours, minutes, seconds: secondsLeft, centiseconds };
}

interface FormatOptions {
  showSeconds?: boolean;
  padHours?: boolean;
  showTenthsOfASecond?: boolean;
  showAmPm?: boolean;
}

export function formatDuration(milliseconds: number, options?: FormatOptions): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const secondsRemaining = seconds % 60;
  const tenthsOfASecond = Math.floor((milliseconds % 1000) / 100);

  return formatTimeString(hours, minutes, secondsRemaining, tenthsOfASecond, options);
}

export function formatDateTime(milliseconds: number, options?: FormatOptions): string {
  const date = new Date(milliseconds);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = options?.showAmPm ? (hours >= 12 ? "pm" : "am") : "";

  return formatTimeString(hours, minutes, seconds, 0, options) + ` ${ampm}`;
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
  const tenthsOfASecondStr = mergedOptions.showTenthsOfASecond ? `.${tenthsOfASecond}` : "";

  return `${hoursStr}:${padZero(minutes)}${secondsStr}${tenthsOfASecondStr}`;
}

function padZero(number: number): string {
  return number.toString().padStart(2, "0");
}