import type { FilterMode } from "./TimeEntries.constants";

export interface FilterLayer {
  selectedTags: string[];
  filterMode: FilterMode;
}
