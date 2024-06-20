import { dateTimeToString, durationToString } from "@/helpers";
import { TrackerStatus, TrackingMode } from "@/models";
import { StartTime } from "./StartTime";

interface Props {
  millisecondsLeft: number;
  status: TrackerStatus;
  timeBudget: number;
  startTimestamp: number;
  className?: string;
  mode: TrackingMode;
}

export function SessionDetails({
  millisecondsLeft,
  status,
  timeBudget,
  startTimestamp,
  className = "",
  mode,
}: Props) {
  const expectedCompletionTime =
    status === TrackerStatus.ON
      ? dateTimeToString(Date.now() + millisecondsLeft, {
          showSeconds: true,
          showAmPm: true,
        })
      : "--";

  return (
    <div className={className}>
      <StartTime startTimestamp={startTimestamp} />
      {mode === TrackingMode.TIMER ? (
        <>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Time Budget:</span>
            <span className="text-muted-foreground">
              {durationToString(timeBudget)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">End At:</span>
            <span className="text-muted-foreground">
              {expectedCompletionTime}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}
