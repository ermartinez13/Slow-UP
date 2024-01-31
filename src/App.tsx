import "./App.css";
import { Timer } from "./components/Timer";
import { NotificationsPermissionBtn } from "./components/NotificationsPermissionBtn";
import { TimeEntries } from "./components/TimeEntries";
import { getEntryIndex, getSecondsSpentToday } from "./helpers";
import { TotalsDisplay } from "./components/Timer/TotalsDisplay";
import { WorkUnit } from "./components/Timer/Timer.models";
import { useLocalStorage } from "./hooks/use-local-storage";
import { usePermissions } from "./hooks/use-permissions";

const INITIAL_ENTRIES: WorkUnit[] = [];

function App() {
  const [entries, setEntries] = useLocalStorage<WorkUnit[]>(
    "entries",
    INITIAL_ENTRIES
  );
  const notificationsPermission = usePermissions("notifications");
  const secondsSpentToday = getSecondsSpentToday(entries);

  const addEntry = (entry: WorkUnit) => {
    setEntries(entries.concat(entry));
  };

  const updateEntry = (entry: WorkUnit) => {
    const nextEntries = window.structuredClone(entries);
    const targetIdx = getEntryIndex(entry, nextEntries);
    Object.assign(nextEntries[targetIdx], entry);
    setEntries(nextEntries);
  };

  return (
    <main>
      <section>
        {"Notification" in window && notificationsPermission === "prompt" ? (
          <NotificationsPermissionBtn />
        ) : null}
        <Timer addEntry={addEntry} />
      </section>
      <section>
        <TotalsDisplay totalSeconds={secondsSpentToday} />
        <TimeEntries entries={entries} updateEntry={updateEntry} />
      </section>
    </main>
  );
}

export default App;
