import { useState, useEffect, useRef } from 'react';
import { TickEvent, TimerEvents } from '../components/Timer/Timer.models'; // replace with actual path

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
      if (data.type === TickEvent.TICK) tick();
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const start = () => {
    if (workerRef.current) workerRef.current.postMessage({ type: TickEvent.START, tickLength });
    setIsRunning(true);
  };

  const stop = () => {
    if (workerRef.current) workerRef.current.postMessage({ type: TickEvent.STOP });
    setIsRunning(false);
  };

  const reset = () => {
    if (workerRef.current) workerRef.current.postMessage({ type: TickEvent.STOP });
    setTicks(initialTicks);
    setIsRunning(false);
  };

  return { ticks, isRunning, start, stop, reset };
}