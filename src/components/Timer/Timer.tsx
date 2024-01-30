import { useEffect, useRef, useState } from "react";

import { ActionButtons } from "./ActionButtons";
import { TimeDisplay } from "./TimeDisplay";
import { notify } from "../../helpers";
import { Comment } from "./Comment";

const DEFAULT_TIME = 2400;
const DEFAULT_TIME_ENTRY = {
  start: -1,
  text: "",
};

interface Props {
  addTimeEntry: (timeEntry: {
    start: number;
    end: number;
    text: string;
  }) => void;
}

export function Timer({ addTimeEntry }: Props) {
  const [status, setStatus] = useState<"on" | "paused" | "off">("off");
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeBudget, setTimeBudget] = useState(DEFAULT_TIME);
  const [partialTimeEntry, setPartialTimeEntry] = useState({
    ...DEFAULT_TIME_ENTRY,
  });
  const workerRef = useRef<Worker | null>(null);
  const timeLeft = timeBudget - timeSpent;

  const start = () => {
    if (status === "on") return;
    workerRef.current?.postMessage({ type: "START" });
    setStatus("on");
    setPartialTimeEntry((prev) => ({
      ...prev,
      start: Date.now(),
    }));
  };

  const stop = () => {
    if (status === "off") return;
    setStatus("off");
    workerRef.current?.postMessage({ type: "STOP" });
    notify();
    setTimeSpent(0);
    const timeEntry = {
      ...partialTimeEntry,
      end: Date.now(),
    };
    setPartialTimeEntry({ ...DEFAULT_TIME_ENTRY });
    addTimeEntry(timeEntry);
  };

  const pause = () => {
    if (status === "paused") return;
    workerRef.current?.postMessage({ type: "PAUSE" });
    setStatus("paused");
  };

  useEffect(() => {
    const worker = new Worker(
      new URL("../../workers/clock.ts", import.meta.url)
    );
    workerRef.current = worker;

    const tick = () => setTimeSpent((prev) => prev + 1);

    worker.onmessage = ({ data }) => {
      if (data.type === "TICK") tick();
    };

    return () => {
      worker.terminate();
    };
  }, []);

  if (timeSpent >= timeBudget && status !== "off") {
    stop();
  }

  return (
    <div className="timer">
      <div className="display">
        <TimeDisplay
          timeLeft={timeLeft}
          setTimeBudget={setTimeBudget}
          key={timeLeft}
          status={status}
        />
      </div>
      <ActionButtons start={start} pause={pause} stop={stop} status={status} />
      <Comment
        text={partialTimeEntry.text}
        updateTimeEntry={setPartialTimeEntry}
        key={partialTimeEntry.text}
      />
    </div>
  );
}
