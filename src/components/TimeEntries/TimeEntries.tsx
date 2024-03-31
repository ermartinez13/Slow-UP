import { findTodaysEarliestEntryIdx } from "../../helpers";
import { WorkUnit } from "../Timer/Timer.models";
import { TimeEntry } from "./TimeEntry";

interface Props {
  entries: WorkUnit[];
  updateEntry: (timeEntry: WorkUnit) => void;
  deleteEntry: (timeEntry: WorkUnit) => void;
}

export function TimeEntries({ entries, updateEntry, deleteEntry }: Props) {
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
            deleteEntry={deleteEntry}
          />
        );
      })}
    </div>
  );
}
