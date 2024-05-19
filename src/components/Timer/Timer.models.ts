export interface WorkUnit {
  start: number;
  end: number;
  description: string;
  spent: number;
  text?: string; // property has been deprecated, but is still relevant for existing users
}

export type PartialEntry = Pick<WorkUnit, "start" | "description">;

export enum TimerStatus {
  ON = "on",
  PAUSED = "paused",
  OFF = "off",
}

export enum TimerEvents {
  START = "START",
  STOP = "STOP",
  PAUSE = "PAUSE",
  TICK = "TICK",
}

export enum TickEvent {
  START = 'start',
  STOP = 'stop',
  TICK = 'tick',
}