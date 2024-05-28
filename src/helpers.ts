import { WorkEntry } from "./models";

export function notify() {
  const permissionGranted = window.Notification?.permission === "granted";
  if (permissionGranted) {
    const notification = new Notification("Timer Session Ended", {
      silent: false,
    });
    notification.addEventListener("show", () => {
      const audio = new Audio("/success-trumpets.mp3");
      audio.play().catch(console.error);
    });
  }
}

export function findTodaysEarliestEntryIdx(entries: WorkEntry[]) {
  const today = new Date();
  const timestamp = today.setHours(0, 0, 0, 0);
  let low = 0;
  let high = entries.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (entries[mid].end > timestamp) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return low;
}

export function getEntryIndex(entry: WorkEntry, entries: WorkEntry[]) {
  let low = 0;
  let high = entries.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (entries[mid].start === entry.start && entries[mid].end === entry.end) {
      return mid;
    } else if (entries[mid].end > entry.end) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }
  return -1;
}
