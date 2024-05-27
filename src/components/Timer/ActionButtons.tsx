import { ToolStatus } from "../../models/tool.models";

interface Props {
  onStartPauseClick: () => void;
  onStopClick: () => void;
  status: ToolStatus;
}

export function ActionButtons({
  onStartPauseClick,
  onStopClick,
  status,
}: Props) {
  const isOff = status === ToolStatus.OFF;
  const isPaused = status === ToolStatus.PAUSED;

  return (
    <div className="flex flex-row justify-center gap-x-4">
      <button
        onClick={onStopClick}
        disabled={isOff}
        className="w-24 h-6 bg-zinc-600"
      >
        Stop
      </button>
      <button
        onClick={onStartPauseClick}
        className={`${isOff || isPaused ? "bg-green-700" : "bg-amber-700"} w-24 h-6`}
      >
        {isOff ? "Start" : isPaused ? "Resume" : "Pause"}
      </button>
    </div>
  );
}
