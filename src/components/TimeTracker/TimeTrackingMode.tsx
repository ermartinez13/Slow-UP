import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer } from "../Timer";
import { Stopwatch } from "../Stopwatch/Stopwatch";
import { TrackerStatus } from "@/models";
import { Dispatch, SetStateAction } from "react";

interface Props {
  status: TrackerStatus;
  setTimeBudget: Dispatch<SetStateAction<number>>;
  timeSpent: number;
  timeBudget: number;
}

export function TimeTrackingMode({
  status,
  setTimeBudget,
  timeSpent,
  timeBudget,
}: Props) {
  return (
    <Tabs defaultValue="timer" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="stopwatch">Stopwatch</TabsTrigger>
        <TabsTrigger value="timer">Timer</TabsTrigger>
      </TabsList>
      <TabsContent value="timer">
        <Timer
          millisecondsLeft={timeBudget - timeSpent}
          setTimeBudget={setTimeBudget}
          status={status}
        />
      </TabsContent>
      <TabsContent value="stopwatch">
        <Stopwatch timeSpentMs={timeSpent} />
      </TabsContent>
    </Tabs>
  );
}
