interface Props {
  start: () => void;
  pause: () => void;
  stop: () => void;
  status: "on" | "paused" | "off";
}

export function ActionButtons({ start, pause, stop, status }: Props) {
  const pauseBtn = (
    <button onClick={pause} style={{ backgroundColor: "orange" }}>
      Pause
    </button>
  );
  const onBtn = (
    <button onClick={start} style={{ backgroundColor: "green" }}>
      {status === "off" ? "Start" : "Resume"}
    </button>
  );

  return (
    <div className="action-buttons">
      <button onClick={stop} disabled={status === "off"}>
        Cancel
      </button>
      {status === "on" ? pauseBtn : onBtn}
    </div>
  );
}
