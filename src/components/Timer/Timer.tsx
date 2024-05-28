import React from "react";
import { ToolStatus } from "../../models";
import { DEFAULT_TIME } from "./Timer.constants";
import { TimeDisplay } from "./TimeDisplay";
import { TimeEnd } from "../TimeEnd";

interface Props {
  timeSpent: number;
  stop: () => void;
  status: ToolStatus;
}

export function Timer({ timeSpent, stop, status }: Props) {
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
      <TimeEnd millisecondsLeft={millisecondsLeft} status={status} />
    </>
  );
}
