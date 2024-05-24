import { useState } from "react";
import { getDayBoundaries } from "../../helpers/date.helpers";
import { findFirstEntryIdxByDate } from "../../helpers/work-unit.helpers";
import { WorkUnit } from "../Timer/Timer.models";
import { TimeEntry } from "./TimeEntry";

interface Props {
  entries: WorkUnit[];
  updateEntry: (timeEntry: WorkUnit) => void;
  deleteEntry: (timeEntry: WorkUnit) => void;
}

export function TimeEntries({ entries, updateEntry, deleteEntry }: Props) {
  const [dateOffset, setDateOffset] = useState(0);

  const { start: targetDateStart, end: targetDateEnd } =
    getDayBoundaries(dateOffset);
  const nextDayStart = targetDateEnd + 1;
  const firstEntryIdxForTargetDate = findFirstEntryIdxByDate(
    targetDateStart,
    entries
  );
  const firstEntryIdxForNextDay = findFirstEntryIdxByDate(
    nextDayStart,
    entries
  );
  const targetEntries = entries
    .slice(firstEntryIdxForTargetDate, firstEntryIdxForNextDay)
    .reverse();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {targetEntries.map((entry) => {
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
