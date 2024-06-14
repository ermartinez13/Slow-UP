import React from "react";

import { TrackerStatus } from "../../models";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Props {
  millisecondsLeft: number;
  setTimeBudget: React.Dispatch<React.SetStateAction<number>>;
  status: TrackerStatus;
}

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
  const [tenthsOfASecond] = React.useState(
    Math.floor((clampedMillisecondsLeft % 1000) / 100)
  );

  const updateTimeBudget = () => {
    const nextHours = hours * 3600000;
    const nextMinutes = minutes * 60000;
    const nextSeconds = seconds * 1000;

    setTimeBudget(nextHours + nextMinutes + nextSeconds);
  };

  return (
    <div className="flex justify-center gap-4 h-24">
      {status === TrackerStatus.OFF ? (
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-between">
            <div className="w-24 text-center">
              <Label htmlFor="hours" aria-label="Hours">
                hr
              </Label>
            </div>
            <div className="w-24 text-center">
              <Label htmlFor="minutes" aria-label="Minutes">
                min
              </Label>
            </div>
            <div className="w-24 text-center">
              <Label htmlFor="seconds" aria-label="Seconds">
                sec
              </Label>
            </div>
          </div>
          <Card className="flex gap-4 py-4">
            <Input
              type="number"
              id="hours"
              value={hours}
              onChange={(e) => setHours(Number(e.currentTarget.value))}
              onBlur={updateTimeBudget}
              className="w-24 text-4xl text-center font-mono bg-card"
              min="0"
              step="1"
              pattern="[0-9]*"
            />
            <span className="text-4xl self-center">:</span>
            <Input
              type="number"
              id="minutes"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.currentTarget.value))}
              onBlur={updateTimeBudget}
              className="w-24 text-4xl text-center font-mono bg-card"
              min="0"
              step="1"
              pattern="[0-9]*"
            />
            <span className="text-4xl self-center">:</span>
            <Input
              type="number"
              id="seconds"
              value={seconds}
              onChange={(e) => setSeconds(Number(e.currentTarget.value))}
              onBlur={updateTimeBudget}
              className="w-24 text-4xl text-center font-mono bg-card"
              min="0"
              step="1"
              pattern="[0-9]*"
            />
          </Card>
        </div>
      ) : (
        <div className="flex gap-4 text-4xl font-mono self-center">
          <span>{hours.toString().padStart(2, "0")}</span>
          <span>:</span>
          <span>{minutes.toString().padStart(2, "0")}</span>
          <span>:</span>
          <span>{seconds.toString().padStart(2, "0")}</span>
          <span>.</span>
          <span>{tenthsOfASecond.toString()}</span>
        </div>
      )}
    </div>
  );
}
