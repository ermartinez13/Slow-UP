import { dateTimeToString } from "../../helpers";

interface Props {
  startTimestamp: number;
}

export function StartTime({ startTimestamp }: Props) {
  const startTime =
    startTimestamp === -1
      ? "--"
      : dateTimeToString(startTimestamp, {
          showSeconds: true,
          showAmPm: true,
        });

  return <p>Started at: {startTime}</p>;
}
