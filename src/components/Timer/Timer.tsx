import { useState } from "react";

import { ActionButtons } from "./ActionButtons";
import { TimeDisplay } from "./TimeDisplay";
import { notify, updatePartialEntry } from "../../helpers";
import { PartialEntry, TimerStatus, WorkUnit } from "./Timer.models";
import { ControlledTextArea } from "../ControlledTextArea";
import { DEFAULT_ENTRY, DEFAULT_TIME } from "./Timer.constants";
import { TimeRange } from "../TimeRange";
import { useTick } from "../../hooks/use-tick";

interface Props {
  addEntry: (timeEntry: WorkUnit) => void;
}

export function Timer({ addEntry }: Props) {
  const {
    ticks: timeSpent,
    start: startTicks,
    stop: stopTicks,
    reset,
  } = useTick();
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.OFF);
  // const [timeSpent, setTimeSpent] = useState(0);
  const [timeBudget, setTimeBudget] = useState(DEFAULT_TIME);
  const [partialEntry, setPartialEntry] = useState<PartialEntry>({
    ...DEFAULT_ENTRY,
  });
  const secondsLeft = timeBudget - timeSpent;

  const start = () => {
    if (status === TimerStatus.ON) return;
    startTicks();
    setStatus(TimerStatus.ON);
    if (partialEntry.start === -1) {
      setPartialEntry((prev) =>
        updatePartialEntry(prev, {
          start: Date.now(),
        })
      );
    }
  };

  const stop = () => {
    if (status === TimerStatus.OFF) return;
    reset();
    setStatus(TimerStatus.OFF);
    notify();
    const timeEntry: WorkUnit = {
      ...partialEntry,
      end: Date.now(),
      spent: timeSpent,
    };
    setPartialEntry({ ...DEFAULT_ENTRY });
    addEntry(timeEntry);
  };

  const pause = () => {
    if (status === TimerStatus.PAUSED) return;
    stopTicks();
    setStatus(TimerStatus.PAUSED);
  };

  const setContent = (content: string) => {
    setPartialEntry((prev) => ({
      ...prev,
      description: content,
    }));
  };

  const handleStartPauseClick = () => {
    if (status === TimerStatus.ON) {
      pause();
    } else {
      if (status === TimerStatus.OFF) {
        window.addEventListener("beforeunload", beforeUnloadHandler);
      }
      start();
    }
  };

  const handleStopClick = () => {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    stop();
  };

  if (timeSpent >= timeBudget && status !== "off") {
    stop();
  }

  return (
    <div className="grid gap-y-8 place-content-center">
      <TimeDisplay
        secondsLeft={secondsLeft}
        setTimeBudget={setTimeBudget}
        key={secondsLeft}
        status={status}
      />
      <TimeRange
        secondsLeft={secondsLeft}
        status={status}
        startTimeMs={partialEntry.start}
      />
      <ActionButtons
        onStartPauseClick={handleStartPauseClick}
        onStopClick={handleStopClick}
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

function beforeUnloadHandler(e: BeforeUnloadEvent) {
  e.preventDefault();
  // included for legacy support, e.g. Chrome/Edge < 119
  e.returnValue = true;
}
