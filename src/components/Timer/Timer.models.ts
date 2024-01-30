export interface WorkUnit {
  start: number;
  end: number;
  description: string;
  spent: number;
}

export type PartialTimeEntry = Pick<WorkUnit, "start" | "description">;
