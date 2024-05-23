import { TimerStatus } from "./Timer.models";

interface Props {
  start: () => void;
  pause: () => void;
  stop: () => void;
  status: TimerStatus;
}

export function ActionButtons({ start, pause, stop, status }: Props) {
  const isOff = status === TimerStatus.OFF;
  const isPaused = status === TimerStatus.PAUSED;

  const handleStartPauseClick = () => {
    if (!isOff && !isPaused) {
      pause();
      return;
    }
    if (isOff) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
    }
    start();
  };

  const handleStopClick = () => {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    stop();
  };

  return (
    <div className="flex flex-row justify-center gap-x-4">
      <button
        onClick={handleStopClick}
        disabled={isOff}
        className="w-24 h-6 bg-zinc-600"
      >
        Stop
      </button>
      <button
        onClick={handleStartPauseClick}
        className={`${isOff || isPaused ? "bg-green-700" : "bg-amber-700"} w-24 h-6`}
      >
        {isOff ? "Start" : isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
}

function beforeUnloadHandler(e: BeforeUnloadEvent) {
  e.preventDefault();
  // included for legacy support, e.g. Chrome/Edge < 119
  e.returnValue = true;
}
