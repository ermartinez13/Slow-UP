import React from "react";

import { TrackerStatus } from "../../models";

interface Props {
  millisecondsLeft: number;
  setTimeBudget: React.Dispatch<React.SetStateAction<number>>;
  status: TrackerStatus;
}

/*
  This component maintains internal state to allow intuitive editing of the time budget.
  The state is used to update the time budget when the user blurs the input fields.
*/
export function TimeDisplay({
  millisecondsLeft,
  setTimeBudget,
  status,
}: Props) {
  const clampedMillisecondsLeft = Math.max(millisecondsLeft, 0);

  const [hours, setHours] = React.useState(
    Math.floor(clampedMillisecondsLeft / 3600000)
  );
  const [minutes, setMinutes] = React.useState(
    Math.floor((clampedMillisecondsLeft % 3600000) / 60000)
  );
  const [seconds, setSeconds] = React.useState(
    Math.floor((clampedMillisecondsLeft % 60000) / 1000)
  );
  const [centiseconds, setCentiseconds] = React.useState(
    Math.floor((clampedMillisecondsLeft % 1000) / 10)
  );

  const updateTimeBudget = () => {
    const nextHours = hours * 3600000;
    const nextMinutes = minutes * 60000;
    const nextSeconds = seconds * 1000;
    const nextCentiseconds = centiseconds * 10;

    setTimeBudget(nextHours + nextMinutes + nextSeconds + nextCentiseconds);
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col">
        <label htmlFor="hours">hr</label>
        <input
          type="number"
          name="hours"
          id="hours"
          value={hours}
          onChange={(e) => setHours(Number(e.currentTarget.value))}
          onBlur={updateTimeBudget}
          disabled={status !== TrackerStatus.OFF}
          className="w-16 text-2xl text-center border-none"
        />
      </div>
      <span>:</span>
      <div className="flex flex-col">
        <label htmlFor="minutes">min</label>
        <input
          type="number"
          name="minutes"
          id="minutes"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.currentTarget.value))}
          onBlur={updateTimeBudget}
          disabled={status !== TrackerStatus.OFF}
          className="w-16 text-2xl text-center border-none"
        />
      </div>
      <span>:</span>
      <div className="flex flex-col">
        <label htmlFor="seconds">sec</label>
        <input
          type="number"
          name="seconds"
          id="seconds"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.currentTarget.value))}
          onBlur={updateTimeBudget}
          disabled={status !== TrackerStatus.OFF}
          className="w-16 text-2xl text-center border-none"
        />
      </div>
      <span>:</span>
      <div className="flex flex-col">
        <label htmlFor="hundredths">hs</label>
        <input
          type="number"
          name="hundredths"
          id="hundredths"
          value={centiseconds}
          onChange={(e) => setCentiseconds(Number(e.currentTarget.value))}
          onBlur={updateTimeBudget}
          disabled={status !== TrackerStatus.OFF}
          className="w-16 text-2xl text-center border-none"
        />
      </div>
    </div>
  );
}
