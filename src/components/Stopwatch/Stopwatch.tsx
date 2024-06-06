import { millisecondsToTimeBreakdown } from "../../helpers";

interface Props {
  timeSpentMs: number;
}

export function Stopwatch({ timeSpentMs }: Props) {
  const { hours, minutes, seconds, centiseconds } =
    millisecondsToTimeBreakdown(timeSpentMs);

  return (
    <div className="flex justify-center gap-4 h-24">
      <div className="flex gap-4 text-4xl font-mono self-center">
        <span>{hours.toString().padStart(2, "0")}</span>
        <span>:</span>
        <span>{minutes.toString().padStart(2, "0")}</span>
        <span>:</span>
        <span>{seconds.toString().padStart(2, "0")}</span>
        <span>.</span>
        <span>{centiseconds.toString().padStart(2, "0")}</span>
      </div>
    </div>
  );
}
