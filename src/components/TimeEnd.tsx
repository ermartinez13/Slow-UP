import { dateTimeToString } from "../helpers";
import { TrackerStatus } from "../models";

interface Props {
  millisecondsLeft: number;
  status: TrackerStatus;
}

export function TimeEnd({ millisecondsLeft, status }: Props) {
  const expectedCompletionTime =
    status === TrackerStatus.ON
      ? dateTimeToString(Date.now() + millisecondsLeft, {
          showSeconds: true,
          showAmPm: true,
        })
      : "--";

  return <p>Expected completion: {expectedCompletionTime}</p>;
}
