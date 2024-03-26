import { useEffect, useRef, useState } from "react";

import { ActionButtons } from "./ActionButtons";
import { TimeDisplay } from "./TimeDisplay";
import { notify } from "../../helpers";
import {
  PartialEntry,
  TimerEvents,
  TimerStatus,
  WorkUnit,
} from "./Timer.models";
import { ControlledTextArea } from "../ControlledTextArea";
import { DEFAULT_ENTRY, DEFAULT_TIME } from "./Timer.constants";

interface Props {
  addEntry: (timeEntry: WorkUnit) => void;
}

export function Timer({ addEntry }: Props) {
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.OFF);
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeBudget, setTimeBudget] = useState(DEFAULT_TIME);
  const [partialEntry, setPartialEntry] = useState<PartialEntry>({
    ...DEFAULT_ENTRY,
  });
  const workerRef = useRef<Worker | null>(null);
  const secondsLeft = timeBudget - timeSpent;

  const start = () => {
    if (status === TimerStatus.ON) return;
    workerRef.current?.postMessage({ type: TimerEvents.START });
    setStatus(TimerStatus.ON);
    if (partialEntry.start === -1) {
      setPartialEntry({
        ...partialEntry,
        start: Date.now(),
      });
    }
  };

  const stop = () => {
    if (status === TimerStatus.OFF) return;
    setStatus(TimerStatus.OFF);
    workerRef.current?.postMessage({ type: TimerEvents.STOP });
    notify();
    setTimeSpent(0);
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
    workerRef.current?.postMessage({ type: TimerEvents.PAUSE });
    setStatus(TimerStatus.PAUSED);
  };

  const setContent = (content: string) => {
    setPartialEntry((prev) => ({
      ...prev,
      description: content,
    }));
  };

  useEffect(() => {
    const worker = new Worker(
      new URL("../../workers/clock.ts", import.meta.url),
      {
        type: "module",
      }
    );
    workerRef.current = worker;

    const tick = () => setTimeSpent((prev) => prev + 1);

    worker.onmessage = ({ data }) => {
      if (data.type === TimerEvents.TICK) tick();
    };

    return () => {
      worker.terminate();
    };
  }, []);

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
      <ActionButtons start={start} pause={pause} stop={stop} status={status} />
      <ControlledTextArea
        content={partialEntry.description}
        setContent={setContent}
        key={partialEntry.description}
      />
    </div>
  );
}
