import { getTodaysEarliestEntryIndex } from "../../helpers";
import { TimeEntry } from "./TimeEntry";

interface Props {
  entries: Array<{ start: number; end: number; text: string }>;
}

export function TimeEntries({ entries }: Props) {
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
        return <TimeEntry entry={entry} />;
      })}
    </div>
  );
}
