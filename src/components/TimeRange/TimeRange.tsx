import { ToolStatus } from "../../models/tool.models";

interface Props {
  startTimeMs: number;
  millisecondsLeft: number;
  status: ToolStatus;
}

function padZero(value: number): string {
  return value.toString().padStart(2, "0");
}

export function TimeRange({ startTimeMs, millisecondsLeft, status }: Props) {
  if (startTimeMs === -1) {
    return (
      <div>
        <p>Started at: --</p>
        <p>Expected completion: --</p>
      </div>
    );
  }

  const expectedCompletionTime =
    status === ToolStatus.ON ? formatTime(Date.now() + millisecondsLeft) : "--";
  const startTime = formatTime(startTimeMs);

  return (
    <div>
      <p>Started at: {startTime}</p>
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
