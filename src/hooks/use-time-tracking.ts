import React from 'react';

import { TrackingMode } from '../models';

interface Options {
  mode: TrackingMode;
  onTimerExpiration?: (endTimestamp: number, timeSpentMs: number) => void;
  timeBudgetMs?: number;
}

function getTimeElapsedSincePrevTime(previousTime: number) {
  const millisecondsDistance = Date.now() - previousTime;
  const tenthsOfASecondElapsed = millisecondsDistance / 100;
  return Math.round(tenthsOfASecondElapsed) * 100
}

export function useTimeTracking({
  mode,
  onTimerExpiration,
  timeBudgetMs,
}: Options) {
  const [timeElapsedOffset, setTimeElapsedOffset] = React.useState(0);
  const [previousTime, setPreviousTime] = React.useState(Date.now());
  const [timeElapsed, setTimeElapsed] = React.useState(timeElapsedOffset + getTimeElapsedSincePrevTime(previousTime));
  const [isRunning, setIsRunning] = React.useState(false);

  const start = React.useCallback(() => {
    const newPrevTime = Date.now()
    setPreviousTime(newPrevTime);
    setIsRunning(true);
    setTimeElapsed(timeElapsedOffset + getTimeElapsedSincePrevTime(newPrevTime))
    return newPrevTime
  }, [timeElapsedOffset]);

  const pause = React.useCallback(() => {
    setTimeElapsedOffset(timeElapsed)
    setIsRunning(false);
  }, [timeElapsed]);

  const reset = React.useCallback(() => {
    const newPrevTime = Date.now()
    const newTimeElapsedOffset = 0
    setTimeElapsedOffset(newTimeElapsedOffset)
    setPreviousTime(newPrevTime)
    setTimeElapsed(newTimeElapsedOffset + getTimeElapsedSincePrevTime(newPrevTime));
    setIsRunning(false)
  }, []);
  
  useInterval(() => {
    setTimeElapsed(timeElapsedOffset + getTimeElapsedSincePrevTime(previousTime))
    if (mode === TrackingMode.TIMER && timeBudgetMs && timeElapsed >= timeBudgetMs) {
      onTimerExpiration?.(Date.now(), timeElapsed)
      reset()
    }
  }, isRunning ? 100 : null)

  return { ticks: timeElapsed, isRunning, start, pause, reset };
}

function useInterval(callback: () => void, delay: number | null) {
  const callbackRef = React.useRef<() => void>();

  // update callback ref with current render callback that has access to latest props and state
  React.useEffect(() => {
    callbackRef.current = callback;
  });

  React.useEffect(() => {
    if (!delay) {
      return () => {};
    }

    const interval = setInterval(() => {
      callbackRef.current && callbackRef.current();
    }, delay);
    
    return () => clearInterval(interval);
  }, [delay]);
}