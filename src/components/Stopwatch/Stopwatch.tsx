import { formatDuration } from "../../helpers";

interface Props {
  timeSpentMs: number;
}

export function Stopwatch({ timeSpentMs }: Props) {
  return (
    <div className="grid gap-y-8 place-content-center">
      <h1 className="font-mono">
        {formatDuration(timeSpentMs, { showTenthsOfASecond: true })}
      </h1>
    </div>
  );
}
