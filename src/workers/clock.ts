import { TimerEvents } from "../components/Timer/Timer.models";

let intervalId: number | undefined;

const tick = () => {
  self.postMessage({ type: TimerEvents.TICK });
};

self.onmessage = ({ data }) => {
  if (data.type === TimerEvents.START) {
    intervalId = self.setInterval(tick, 1000);
  }

  if (data.type === TimerEvents.STOP || data.type === TimerEvents.PAUSE) {
    self.clearInterval(intervalId);
  }
};
