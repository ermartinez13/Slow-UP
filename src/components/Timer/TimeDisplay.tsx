import { useState } from "react";

interface Props {
  timeLeft: number;
  setTimeBudget: React.Dispatch<React.SetStateAction<number>>;
  status: "on" | "paused" | "off";
}

export function TimeDisplay({ timeLeft, setTimeBudget, status }: Props) {
  const [hours, setHours] = useState(Math.floor(timeLeft / 3600));
  const [minutes, setMinutes] = useState(Math.floor(timeLeft / 60) % 60);
  const [seconds, setSeconds] = useState(timeLeft % 60);

  const updateTimeBudget = () => {
    const nextHours = hours * 3600;
    const nextMinutes = minutes * 60;
    setTimeBudget(nextHours + nextMinutes + seconds);
  };

  return (
    <div className="time-display">
      <div className="time-unit">
        <label htmlFor="hours">hr</label>
        <input
          type="number"
          name="hours"
          id="hours"
          value={hours}
          onChange={(e) => setHours(Number(e.currentTarget.value))}
          onBlur={updateTimeBudget}
          disabled={status !== "off"}
        />
      </div>
      <span>:</span>
      <div className="time-unit">
        <label htmlFor="minutes">min</label>
        <input
          type="number"
          name="minutes"
          id="minutes"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.currentTarget.value))}
          onBlur={updateTimeBudget}
          disabled={status !== "off"}
        />
      </div>
      <span>:</span>
      <div className="time-unit">
        <label htmlFor="seconds">sec</label>
        <input
          type="number"
          name="seconds"
          id="seconds"
          value={seconds}
          onChange={(e) => setSeconds(Number(e.currentTarget.value))}
          onBlur={updateTimeBudget}
          disabled={status !== "off"}
        />
      </div>
    </div>
  );
}
