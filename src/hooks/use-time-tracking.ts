import React from "react";

import { ClockEvent, TrackingMode } from "@/models";
import { startWorker, stopWorker } from "@/workers/clock.helpers";

interface Options {
  mode: TrackingMode;
  onTimerExpiration?: (endTimestamp: number, timeSpentMs: number) => void;
  timeBudgetMs?: number;
}

function getMsSincePrevStartTime(prevStartTimeMs: number) {
  return Date.now() - prevStartTimeMs;
}

export function useTimeTracking({
  mode,
  onTimerExpiration,
  timeBudgetMs,
}: Options) {
  const [msOffset, setMsOffset] = React.useState(0);
  const [prevStartTimeMs, setPrevStartTimeMs] = React.useState(Date.now());
  const [timeElapsedMs, setTimeElapsedMs] = React.useState(
    msOffset + getMsSincePrevStartTime(prevStartTimeMs)
  );
  const [isRunning, setIsRunning] = React.useState(false);
  const workerRef = React.useRef<Worker | null>(null);
  const callbackRef = React.useRef<() => void>();

  const start = React.useCallback(() => {
    const newPrevTime = Date.now();
    setPrevStartTimeMs(newPrevTime);
    startWorker(workerRef.current);
    setTimeElapsedMs(msOffset + getMsSincePrevStartTime(newPrevTime));
    setIsRunning(true);
    return newPrevTime;
  }, [msOffset]);

  const pause = React.useCallback(() => {
    setMsOffset(timeElapsedMs);
    setIsRunning(false);
    stopWorker(workerRef.current);
  }, [timeElapsedMs]);

  const reset = React.useCallback(() => {
    const newPrevTime = Date.now();
    const newMsOffset = 0;
    setMsOffset(newMsOffset);
    setPrevStartTimeMs(newPrevTime);
    setTimeElapsedMs(newMsOffset + getMsSincePrevStartTime(newPrevTime));
    setIsRunning(false);
    stopWorker(workerRef.current);
  }, []);

  const handleTick = () => {
    if (isRunning) {
      const msSincePrevStartTime = getMsSincePrevStartTime(prevStartTimeMs);
      const newElapsedTimeMs = msOffset + msSincePrevStartTime;
      setTimeElapsedMs(newElapsedTimeMs);
      if (
        mode === TrackingMode.TIMER &&
        timeBudgetMs &&
        newElapsedTimeMs >= timeBudgetMs
      ) {
        onTimerExpiration?.(Date.now(), newElapsedTimeMs);
        reset();
      }
    }
  };

  React.useEffect(() => {
    callbackRef.current = handleTick;
  });

  React.useEffect(() => {
    const worker = new Worker(new URL("../workers/clock.ts", import.meta.url), {
      type: "module",
    });
    workerRef.current = worker;

    worker.onmessage = ({ data }) => {
      if (data.type === ClockEvent.TICK)
        callbackRef.current && callbackRef.current();
    };

    return () => {
      worker.terminate();
    };
  }, []);

  return { ticks: timeElapsedMs, isRunning, start, pause, reset };
}
