import { ToolStatus } from "../../models/tool.models";

interface Props {
  handleStartPause: () => void;
  handleStop: () => void;
  status: ToolStatus;
}

export function ActionButtons({ handleStartPause, handleStop, status }: Props) {
  const isOff = status === ToolStatus.OFF;
  const isPaused = status === ToolStatus.PAUSED;

  return (
    <div className="flex flex-row justify-center gap-x-4">
      <button
        onClick={handleStop}
        disabled={isOff}
        className="w-24 h-6 bg-zinc-600"
      >
        Stop
      </button>
      <button
        onClick={handleStartPause}
        className={`${isOff || isPaused ? "bg-green-700" : "bg-amber-700"} w-24 h-6`}
      >
        {isOff ? "Start" : isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
}
