export interface WorkUnit {
  start: number;
  end: number;
  description: string;
  spent: number;
  text?: string; // property has been deprecated, but is still relevant for existing users
}

export type PartialEntry = Pick<WorkUnit, "start" | "description">;
