import { TimeEntry } from "./TimeEntry";

interface Props {
  entries: Array<{ start: number; end: number; text: string }>;
}

export function TimeEntries({ entries }: Props) {
  return (
    <div>
      {entries.map((entry) => {
        return <TimeEntry entry={entry} />;
      })}
    </div>
  );
}
