import { formatDateTime } from "../../helpers";

interface Props {
  startTimestamp: number;
}

export function StartTime({ startTimestamp }: Props) {
  const startTime =
    startTimestamp === -1
      ? "--"
      : formatDateTime(startTimestamp, {
          showSeconds: true,
          showAmPm: true,
        });

  return <p>Started at: {startTime}</p>;
}
