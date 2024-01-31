import { getTodaysEarliestEntryIndex } from "../../helpers";
import { WorkUnit } from "../Timer/Timer.models";
import { TimeEntry } from "./TimeEntry";

interface Props {
  entries: WorkUnit[];
  updateEntry: (timeEntry: WorkUnit) => void;
}

export function TimeEntries({ entries, updateEntry }: Props) {
  const idx = getTodaysEarliestEntryIndex(entries);
  const todaysEntries = entries.slice(idx).reverse();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        maxHeight: "318px",
        overflow: "auto",
      }}
    >
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
