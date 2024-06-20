export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
  tenthsOfASecond: number;
}

export interface TimeFormattingOptions {
  showSeconds?: boolean;
  padHours?: boolean;
  showTenthsOfASecond?: boolean;
  showAmPm?: boolean;
}
