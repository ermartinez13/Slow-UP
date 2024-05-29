import React from "react";
import { PartialEntry, WorkEntry } from "../../models";
import { TimeStart } from "../TimeStart";
import { TimeTool } from "../TimeTool/TimeTool";
import { ControlledTextArea } from "../ControlledTextArea";

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

  const saveCompletionAndReset = (endTimestamp: number, timeSpent: number) => {
    const entry: WorkEntry = {
      ...partialEntry,
      end: endTimestamp,
      spent: timeSpent,
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

  return (
    <div className="grid gap-y-8 place-content-center">
      <TimeStart startTimeMs={partialEntry.start} />
      <TimeTool
        setStart={updateEntryStart}
        saveCompletion={saveCompletionAndReset}
      />
      <ControlledTextArea
        content={partialEntry.description}
        setContent={updateEntryDescription}
        key={partialEntry.description}
      />
    </div>
  );
}
