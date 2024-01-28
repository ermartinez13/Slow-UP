import { TimeEntry } from "./TimeEntry";

interface Props {
  entries: Array<{ start: number; end: number; text: string }>;
}

export function TimeEntries({ entries }: Props) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
      {entries.map((entry) => {
        return <TimeEntry entry={entry} />;
      })}
    </div>
  );
}
