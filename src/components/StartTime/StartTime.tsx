import { formatDateTime } from "../../helpers";

interface Props {
  startTimeMs: number;
}

export function StartTime({ startTimeMs }: Props) {
  const startTime =
    startTimeMs === -1
      ? "--"
      : formatDateTime(startTimeMs, {
          showSeconds: true,
          showAmPm: true,
        });

  return <p>Started at: {startTime}</p>;
}
