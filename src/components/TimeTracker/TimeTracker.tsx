import React from "react";

import { DEFAULT_TIME } from "../Timer/Timer.constants";
import { useTimeTracking } from "../../hooks/use-time-tracking";
import { ActionButtons } from "../Timer/ActionButtons";
import { TrackingMode, TrackerStatus } from "../../models";
import { TimeTrackingMode } from "./TimeTrackingMode";

interface Props {
  onStart: (startTimestamp: number) => void;
  onEnd: (endTimestamp: number, timeSpentMs: number) => void;
  sessionId: number;
}

export function TimeTracker({ onStart, onEnd, sessionId }: Props) {
  const [mode, setMode] = React.useState<TrackingMode>(TrackingMode.TIMER);
  const [timeBudget, setTimeBudget] = React.useState(DEFAULT_TIME);
  const {
    ticks: timeSpent,
    isRunning,
    start: startTicks,
    pause: pauseTicks,
    reset,
  } = useTimeTracking({
    mode,
    onTimerExpiration: onEnd,
    timeBudgetMs: timeBudget,
  });

  const trackerStatus = isRunning
    ? TrackerStatus.ON
    : timeSpent > 0
    ? TrackerStatus.PAUSED
    : TrackerStatus.OFF;

  const handleStartPause = () => {
    if (trackerStatus === TrackerStatus.ON) {
      pauseTicks();
    } else if (trackerStatus === TrackerStatus.OFF) {
      onStart(startTicks());
    } else {
      startTicks();
    }
  };

  const handleStop = () => {
    onEnd(Date.now(), timeSpent);
    reset();
  };

  const handleModeChange = (value: string) => {
    if (isTrackingMode(value)) {
      setMode(value);
    }
  };

  return (
    <div className="grid gap-y-8 place-content-center">
      <TimeTrackingMode
        status={trackerStatus}
        setTimeBudget={setTimeBudget}
        timeSpent={timeSpent}
        timeBudget={timeBudget}
        mode={mode}
        onModeChange={handleModeChange}
        key={sessionId}
      />
      <ActionButtons
        onStartPause={handleStartPause}
        onStop={handleStop}
        status={trackerStatus}
      />
    </div>
  );
}

function isTrackingMode(value: string): value is TrackingMode {
  return Object.values(TrackingMode).some((mode) => mode === value);
}
