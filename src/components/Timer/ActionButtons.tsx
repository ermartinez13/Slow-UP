import { TrackerStatus } from "../../models";
import { Button } from "@/components/ui/button";

interface Props {
  onStartPause: () => void;
  onStop: () => void;
  status: TrackerStatus;
}

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
      <Button
        variant="destructive"
        disabled={isOff}
        onClick={onStop}
        className="w-24"
      >
        Finish
      </Button>
      <Button
        onClick={onStartPause}
        className={`w-24 text-white ${
          isOff || isPaused
            ? "bg-green-700 hover:bg-green-700/80"
            : "bg-amber-700 hover:bg-amber-700/80"
        }`}
      >
        {isOff ? "Start" : isPaused ? "Resume" : "Pause"}
      </Button>
    </div>
  );
}
