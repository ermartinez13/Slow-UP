import React from "react";

import { DEFAULT_ENTRY } from "../Timer/Timer.constants";
import { useTick } from "../../hooks/use-tick";
import { notify } from "../../helpers";
import { ActionButtons } from "../Timer/ActionButtons";
import { ControlledTextArea } from "../ControlledTextArea";
import { Timer } from "../Timer";
import { Toggle } from "../Toggle";
import { Stopwatch } from "../Stopwatch/Stopwatch";
import { PartialEntry, WorkEntry, ToolStatus } from "../../models";

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
    if (status === ToolStatus.ON) {
      stopTicks();
    } else {
      if (status === ToolStatus.OFF) {
        window.addEventListener("beforeunload", beforeUnloadHandler);
        setPartialEntry((prev) => ({ ...prev, start: Date.now() }));
      }
      startTicks();
    }
  };

  const stop = () => {
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
      {showPrimaryTool ? (
        <Timer
          timeSpent={timeSpent}
          stop={stop}
          status={status}
          partialEntry={partialEntry}
        />
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
