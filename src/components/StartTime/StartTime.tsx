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

  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">Started at:</span>
      <span className="text-muted-foreground">{startTime}</span>
    </div>
  );
}
