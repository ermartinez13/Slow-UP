import { useEffect, useState } from "react";

import "./App.css";
import { Timer } from "./components/Timer";
import { NotificationsPermissionBtn } from "./components/NotificationsPermissionBtn";
import { TimeEntries } from "./components/TimeEntries";
import { getEntryIndex, getTodaysTotalTime } from "./helpers";
import { TotalsDisplay } from "./components/Timer/TotalsDisplay";
import { WorkUnit } from "./components/Timer/Timer.models";
import { useLocalStorage } from "./hooks/use-local-storage";

const INITIAL_ENTRIES: WorkUnit[] = [];

function App() {
  const [entries, setEntries] = useLocalStorage<WorkUnit[]>(
    "entries",
    INITIAL_ENTRIES
  );
  const [
    shouldRequestNotificationsPermission,
    setShouldRequestNotificationsPermission,
  ] = useState<boolean>(
    // if permission is not default then persimion is granted, denied, or Notifications API is not supported
    () => window.Notification?.permission === "default"
  );
  const totalTime = getTodaysTotalTime(timeEntries);

  const addEntry = (entry: WorkUnit) => {
    setEntries(entries.concat(entry));
  };

  const updateEntry = (entry: WorkUnit) => {
    const nextEntries = window.structuredClone(entries);
    const targetIdx = getEntryIndex(entry, nextEntries);
    Object.assign(nextEntries[targetIdx], entry);
    setEntries(nextEntries);
  };

  const requestPermission = () => {
    window.Notification?.requestPermission().then((permission) => {
      if (permission !== "default") {
        setShouldRequestNotificationsPermission(false);
      }
    });
  };

  useEffect(() => {
    let eventTarget: PermissionStatus | null = null;
    function handlePermissionChange(e: Event) {
      const target = e.target;
      if (target instanceof PermissionStatus && target.state === "prompt") {
        setShouldRequestNotificationsPermission(true);
      }
    }

    window.navigator.permissions
      .query({ name: "notifications" })
      .then((permissionStatus) => {
        eventTarget = permissionStatus;
        eventTarget.addEventListener("change", handlePermissionChange);
      })
      .catch((error) => {
        console.error("Error querying notification permission: ", error);
      });

    return () =>
      eventTarget?.removeEventListener("change", handlePermissionChange);
  }, []);

  return (
    <main>
      <section>
        {shouldRequestNotificationsPermission ? (
          <NotificationsPermissionBtn handleClick={requestPermission} />
        ) : null}
        <Timer addEntry={addEntry} />
      </section>
      <section>
        <TotalsDisplay totalTime={totalTime} />
        <TimeEntries entries={entries} updateEntry={updateEntry} />
      </section>
    </main>
  );
}

export default App;
