export interface WorkEntry {
  start: number; // milliseconds
  end: number; // milliseconds
  description: string;
  spent: number; // milliseconds
  tags?: string[];
}

export type PartialEntry = Pick<WorkEntry, "start" | "description"> &
  Required<Pick<WorkEntry, "tags">>;
