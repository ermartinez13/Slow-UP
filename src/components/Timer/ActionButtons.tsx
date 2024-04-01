import { TimerStatus } from "./Timer.models";

interface Props {
  start: () => void;
  pause: () => void;
  stop: () => void;
  status: TimerStatus;
}

export function ActionButtons({ start, pause, stop, status }: Props) {
  const pauseBtn = (
    <button onClick={pause} className="w-24 h-6 bg-amber-700">
      Pause
    </button>
  );
  const onBtn = (
    <button
      onClick={() => {
        if (status === TimerStatus.OFF) {
          // adds only when transitioning from off -> on
          window.addEventListener("beforeunload", beforeUnloadHandler);
        }
        start();
      }}
      className="w-24 h-6 bg-green-700"
    >
      {status === TimerStatus.OFF ? "Start" : "Resume"}
    </button>
  );

  return (
    <div className="flex flex-row justify-center gap-x-4">
      <button
        onClick={() => {
          window.removeEventListener("beforeunload", beforeUnloadHandler);
          stop();
        }}
        disabled={status === TimerStatus.OFF}
        className="w-24 h-6 bg-zinc-600"
      >
        Stop
      </button>
      {status === "on" ? pauseBtn : onBtn}
    </div>
  );
}

function beforeUnloadHandler(e: BeforeUnloadEvent) {
  e.preventDefault();
  // included for legacy support, e.g. Chrome/Edge < 119
  e.returnValue = true;
}
