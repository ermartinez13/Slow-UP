import { useRef, useState } from "react";

import { ActionButtons } from "./ActionButtons";
import { TimeDisplay } from "./TimeDisplay";
import { TotalsDisplay } from "./TotalsDisplay";

const DEFAULT_TIME = 2400;

export function Timer() {
  const [status, setStatus] = useState<"on" | "paused" | "off">("off");
  const [seconds, setSeconds] = useState(DEFAULT_TIME);
  const intervalRef = useRef<number | null>(null);

  const start = () => {
    if (status === "on") return;
    setStatus("on");
    intervalRef.current = window.setInterval(tick, 1000);
  };

  const clearInterval = () => {
    window.clearInterval(intervalRef.current!);
    intervalRef.current = null;
  };

  const stop = () => {
    if (status === "off") return;
    setStatus("off");
    setSeconds(DEFAULT_TIME);
    clearInterval();
  };

  const pause = () => {
    if (status === "paused") return;
    setStatus("paused");
    clearInterval();
  };

  const tick = () => {
    setSeconds((prev) => prev - 1);
  };

  if (status !== "off" && seconds == 0) {
    stop();
  }

  return (
    <div className="timer">
      <div className="display">
        <TimeDisplay />
        <TotalsDisplay />
      </div>
      <ActionButtons />
    </div>
  );
}
