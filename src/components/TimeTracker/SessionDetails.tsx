import { dateTimeToString } from "../../helpers";
import { TrackerStatus } from "../../models";

interface Props {
  millisecondsLeft: number;
  status: TrackerStatus;
  timeBudget: number;
}

export function SessionDetails({
  millisecondsLeft,
  status,
  timeBudget,
}: Props) {
  const expectedCompletionTime =
    status === TrackerStatus.ON
      ? dateTimeToString(Date.now() + millisecondsLeft, {
          showSeconds: true,
          showAmPm: true,
        })
      : "--";

  return (
    <>
      <p>Expected completion: {expectedCompletionTime}</p>
      <p>Time budget: {timeBudget / 1000} seconds</p>
    </>
  );
}
