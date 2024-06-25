import React from "react";

import { getDayBoundaries, findFirstEntryIdxByDate } from "@/helpers";
import { WorkEntry } from "@/models";
import { TimeEntry } from "./TimeEntry";
import { TotalsDisplay } from "@/components/TimeTracking/TotalsDisplay";
import { Button } from "@/components/ui/button";
import { TagsFilter } from "./TagFilter";
import { FilterMode } from "./TimeEntries.constants";
import { FilterLayer } from "./TimeEntries.models";

interface Props {
  entries: WorkEntry[];
  updateEntry: (timeEntry: WorkEntry) => void;
  deleteEntry: (timeEntry: WorkEntry) => void;
  tags: string[];
}

export function TimeEntries({
  entries,
  updateEntry,
  deleteEntry,
  tags,
}: Props) {
  const [filterLayers, setFilterLayers] = React.useState<FilterLayer[]>([]);
  const [dateOffset, setDateOffset] = React.useState(0);

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

  const filteredEntries = filterLayers.reduce((prevFilteredEntries, layer) => {
    if (layer.selectedTags.length === 0) return prevFilteredEntries;

    // apply the current filter layer
    return prevFilteredEntries.filter((entry) => {
      switch (layer.filterMode) {
        case FilterMode.OR:
          return layer.selectedTags.some((selectedTag) =>
            entry.tags?.includes(selectedTag)
          );
        case FilterMode.AND:
          return layer.selectedTags.every((tag) => entry.tags?.includes(tag));
        default:
          return true;
      }
    });
  }, targetEntries); // initial value is the full list of entries

  const millisecondsSpentOnTargetDate = filteredEntries.reduce(
    (acc, entry) => acc + entry.spent,
    0
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Button variant="secondary" onClick={handlePreviousDay}>
          Previous Day
        </Button>
        <div className="flex flex-col items-center">
          <span>{formattedDate}</span>
          <TotalsDisplay totalMilliseconds={millisecondsSpentOnTargetDate} />
        </div>
        <div className="space-x-4">
          <Button
            variant="secondary"
            onClick={handleNextDay}
            disabled={isToday}
          >
            Next Day
          </Button>
          <Button variant="secondary" onClick={handleToday} disabled={isToday}>
            Today
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <TagsFilter
          tags={tags}
          filterLayers={filterLayers}
          setFilterLayers={setFilterLayers}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {filteredEntries.map((entry) => {
          return (
            <TimeEntry
              entry={entry}
              key={entry.start}
              updateEntry={updateEntry}
              deleteEntry={deleteEntry}
              tags={tags}
            />
          );
        })}
      </div>
    </div>
  );
}
