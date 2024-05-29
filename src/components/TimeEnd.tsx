import { formatDateTime } from "../helpers";
import { ToolStatus } from "../models";

interface Props {
  millisecondsLeft?: number;
  status?: string;
}

export function TimeEnd({ millisecondsLeft, status }: Props) {
  if (!millisecondsLeft) {
    return null;
  }

  const expectedCompletionTime =
    status === ToolStatus.ON
      ? formatDateTime(Date.now() + millisecondsLeft, {
          showSeconds: true,
          showAmPm: true,
        })
      : "--";

  return <p>Expected completion: {expectedCompletionTime}</p>;
}
