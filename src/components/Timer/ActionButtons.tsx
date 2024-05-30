import { TrackerStatus } from "../../models";

interface Props {
  onStartPause: () => void;
  onStop: () => void;
  status: TrackerStatus;
}

export function ActionButtons({ onStartPause, onStop, status }: Props) {
  const isOff = status === TrackerStatus.OFF;
  const isPaused = status === TrackerStatus.PAUSED;

  return (
    <div className="flex flex-row justify-center gap-x-4">
      <button
        onClick={onStop}
        disabled={isOff}
        className="w-24 h-6 bg-zinc-600"
      >
        Stop
      </button>
      <button
        onClick={onStartPause}
        className={`${
          isOff || isPaused ? "bg-green-700" : "bg-amber-700"
        } w-24 h-6`}
      >
        {isOff ? "Start" : isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
}
