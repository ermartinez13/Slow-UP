interface Props {
  start: () => void;
  pause: () => void;
  stop: () => void;
  status: "on" | "paused" | "off";
}

export function ActionButtons({ start, pause, stop, status }: Props) {
  const pauseBtn = (
    <button
      onClick={pause}
      style={{ backgroundColor: "orange" }}
      className="w-24 h-6"
    >
      Pause
    </button>
  );
  const onBtn = (
    <button
      onClick={start}
      style={{ backgroundColor: "green" }}
      className="w-24 h-6"
    >
      {status === "off" ? "Start" : "Resume"}
    </button>
  );

  return (
    <div className="flex flex-row gap-x-4">
      <button onClick={stop} disabled={status === "off"} className="w-24 h-6">
        Stop
      </button>
      {status === "on" ? pauseBtn : onBtn}
    </div>
  );
}
