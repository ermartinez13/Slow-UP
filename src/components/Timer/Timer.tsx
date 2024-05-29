import { Dispatch, SetStateAction } from "react";

import { ToolStatus } from "../../models";
import { TimeDisplay } from "./TimeDisplay";
import { TimeEnd } from "../TimeEnd";

interface Props {
  millisecondsLeft: number;
  status: ToolStatus;
  setTimeBudget: Dispatch<SetStateAction<number>>;
}

export function Timer({ millisecondsLeft, status, setTimeBudget }: Props) {
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
