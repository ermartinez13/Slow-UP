let intervalId;
const tick = () => {
  self.postMessage({ type: "TICK" });
};

self.onmessage = ({ data }) => {
  if (data.type === "START") {
    intervalId = setInterval(tick, 1000);
  }

  if (data.type === "STOP" || data.type === "PAUSE") {
    self.clearInterval(intervalId);
  }
};
