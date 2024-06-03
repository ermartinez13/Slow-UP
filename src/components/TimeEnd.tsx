import { formatDateTime } from "../helpers";
import { TrackerStatus } from "../models";

interface Props {
  millisecondsLeft: number;
  status: TrackerStatus;
}

export function TimeEnd({ millisecondsLeft, status }: Props) {
  const expectedCompletionTime =
    status === TrackerStatus.ON
      ? formatDateTime(Date.now() + millisecondsLeft, {
          showSeconds: true,
          showAmPm: true,
        })
      : "--";

  return <p>Expected completion: {expectedCompletionTime}</p>;
}
