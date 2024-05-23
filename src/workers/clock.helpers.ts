import { TimerEvents } from "../components/Timer/Timer.models";

export function startWorker(worker: Worker | null) {
  worker?.postMessage({ type: TimerEvents.START });
}

export function stopWorker(worker: Worker | null) {
  worker?.postMessage({ type: TimerEvents.STOP });
}

export function pauseWorker(worker: Worker | null) {
  worker?.postMessage({ type: TimerEvents.PAUSE });
}