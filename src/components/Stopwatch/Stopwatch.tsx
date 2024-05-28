import { formatDuration } from "../../helpers";

interface Props {
  timeSpent: number;
}

export function Stopwatch({ timeSpent }: Props) {
  return (
    <div className="grid gap-y-8 place-content-center">
      <h1>{formatDuration(timeSpent, { showTenthsOfASecond: true })}</h1>
    </div>
  );
}
