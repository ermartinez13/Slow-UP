import { useState } from "react";

import { notify, updatePartialEntry } from "../../helpers";
import { ControlledTextArea } from "../ControlledTextArea";
import { TimeRange } from "../TimeRange";
import { useTick } from "../../hooks/use-tick";
import { ToolStatus } from "../../models/tool.models";
import { PartialEntry, WorkUnit } from "../Timer/Timer.models";
import { DEFAULT_ENTRY, DEFAULT_TIME } from "../Timer/Timer.constants";
import { ActionButtons } from "../Timer/ActionButtons";
import { TimeDisplay } from "../Timer/TimeDisplay";

interface Props {
  addEntry: (timeEntry: WorkUnit) => void;
}

export function StopWatch({ addEntry }: Props) {
  const { ticks, isRunning, start, stop, reset } = useTick({ tickLength: 100 });
  const [partialEntry, setPartialEntry] = useState<PartialEntry>({
    ...DEFAULT_ENTRY,
  });

  const status = isRunning
    ? ToolStatus.ON
    : ticks > 0
      ? ToolStatus.PAUSED
      : ToolStatus.OFF;

  const handleStartPause = () => {
    if (isRunning) {
      stop();
    } else {
      if (status === ToolStatus.OFF) {
        setPartialEntry((prev) =>
          updatePartialEntry(prev, {
            start: Date.now(),
          })
        );
        console.log("handler about to be added");
        window.addEventListener("beforeunload", beforeUnloadHandler);
      }
      start();
    }
  };

  const handleStop = () => {
    reset();
    console.log("handler about to be removed");
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    const timeEntry: WorkUnit = {
      ...partialEntry,
      end: Date.now(),
      spent: ticks,
    };
    setPartialEntry({ ...DEFAULT_ENTRY });
    addEntry(timeEntry);
  };

  const setContent = (content: string) => {
    setPartialEntry((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const millisecondsRemaining = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${secondsRemaining
      .toString()
      .padStart(2, "0")}.${millisecondsRemaining.toString().padStart(2, "0")}`;
  };

  return (
    <div className="grid gap-y-8 place-content-center">
      <h1>{formatTime(ticks)}</h1>
      <ActionButtons
        onStartPauseClick={handleStartPause}
        onStopClick={handleStop}
        status={status}
      />
      <ControlledTextArea
        content={partialEntry.description}
        setContent={setContent}
        key={partialEntry.description}
      />
    </div>
  );
}

function beforeUnloadHandler(e) {
  e.preventDefault();
  e.returnValue = "";
}
