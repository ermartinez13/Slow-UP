import { ClockEvent } from "@/models";

export function startWorker(worker: Worker | null) {
  worker?.postMessage({ type: ClockEvent.START });
}

export function stopWorker(worker: Worker | null) {
  worker?.postMessage({ type: ClockEvent.STOP });
}
