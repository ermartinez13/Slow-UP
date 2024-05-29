import { formatDateTime } from "../helpers";

interface Props {
  startTimeMs: number;
}

export function TimeStart({ startTimeMs }: Props) {
  if (startTimeMs === -1) {
    return <p>Started at: --</p>;
  }

  const startTime = formatDateTime(startTimeMs, {
    showSeconds: true,
    showAmPm: true,
  });

  return <p>Started at: {startTime}</p>;
}
