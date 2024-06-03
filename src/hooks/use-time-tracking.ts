import React from "react";

import { ClockEvent, TrackingMode } from "../models";
import { startWorker, stopWorker } from "../workers/clock.helpers";

interface Options {
  mode: TrackingMode;
  onTimerExpiration?: (endTimestamp: number, timeSpentMs: number) => void;
  timeBudgetMs?: number;
}

function getTimeElapsedSincePrevTime(previousTime: number) {
  const millisecondsDistance = Date.now() - previousTime;
  const tenthsOfASecondElapsed = millisecondsDistance / 100;
  return Math.round(tenthsOfASecondElapsed) * 100;
}

export function useTimeTracking({
  mode,
  onTimerExpiration,
  timeBudgetMs,
}: Options) {
  const [timeElapsedOffset, setTimeElapsedOffset] = React.useState(0);
  const [previousTime, setPreviousTime] = React.useState(Date.now());
  const [timeElapsed, setTimeElapsed] = React.useState(
    timeElapsedOffset + getTimeElapsedSincePrevTime(previousTime)
  );
  const [isRunning, setIsRunning] = React.useState(false);
  const workerRef = React.useRef<Worker | null>(null);
  const callbackRef = React.useRef<() => void>();

  const start = React.useCallback(() => {
    const newPrevTime = Date.now();
    setPreviousTime(newPrevTime);
    setIsRunning(true);
    setTimeElapsed(
      timeElapsedOffset + getTimeElapsedSincePrevTime(newPrevTime)
    );
    startWorker(workerRef.current);
    return newPrevTime;
  }, [timeElapsedOffset]);

  const pause = React.useCallback(() => {
    setTimeElapsedOffset(timeElapsed);
    setIsRunning(false);
    stopWorker(workerRef.current);
  }, [timeElapsed]);

  const reset = React.useCallback(() => {
    const newPrevTime = Date.now();
    const newTimeElapsedOffset = 0;
    setTimeElapsedOffset(newTimeElapsedOffset);
    setPreviousTime(newPrevTime);
    setTimeElapsed(
      newTimeElapsedOffset + getTimeElapsedSincePrevTime(newPrevTime)
    );
    setIsRunning(false);
    stopWorker(workerRef.current);
  }, []);

  const handleTick = () => {
    if (isRunning) {
      const timeElapsedSincePrevTime =
        getTimeElapsedSincePrevTime(previousTime);
      setTimeElapsed(timeElapsedOffset + timeElapsedSincePrevTime);
      if (
        mode === TrackingMode.TIMER &&
        timeBudgetMs &&
        timeElapsed >= timeBudgetMs
      ) {
        onTimerExpiration?.(Date.now(), timeElapsed);
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

  return { ticks: timeElapsed, isRunning, start, pause, reset };
}
