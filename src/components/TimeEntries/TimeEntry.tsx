import { ControlledTextArea } from "../ControlledTextArea";
import { WorkEntry } from "../../models";
import {
  getDatesToRender,
  getTimeSpentStr,
  getTimesToRender,
} from "./TimeEntries.helpers";

interface Props {
  entry: WorkEntry;
  updateEntry: (entry: WorkEntry) => void;
  deleteEntry: (entry: WorkEntry) => void;
}

export function TimeEntry({ entry, updateEntry, deleteEntry }: Props) {
  const timeSpentStr = getTimeSpentStr(entry.spent);
  const dates = getDatesToRender(entry.start, entry.end);
  const times = getTimesToRender(entry.start, entry.end);
  const setContent = (content: string) => {
    updateEntry({ ...entry, description: content });
  };

  return (
    <div className="flex flex-col items-center p-4 border border-dashed border-gray-400">
      <button className="place-self-end" onClick={() => deleteEntry(entry)}>
        {/* trash icon source: https://icon-sets.iconify.design/heroicons/trash/*/}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
        <span className="sr-only">Delete Entry</span>
      </button>
      <p>{dates}</p>
      <p>{times}</p>
      <p>{timeSpentStr}</p>
      <ControlledTextArea
        content={entry.description}
        setContent={setContent}
        label="Notes"
      />
    </div>
  );
}
