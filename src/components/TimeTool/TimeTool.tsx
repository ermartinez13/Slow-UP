import { ToolStatus } from "../../models/tool.models";
import { PartialEntry, WorkUnit } from "../Timer/Timer.models";
import { DEFAULT_ENTRY } from "../Timer/Timer.constants";
import { useTick } from "../../hooks/use-tick";
import { notify } from "../../helpers";
import { ActionButtons } from "../Timer/ActionButtons";
import { ControlledTextArea } from "../ControlledTextArea";
import { Timer } from "../Timer";
import React from "react";

interface Props {
  addEntry: (timeEntry: WorkUnit) => void;
}

export function TimeTool({ addEntry }: Props) {
  const {
    ticks: timeSpent,
    isRunning,
    start: startTicks,
    stop: stopTicks,
    reset,
  } = useTick({ tickLength: 100 });
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
    const timeEntry: WorkUnit = {
      ...partialEntry,
      end: Date.now(),
      spent: timeSpent,
    };
    setPartialEntry({ ...DEFAULT_ENTRY });
    addEntry(timeEntry);
  };

  return (
    <div className="grid gap-y-8 place-content-center">
      <Timer
        timeSpent={timeSpent}
        status={status}
        partialEntry={partialEntry}
        stop={stop}
      />
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
