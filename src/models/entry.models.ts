export interface WorkEntry {
  start: number; // milliseconds
  end: number; // milliseconds
  description: string;
  spent: number; // milliseconds
}

export type PartialEntry = Pick<WorkEntry, "start" | "description">;