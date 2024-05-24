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

  const handlePreviousDay = () => {
    setDateOffset(dateOffset + 1);
  };

  const handleNextDay = () => {
    if (dateOffset > 0) {
      setDateOffset(dateOffset - 1);
    }
  };

  const handleToday = () => {
    setDateOffset(0);
  };

  const isToday = dateOffset === 0;
  const formattedDate = new Date(targetDateStart).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div>
      <div className="flex justify-between mb-4">
        <button onClick={handlePreviousDay}>Previous Day</button>
        <span>{formattedDate}</span>
        <div>
          <button onClick={handleNextDay} disabled={isToday}>
            Next Day
          </button>
          <button onClick={handleToday} disabled={isToday}>
            Today
          </button>
        </div>
      </div>
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
    </div>
  );
}
