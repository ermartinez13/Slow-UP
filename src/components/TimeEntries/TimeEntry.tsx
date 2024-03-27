import { ControlledTextArea } from "../ControlledTextArea";
import { WorkUnit } from "../Timer/Timer.models";
import {
  getDatesToRender,
  getTimeSpentToRender,
  getTimesToRender,
} from "./TimeEntries.helpers";

interface Props {
  entry: WorkUnit;
  updateEntry: (entry: WorkUnit) => void;
}

export function TimeEntry({ entry, updateEntry }: Props) {
  const timeSpent = getTimeSpentToRender(entry.spent);
  const dates = getDatesToRender(entry.start, entry.end);
  const times = getTimesToRender(entry.start, entry.end);
  const setContent = (content: string) => {
    updateEntry({ ...entry, description: content });
  };

  return (
    <div className="border border-dashed border-gray-400 p-4 flex flex-col">
      <p>{dates}</p>
      <p>{times}</p>
      <p>{timeSpent}</p>
      <ControlledTextArea
        content={entry.description ? entry.description : entry.text ?? ""}
        setContent={setContent}
      />
    </div>
  );
}
