import { useState, useEffect, useRef } from 'react';
import { ClockEvent } from '../components/Timer/Timer.models'; 
import { startWorker, stopWorker } from '../workers/clock.helpers';

export function useTick(initialTicks = 0, tickLength = 1000) {
  const [ticks, setTicks] = useState(initialTicks);
  const [isRunning, setIsRunning] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/clock.ts", import.meta.url),
      {
        type: "module",
      }
    );
    workerRef.current = worker;

    const tick = () => setTicks((prev) => prev + 1);

    worker.onmessage = ({ data }) => {
      if (data.type === ClockEvent.TICK) tick();
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const start = () => {
    startWorker(workerRef.current, tickLength)
    setIsRunning(true);
  };

  const stop = () => {
    stopWorker(workerRef.current)
    setIsRunning(false);
  };

  const reset = () => {
    stop()
    setTicks(initialTicks);
  };

  return { ticks, isRunning, start, stop, reset };
}