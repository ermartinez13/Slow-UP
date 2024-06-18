import { useState } from "react";

import { getDayBoundaries, findFirstEntryIdxByDate } from "../../helpers";
import { WorkEntry } from "../../models";
import { TimeEntry } from "./TimeEntry";
import { TotalsDisplay } from "../Timer/TotalsDisplay";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface Props {
  entries: WorkEntry[];
  updateEntry: (timeEntry: WorkEntry) => void;
  deleteEntry: (timeEntry: WorkEntry) => void;
  tags: string[];
}

export function PreviousEntries({
  entries,
  updateEntry,
  deleteEntry,
  tags,
}: Props) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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

  const handleTagClick = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleClearFilters = () => {
    setSelectedTags([]);
  };

  const filteredEntries = targetEntries.filter((entry) => {
    if (selectedTags.length === 0) return true;
    return selectedTags.every((tag) => entry.tags.includes(tag));
  });

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
        {tags.map((tag) => (
          <Badge
            key={tag}
            onClick={() => handleTagClick(tag)}
            variant={selectedTags.includes(tag) ? "primary" : "secondary"}
          >
            {tag}
          </Badge>
        ))}
        <Button
          variant="secondary"
          onClick={handleClearFilters}
          disabled={selectedTags.length === 0}
        >
          Clear Filters
        </Button>
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
