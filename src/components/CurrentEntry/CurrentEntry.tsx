import React from "react";

import { PartialEntry, WorkEntry } from "../../models";
import { TimeTracker } from "../TimeTracker";
import { ControlledTextArea } from "../ControlledTextArea";
import { notify } from "../../helpers";

interface Props {
  saveEntry: (timeEntry: WorkEntry) => void;
}

export function CurrentEntry({ saveEntry }: Props) {
  const [partialEntry, setPartialEntry] = React.useState<PartialEntry>({
    start: -1,
    description: "",
  });

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
    setPartialEntry({
      start: -1,
      description: "",
    });
  };

  const updateEntryDescription = (description: string) => {
    setPartialEntry((prev) => ({
      ...prev,
      description,
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
      <ControlledTextArea
        content={partialEntry.description}
        setContent={updateEntryDescription}
        key={partialEntry.description}
        label="Notes"
      />
    </div>
  );
}

function beforeUnloadHandler(e: BeforeUnloadEvent) {
  e.preventDefault();
  // included for legacy support, e.g. Chrome/Edge < 119
  e.returnValue = true;
}
