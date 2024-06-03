import { ClockEvent } from "../models";

let intervalId: number | undefined;

const tick = () => {
  self.postMessage({ type: ClockEvent.TICK });
};

self.onmessage = ({ data }) => {
  if (data.type === ClockEvent.START) {
    intervalId = self.setInterval(tick, 100);
  }

  if (data.type === ClockEvent.STOP) {
    self.clearInterval(intervalId);
  }
};
