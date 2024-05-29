import { formatDuration } from "../../helpers";

interface Props {
  timeSpent: number;
}

export function Stopwatch({ timeSpent }: Props) {
  return (
    <div className="grid gap-y-8 place-content-center">
      <h1 className="font-mono">
        {formatDuration(timeSpent, { showTenthsOfASecond: true })}
      </h1>
    </div>
  );
}
