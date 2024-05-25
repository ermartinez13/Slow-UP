import { useState } from "react";
import { getDayBoundaries } from "../../helpers/date.helpers";
import { findFirstEntryIdxByDate } from "../../helpers/work-unit.helpers";
import { WorkUnit } from "../Timer/Timer.models";
import { TimeEntry } from "./TimeEntry";
import { TotalsDisplay } from "../Timer/TotalsDisplay";

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
  const millisecondsSpentOnTargetDate = targetEntries.reduce(
    (acc, entry) => acc + entry.spent,
    0
  );

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
      <div className="flex justify-between items-center mb-4">
        <button className="w-28 h-6 bg-zinc-600" onClick={handlePreviousDay}>
          Previous Day
        </button>
        <div className="flex flex-col items-center">
          <span>{formattedDate}</span>
          <TotalsDisplay totalMilliseconds={millisecondsSpentOnTargetDate} />
        </div>
        <div className="space-x-4">
          <button
            className="w-28 h-6 bg-zinc-600"
            onClick={handleNextDay}
            disabled={isToday}
          >
            Next Day
          </button>
          <button
            className="w-28 h-6 bg-zinc-600"
            onClick={handleToday}
            disabled={isToday}
          >
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
