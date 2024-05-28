import { ClockEvent } from "../models";

export function startWorker(worker: Worker | null, tickLength?: number) {
  worker?.postMessage({ type: ClockEvent.START, tickLength });
}

export function stopWorker(worker: Worker | null) {
  worker?.postMessage({ type: ClockEvent.STOP });
}
