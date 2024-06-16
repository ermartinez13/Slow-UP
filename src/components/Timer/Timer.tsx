import { Dispatch, SetStateAction } from "react";

import { TrackerStatus } from "../../models";
import { TimeDisplay } from "./TimeDisplay";

interface Props {
  millisecondsLeft: number;
  status: TrackerStatus;
  setTimeBudget: Dispatch<SetStateAction<number>>;
}

export function Timer({ millisecondsLeft, status, setTimeBudget }: Props) {
  return (
    <TimeDisplay
      millisecondsLeft={millisecondsLeft}
      setTimeBudget={setTimeBudget}
      key={millisecondsLeft}
      status={status}
    />
  );
}
