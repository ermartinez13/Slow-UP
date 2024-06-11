import { millisecondsToTime } from "../../helpers";

export function TotalsDisplay({
  totalMilliseconds,
}: {
  totalMilliseconds: number;
}) {
  const timeBreakdown = millisecondsToTime(totalMilliseconds);

  return (
    <span>
      {timeBreakdown.hours} hrs &nbsp;{timeBreakdown.minutes} min &nbsp;
      {timeBreakdown.seconds} s
    </span>
  );
}
