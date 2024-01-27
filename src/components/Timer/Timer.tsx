import { useEffect, useRef, useState } from "react";

import { ActionButtons } from "./ActionButtons";
import { TimeDisplay } from "./TimeDisplay";
import { TotalsDisplay } from "./TotalsDisplay";
import { notify } from "../../helpers";

const DEFAULT_TIME = 2400;

interface Props {
  totalTime: number;
  updateTotalTime: (time: number) => void;
}

export function Timer({ totalTime, updateTotalTime }: Props) {
  const [status, setStatus] = useState<"on" | "paused" | "off">("off");
  const [timeSpent, setTimeSpent] = useState(0);
  const [timeBudget, setTimeBudget] = useState(DEFAULT_TIME);
  const workerRef = useRef<Worker | null>(null);
  const timeLeft = timeBudget - timeSpent;

  const start = () => {
    if (status === "on") return;
    workerRef.current?.postMessage({ type: "START" });
    setStatus("on");
  };

  const stop = () => {
    if (status === "off") return;
    setStatus("off");
    workerRef.current?.postMessage({ type: "STOP" });
    notify();
    setTimeSpent(0);
    updateTotalTime(timeSpent);
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
        <TotalsDisplay totalTime={totalTime} />
      </div>
      <ActionButtons start={start} pause={pause} stop={stop} status={status} />
    </div>
  );
}
