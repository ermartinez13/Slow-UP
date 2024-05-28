import React from "react";

import { DEFAULT_ENTRY } from "../Timer/Timer.constants";
import { useTick } from "../../hooks/use-tick";
import { ActionButtons } from "../Timer/ActionButtons";
import { ControlledTextArea } from "../ControlledTextArea";
import { Timer } from "../Timer";
import { Toggle } from "../Toggle";
import { Stopwatch } from "../Stopwatch/Stopwatch";
import { PartialEntry, WorkEntry, ToolStatus } from "../../models";
import { notify } from "../../helpers";
import { TimeStart } from "../TimeStart";

interface Props {
  addEntry: (timeEntry: WorkEntry) => void;
}

export function TimeTool({ addEntry }: Props) {
  const {
    ticks: timeSpent,
    isRunning,
    start: startTicks,
    stop: stopTicks,
    reset,
  } = useTick({ tickLength: 100 });
  const [showPrimaryTool, setShowPrimaryTool] = React.useState(true);
  const [partialEntry, setPartialEntry] = React.useState<PartialEntry>({
    ...DEFAULT_ENTRY,
  });

  const status = isRunning
    ? ToolStatus.ON
    : timeSpent > 0
      ? ToolStatus.PAUSED
      : ToolStatus.OFF;

  const setEntryDescription = (description: string) => {
    setPartialEntry((prev) => ({
      ...prev,
      description,
    }));
  };

  const startPause = () => {
    // pause time tracking
    if (status === ToolStatus.ON) {
      stopTicks();
    } else {
      if (status === ToolStatus.OFF) {
        /*
          when transitioning from off to on:
          - add listener to prevent inadvertent data loss (via warning dialog)
          - mark the start of the time tracking
        */
        window.addEventListener("beforeunload", beforeUnloadHandler);
        setPartialEntry((prev) => ({ ...prev, start: Date.now() }));
      }
      // start or resume time tracking
      startTicks();
    }
  };

  const stop = () => {
    /*
    when transitioning to off:
    - remove listener that prevents data loss (via warning dialog)
    - reset the tracked time to zero
    - trigger desktop notifications that session has completed
    - create and save a new entry with the tracked time
    - reset the time entry to its default state
  */
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    reset();
    notify();
    const timeEntry: WorkEntry = {
      ...partialEntry,
      end: Date.now(),
      spent: timeSpent,
    };
    setPartialEntry({ ...DEFAULT_ENTRY });
    addEntry(timeEntry);
  };

  const toggleTool = () => {
    setShowPrimaryTool((prev) => !prev);
  };

  return (
    <div className="grid gap-y-8 place-content-center">
      <Toggle
        isOn={showPrimaryTool}
        handleToggle={toggleTool}
        offText="Stopwatch"
        onText="Timer"
      />
      <TimeStart startTimeMs={partialEntry.start} />
      {showPrimaryTool ? (
        <Timer timeSpent={timeSpent} stop={stop} status={status} />
      ) : (
        <Stopwatch timeSpent={timeSpent} />
      )}
      <ActionButtons
        handleStartPause={startPause}
        handleStop={stop}
        status={status}
      />
      <ControlledTextArea
        content={partialEntry.description}
        setContent={setEntryDescription}
        key={partialEntry.description}
      />
    </div>
  );
}

function beforeUnloadHandler(e: BeforeUnloadEvent) {
  e.preventDefault();
  // included for legacy support, e.g. Chrome/Edge < 119
  e.returnValue = true;
}
