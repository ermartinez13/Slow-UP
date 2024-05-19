import { TickEvent } from "../components/Timer/Timer.models";

let intervalId: number | undefined;

const tick = () => {
  self.postMessage({ type: TickEvent.TICK });
};

self.onmessage = ({ data }) => {
  if (data.type === TickEvent.START) {
    const tickLength = data.tickLength || 1000; // default to 1000 if not provided
    intervalId = self.setInterval(tick, tickLength);
  }

  if (data.type === TickEvent.STOP) {
    self.clearInterval(intervalId);
  }
};