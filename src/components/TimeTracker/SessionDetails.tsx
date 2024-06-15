import { dateTimeToString } from "../../helpers";
import { TrackerStatus, TrackingMode } from "../../models";
import { StartTime } from "../StartTime";

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
          <p className="text-muted-foreground">
            Expected completion: {expectedCompletionTime}
          </p>
          <p className="text-muted-foreground">
            Time budget: {timeBudget / 1000} seconds
          </p>
        </>
      ) : null}
    </div>
  );
}
