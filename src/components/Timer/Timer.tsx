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
  const [seconds, setSeconds] = useState(DEFAULT_TIME);
  const workerRef = useRef<Worker | null>(null);

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
    setSeconds(DEFAULT_TIME);
    updateTotalTime(DEFAULT_TIME);
  };

  const pause = () => {
    if (status === "paused") return;
    workerRef.current?.postMessage({ type: "PAUSE" });
    setStatus("paused");
  };

  useEffect(() => {
    const worker = new Worker("/worker.js");
    workerRef.current = worker;

    const tick = () => setSeconds((prev) => prev - 1);

    worker.onmessage = ({ data }) => {
      if (data.type === "TICK") tick();
    };

    return () => {
      worker.terminate();
    };
  }, []);

  if (seconds === 0 && status !== "off") {
    stop();
  }

  return (
    <div className="timer">
      <div className="display">
        <TimeDisplay
          time={seconds}
          setTime={setSeconds}
          key={seconds}
          status={status}
        />
        <TotalsDisplay totalTime={totalTime} />
      </div>
      <ActionButtons start={start} pause={pause} stop={stop} status={status} />
    </div>
  );
}
