import React from "react";

import { DEFAULT_TIME } from "../Timer/Timer.constants";
import { useTick } from "../../hooks/use-tick";
import { ActionButtons } from "../Timer/ActionButtons";
import { Timer } from "../Timer";
import { Toggle } from "../Toggle";
import { Stopwatch } from "../Stopwatch/Stopwatch";
import { TrackingMode, TrackerStatus } from "../../models";

interface Props {
  onStart: (startTimestamp: number) => void;
  onEnd: (endTimestamp: number, timeSpentMs: number) => void;
}

export function TimeTracker({ onStart, onEnd }: Props) {
  const [mode, setMode] = React.useState<TrackingMode>(TrackingMode.TIMER);
  const [timeBudget, setTimeBudget] = React.useState(DEFAULT_TIME);
  const {
    ticks: timeSpent,
    isRunning,
    start: startTicks,
    pause: pauseTicks,
    reset,
  } = useTick({
    mode,
    onTimerExpiration: onEnd,
    timerExpiration: timeBudget,
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

  return (
    <div className="grid gap-y-8 place-content-center">
      <Toggle
        isOn={isTimerMode}
        handleToggle={handleToggle}
        offText="Stopwatch"
        onText="Timer"
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
