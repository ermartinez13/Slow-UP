import React from 'react';

import { TrackingMode } from '../models';

interface Options {
  tickLength?: number;
  mode: TrackingMode;
  onTimerExpiration?: (endTimestamp: number, ticks: number) => void;
  timerExpiration?: number;
}

function getTenthsOfASecondFromPrevTime(previousTime: number) {
  const millisecondsDistance = Date.now() - previousTime;
  const val = millisecondsDistance / 100;
  return Math.round(val) * 100
}

export function useTimeTracking({
  mode,
  onTimerExpiration,
  timerExpiration,
}: Options) {
  const [offsetTicks, setOffsetTicks] = React.useState(0);
  const [previousTime, setPreviousTime] = React.useState(Date.now());
  const [ticks, setTicks] = React.useState(offsetTicks + getTenthsOfASecondFromPrevTime(previousTime));
  const [isRunning, setIsRunning] = React.useState(false);

  const start = React.useCallback(() => {
    const startTimestamp = Date.now()
    setPreviousTime(startTimestamp);
    setIsRunning(true);
    setTicks(offsetTicks + getTenthsOfASecondFromPrevTime(startTimestamp))
    return startTimestamp
  }, [offsetTicks]);

  const pause = React.useCallback(() => {
    setOffsetTicks(ticks)
    setIsRunning(false);
  }, []);

  const reset = React.useCallback(() => {
    const newPrevTime = Date.now()
    const newOffsetTicks = 0
    setOffsetTicks(newOffsetTicks)
    setPreviousTime(newPrevTime)
    setTicks(newOffsetTicks + getTenthsOfASecondFromPrevTime(newPrevTime));
    setIsRunning(false)
  }, []);

  
  useInterval(() => {
    setTicks(offsetTicks + getTenthsOfASecondFromPrevTime(previousTime))
    if (mode === TrackingMode.TIMER && ticks >= timerExpiration!) {
      onTimerExpiration?.(Date.now(), ticks)
      reset()
    }
  }, isRunning ? 100 : null)

  return { ticks, isRunning, start, pause, reset };
}

function useInterval(callback: () => void, delay: number | null) {
  const callbacRef = React.useRef<() => void>();

  // update callback function with current render callback that has access to latest props and state
  React.useEffect(() => {
    callbacRef.current = callback;
  });

  React.useEffect(() => {
    if (!delay) {
      return () => {};
    }

    const interval = setInterval(() => {
      callbacRef.current && callbacRef.current();
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);
}