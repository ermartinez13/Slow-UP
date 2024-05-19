import { TimerStatus } from "./Timer.models";

interface Props {
  start: () => void;
  pause: () => void;
  stop: () => void;
  status: TimerStatus;
}

export function ActionButtons({ start, pause, stop, status }: Props) {
  const isOff = status === TimerStatus.OFF;

  const handleStartPauseClick = () => {
    if (isOff) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
    }
    isOff ? start() : pause();
  };

  const handleStopClick = () => {
    window.removeEventListener("beforeunload", beforeUnloadHandler);
    stop();
  };

  const primaryButton = (
    <button onClick={handleStartPauseClick} className={`${isOff ? "bg-green-700" : "bg-amber-700"} w-24 h-6`}>
      {isOff ? "Start" : "Pause"}
    </button>
  );

  return (
    <div className="flex flex-row justify-center gap-x-4">
      <button onClick={handleStopClick} disabled={isOff} className="w-24 h-6 bg-zinc-600">
        Stop
      </button>
      {primaryButton}
    </div>
  );
}

function beforeUnloadHandler(e: BeforeUnloadEvent) {
  e.preventDefault();
  // included for legacy support, e.g. Chrome/Edge < 119
  e.returnValue = true;
}
