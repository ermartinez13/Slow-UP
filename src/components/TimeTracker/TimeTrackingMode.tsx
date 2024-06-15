import React, { Dispatch, SetStateAction } from "react";
import { AlertCircle } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer } from "../Timer";
import { Stopwatch } from "../Stopwatch/Stopwatch";
import { TrackerStatus, TrackingMode } from "@/models";
import { Alert, AlertDescription } from "../ui/alert";
import { SessionDetails } from "./SessionDetails";

interface Props {
  status: TrackerStatus;
  setTimeBudget: Dispatch<SetStateAction<number>>;
  timeSpent: number;
  timeBudget: number;
  mode: TrackingMode;
  onModeChange: (value: string) => void;
  startTimestamp: number;
}

export function TimeTrackingMode({
  status,
  setTimeBudget,
  timeSpent,
  timeBudget,
  mode,
  onModeChange,
  startTimestamp,
}: Props) {
  const [hasWarned, setHasWarned] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);

  const handleValueChange = (value: string) => {
    if (
      mode === TrackingMode.STOPWATCH &&
      !hasWarned &&
      timeSpent > timeBudget
    ) {
      setShowWarning(true);
      setHasWarned(true);
    } else {
      onModeChange(value);
      setShowWarning(false);
    }
  };

  return (
    <div className="min-h-[210px]">
      <Tabs
        value={mode}
        onValueChange={handleValueChange}
        className="w-[400px]"
        activationMode="manual"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value={TrackingMode.STOPWATCH} className="capitalize">
            {String(TrackingMode.STOPWATCH).toLowerCase()}
          </TabsTrigger>
          <TabsTrigger value={TrackingMode.TIMER} className="capitalize">
            {String(TrackingMode.TIMER).toLowerCase()}
          </TabsTrigger>
        </TabsList>
        <TabsContent value={TrackingMode.TIMER}>
          <Timer
            millisecondsLeft={timeBudget - timeSpent}
            setTimeBudget={setTimeBudget}
            status={status}
          />
          <div className="mt-4">
            <SessionDetails
              millisecondsLeft={timeBudget - timeSpent}
              status={status}
              timeBudget={timeBudget}
              startTimestamp={startTimestamp}
            />
          </div>
        </TabsContent>
        <TabsContent value={TrackingMode.STOPWATCH}>
          <Stopwatch timeSpentMs={timeSpent} />
        </TabsContent>
      </Tabs>
      {showWarning ? (
        <Alert className="w-[400px]">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <p>
              Switching to timer will end session. Try again to switch anyways.
            </p>
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
