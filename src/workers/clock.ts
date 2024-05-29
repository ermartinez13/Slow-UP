import { ClockEvent } from "../models";

let intervalId: number | undefined;

const tick = () => {
  self.postMessage({ type: ClockEvent.TICK });
};

self.onmessage = ({ data }) => {
if (data.type === ClockEvent.START) {
    const tickLength = data.tickLength;
    intervalId = self.setInterval(tick, tickLength);
  }

  if (data.type === ClockEvent.STOP) {
    self.clearInterval(intervalId);
  }
};