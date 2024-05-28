import React from "react";
import { PartialEntry, ToolStatus } from "../../models";
import { DEFAULT_TIME } from "./Timer.constants";
import { TimeDisplay } from "./TimeDisplay";
import { TimeRange } from "../TimeRange";

interface Props {
  timeSpent: number;
  stop: () => void;
  status: ToolStatus;
  partialEntry: PartialEntry;
}

export function Timer({ timeSpent, stop, status, partialEntry }: Props) {
  const [timeBudget, setTimeBudget] = React.useState(DEFAULT_TIME);
  const millisecondsLeft = timeBudget - timeSpent;

  if (timeSpent >= timeBudget && status !== ToolStatus.OFF) {
    stop();
  }

  return (
    <>
      <TimeDisplay
        millisecondsLeft={millisecondsLeft}
        setTimeBudget={setTimeBudget}
        key={millisecondsLeft}
        status={status}
      />
      <TimeRange
        millisecondsLeft={millisecondsLeft}
        status={status}
        startTimeMs={partialEntry.start}
      />
    </>
  );
}
