import React from "react";

import { DEFAULT_TIME } from "../Timer/Timer.constants";
import { useTimeTracking } from "../../hooks/use-time-tracking";
import { ActionButtons } from "../Timer/ActionButtons";
import { Timer } from "../Timer";
import { Stopwatch } from "../Stopwatch/Stopwatch";
import { TrackingMode, TrackerStatus } from "../../models";
import { ProtectedToggle } from "../ProtectedToggle";

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

  const isTimerMode = mode === TrackingMode.TIMER;
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

  const handleToggle = () => {
    const nextMode =
      mode === TrackingMode.TIMER ? TrackingMode.STOPWATCH : TrackingMode.TIMER;
    setMode(nextMode);
  };

  const shouldShowWarning = () => timeSpent > timeBudget;

  return (
    <div className="grid gap-y-8 place-content-center">
      <ProtectedToggle
        isOn={isTimerMode}
        handleToggle={handleToggle}
        offText="Stopwatch"
        onText="Timer"
        warningMessage="Switching to timer mode will stop your time tracking session. Try again to proceed anyways."
        shouldShowWarning={shouldShowWarning}
        key={sessionId}
      />
      {isTimerMode ? (
        <Timer
          millisecondsLeft={timeBudget - timeSpent}
          setTimeBudget={setTimeBudget}
          status={trackerStatus}
        />
      ) : (
        <Stopwatch timeSpentMs={timeSpent} />
      )}
      <ActionButtons
        onStartPause={handleStartPause}
        onStop={handleStop}
        status={trackerStatus}
      />
    </div>
  );
}
