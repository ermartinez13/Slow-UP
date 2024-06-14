export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
  tenthsOfASecond: number;
}

export interface FormatOptions {
  showSeconds?: boolean;
  padHours?: boolean;
  showTenthsOfASecond?: boolean;
  showAmPm?: boolean;
}
