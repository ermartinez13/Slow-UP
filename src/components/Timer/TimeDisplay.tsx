import { useState } from "react";
import { TimerStatus } from "./Timer.models";

interface Props {
  millisecondsLeft: number;
  setTimeBudget: React.Dispatch<React.SetStateAction<number>>;
  status: TimerStatus;
}

export function TimeDisplay({
  millisecondsLeft,
  setTimeBudget,
  status,
}: Props) {
  const [hours, setHours] = useState(Math.floor(millisecondsLeft / 3600000));
  const [minutes, setMinutes] = useState(
    Math.floor((millisecondsLeft % 3600000) / 60000)
  );
  const [seconds, setSeconds] = useState(
    Math.floor((millisecondsLeft % 60000) / 1000)
  );
  const [centiseconds, setCentiseconds] = useState(
    Math.floor((millisecondsLeft % 1000) / 100)
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
          disabled={status !== TimerStatus.OFF}
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
          disabled={status !== TimerStatus.OFF}
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
          disabled={status !== TimerStatus.OFF}
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
          disabled={status !== TimerStatus.OFF}
          className="w-16 text-2xl text-center border-none"
        />
      </div>
    </div>
  );
}
