import React from "react";

import { PartialEntry, WorkEntry } from "@/models";
import { TimeTracker } from "./TimeTracker";
import { ControlledTextArea } from "@/components/ControlledTextArea";
import { notify } from "@/helpers";
import { AddTagForm } from "@/components/AddTagForm";
import { TagList } from "@/components/TagList";
import { DEFAULT_PARTIAL_ENTRY } from "./Timer.constants";

interface Props {
  saveEntry: (timeEntry: WorkEntry) => void;
  tags: string[];
}

export function CurrentEntry({ saveEntry, tags }: Props) {
  const [partialEntry, setPartialEntry] = React.useState<PartialEntry>(
    DEFAULT_PARTIAL_ENTRY
  );

  const updateEntryStart = (startTimestamp: number) => {
    setPartialEntry((prev) => ({ ...prev, start: startTimestamp }));
  };

  const saveAndResetEntry = (endTimestamp: number, timeSpentMs: number) => {
    const entry: WorkEntry = {
      ...partialEntry,
      end: endTimestamp,
      spent: timeSpentMs,
    };
    saveEntry(entry);
    setPartialEntry(DEFAULT_PARTIAL_ENTRY);
  };

  const updateEntryDescription = (description: string) => {
    setPartialEntry((prev) => ({
      ...prev,
      description,
    }));
  };

  const addTag = (tag: string) => {
    setPartialEntry((prev) => ({
      ...prev,
      tags: [...prev.tags, tag],
    }));
  };

  const removeTag = (tag: string) => {
    setPartialEntry((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleStart = (startTimestamp: number) => {
    // add listener to prevent inadvertent data loss (via warning dialog)
    window.addEventListener("beforeunload", beforeUnloadHandler);
    updateEntryStart(startTimestamp);
  };

  const handleEnd = (endTimestamp: number, timeSpentMs: number) => {
    /*
    when time tracking session completes:
    - remove listener that prevents data loss (via warning dialog)
    - trigger desktop notifications that session has completed
    - save completed entry and reset current entry state
  */
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    notify();
    saveAndResetEntry(endTimestamp, timeSpentMs);
  };

  return (
    <div className="grid gap-y-8 place-content-center">
      <TimeTracker
        onStart={handleStart}
        onEnd={handleEnd}
        startTimestamp={partialEntry.start}
      />
      <div className="flex flex-col items-center gap-4">
        <ControlledTextArea
          content={partialEntry.description}
          setContent={updateEntryDescription}
          key={partialEntry.description}
          label="Notes"
        />
        <TagList tags={partialEntry.tags} onDelete={removeTag} />
        <AddTagForm
          tags={tags.filter((tag) => !partialEntry.tags.includes(tag))}
          addTag={addTag}
        />
      </div>
    </div>
  );
}

function beforeUnloadHandler(e: BeforeUnloadEvent) {
  e.preventDefault();
  // included for legacy support, e.g. Chrome/Edge < 119
  e.returnValue = true;
}
