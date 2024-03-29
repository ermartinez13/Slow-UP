import { findTodaysEarliestEntryIdx } from "../../helpers";
import { WorkUnit } from "../Timer/Timer.models";
import { TimeEntry } from "./TimeEntry";

interface Props {
  entries: WorkUnit[];
  updateEntry: (timeEntry: WorkUnit) => void;
}

export function TimeEntries({ entries, updateEntry }: Props) {
  const idx = findTodaysEarliestEntryIdx(entries);
  const todaysEntries = entries.slice(idx).reverse();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {todaysEntries.map((entry) => {
        return (
          <TimeEntry
            entry={entry}
            key={entry.start}
            updateEntry={updateEntry}
          />
        );
      })}
    </div>
  );
}
