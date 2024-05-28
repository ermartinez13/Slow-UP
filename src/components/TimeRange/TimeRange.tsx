import { formatDateTime } from "../../helpers";
import { ToolStatus } from "../../models";

interface Props {
  startTimeMs: number;
  millisecondsLeft?: number;
  status?: string;
}

export function TimeRange({ startTimeMs, millisecondsLeft, status }: Props) {
  if (startTimeMs === -1) {
    return (
      <div>
        <p>Started at: --</p>
        <p>Expected completion: --</p>
      </div>
    );
  }

  const startTime = formatDateTime(startTimeMs, {
    showSeconds: true,
    showAmPm: true,
  });

  return (
    <div>
      <p>Started at: {startTime}</p>
      {millisecondsLeft ? (
        <p>
          Expected completion:{" "}
          {status === ToolStatus.ON
            ? formatDateTime(Date.now() + millisecondsLeft, {
                showSeconds: true,
                showAmPm: true,
              })
            : "--"}
        </p>
      ) : null}
    </div>
  );
}
