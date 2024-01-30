export interface WorkUnit {
  start: number;
  end: number;
  description: string;
  spent: number;
  text?: string; // property has been deprecated, but is still relevant for existing users
}

export type PartialTimeEntry = Pick<WorkUnit, "start" | "description">;
