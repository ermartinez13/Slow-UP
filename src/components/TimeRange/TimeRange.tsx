import React from "react";
import { PartialEntry, TimerStatus } from "../Timer/Timer.models";

interface Props {
  entry: PartialEntry;
  secondsLeft: number;
  status: TimerStatus;
}

function padZero(value: number): string {
  return value.toString().padStart(2, "0");
}

export function TimeRange({ entry, secondsLeft, status }: Props) {
  const [expectedCompletionTime, setExpectedCompletionTime] =
    React.useState("--");

  React.useEffect(() => {
    if (status === TimerStatus.ON) {
      const secondsLeftMs = secondsLeft * 1000;
      const expectedCompletionDate = Date.now() + secondsLeftMs;

      setExpectedCompletionTime(formatTime(expectedCompletionDate));
    } else {
      setExpectedCompletionTime("--");
    }
  }, [status, secondsLeft]);

  if (entry.start === -1) {
    return (
      <div>
        <p>Started at: --</p>
        <p>Expected completion: --</p>
      </div>
    );
  }

  return (
    <div>
      <p>Started at: {formatTime(entry.start)}</p>
      <p>Expected completion: {expectedCompletionTime}</p>
    </div>
  );
}

interface FormatTimeOptions {
  showSeconds?: boolean;
  padHours?: boolean;
}

function formatTime(milliseconds: number, options?: FormatTimeOptions): string {
  const defaultOptions = {
    showSeconds: true,
    padHours: false,
  };
  const opts = { ...defaultOptions, ...options };

  const date = new Date(milliseconds);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12 || 12;

  const hoursStr = opts.padHours ? padZero(hours12) : hours12;
  const secondsStr = opts.showSeconds ? `:${padZero(seconds)}` : "";

  return `${hoursStr}:${padZero(minutes)}${secondsStr} ${ampm}`;
}
