import { dateTimeToString } from "../../helpers";
import { TrackerStatus } from "../../models";
import { StartTime } from "../StartTime";

interface Props {
  millisecondsLeft: number;
  status: TrackerStatus;
  timeBudget: number;
  startTimestamp: number;
  className?: string;
}

export function SessionDetails({
  millisecondsLeft,
  status,
  timeBudget,
  startTimestamp,
  className = "",
}: Props) {
  const expectedCompletionTime =
    status === TrackerStatus.ON
      ? dateTimeToString(Date.now() + millisecondsLeft, {
          showSeconds: true,
          showAmPm: true,
        })
      : "--";

  return (
    <div className={className}>
      <StartTime startTimestamp={startTimestamp} />
      <p>Expected completion: {expectedCompletionTime}</p>
      <p>Time budget: {timeBudget / 1000} seconds</p>
    </div>
  );
}
