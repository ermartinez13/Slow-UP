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
    <div
      style={{
        border: "1px dashed gray",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <p style={{ marginBlockStart: "0", marginBlockEnd: "0" }}>{dates}</p>
      <p style={{ marginBlockStart: "0", marginBlockEnd: "0" }}>{times}</p>
      <p style={{ marginBlockStart: "0", marginBlockEnd: "0" }}>{timeSpent}</p>
      <ControlledTextArea
        content={entry.description ? entry.description : entry.text ?? ""}
        setContent={setContent}
      />
    </div>
  );
}
