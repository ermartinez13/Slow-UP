import { DEFAULT_TIME } from "../Timer/Timer.constants";
import { useTick } from "../../hooks/use-tick";
import { ActionButtons } from "../Timer/ActionButtons";
import { Timer } from "../Timer";
import { Toggle } from "../Toggle";
import { Stopwatch } from "../Stopwatch/Stopwatch";
import { TimeMode, ToolStatus } from "../../models";
import React from "react";

interface TimeToolProps {
  onStart: (startTime: number) => void;
  onEnd: (endTimestamp: number, timeSpent: number) => void;
}

export function TimeTool({ onStart, onEnd }: TimeToolProps) {
  const [mode, setMode] = React.useState<TimeMode>(TimeMode.TIMER);
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

  const isTimer = mode === TimeMode.TIMER;
  const status = isRunning
    ? ToolStatus.ON
    : timeSpent > 0
    ? ToolStatus.PAUSED
    : ToolStatus.OFF;

  const handleStartPause = () => {
    if (status === ToolStatus.ON) {
      pauseTicks();
    } else if (status === ToolStatus.OFF) {
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
      mode === TimeMode.TIMER ? TimeMode.STOPWATCH : TimeMode.TIMER;
    setMode(nextMode);
  };

  return (
    <div className="grid gap-y-8 place-content-center">
      <Toggle
        isOn={isTimer}
        handleToggle={handleToggle}
        offText="Stopwatch"
        onText="Timer"
      />
      {isTimer ? (
        <Timer
          millisecondsLeft={timeBudget - timeSpent}
          setTimeBudget={setTimeBudget}
          status={isRunning ? ToolStatus.ON : ToolStatus.OFF}
        />
      ) : (
        <Stopwatch timeSpent={timeSpent} />
      )}
      <ActionButtons
        handleStartPause={handleStartPause}
        handleStop={handleStop}
        status={status}
      />
    </div>
  );
}
