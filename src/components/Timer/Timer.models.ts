export interface WorkUnit {
  start: number; // milliseconds
  end: number; // milliseconds
  description: string;
  spent: number; // milliseconds
  text?: string; // property has been deprecated, but is still relevant for existing users
}

export type PartialEntry = Pick<WorkUnit, "start" | "description">;

export enum TimerStatus {
  ON = "on",
  PAUSED = "paused",
  OFF = "off",
}

export enum ClockEvent {
  START = 'START',
  STOP = 'STOP',
  TICK = 'TICK',
}