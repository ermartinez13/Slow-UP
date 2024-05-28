import { WorkEntry } from "../models";

export function findFirstEntryIdxByDate(
  dateInMilliseconds: number,
  entries: WorkEntry[]
) {
  let low = 0;
  let high = entries.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (entries[mid].start < dateInMilliseconds) {
      low = mid + 1; // low will always be the smallest index equal to or greater than target
    } else {
      high = mid - 1;
    }
  }
  return low;
}