import { useEffect, useState } from "react";

import "./App.css";
import { Timer } from "./components/Timer";
import { NotificationsPermissionBtn } from "./components/NotificationsPermissionBtn";
import { TimeEntries } from "./components/TimeEntries";
import { getEntryIndex, getTodaysTotalTime } from "./helpers";
import { TotalsDisplay } from "./components/Timer/TotalsDisplay";
import { WorkUnit } from "./components/Timer/Timer.models";

function App() {
  const [timeEntries, setTimeEntries] = useState<WorkUnit[]>(() =>
    JSON.parse(window.localStorage.getItem("entries") ?? "[]")
  );
  const [
    shouldRequestNotificationsPermission,
    setShouldRequestNotificationsPermission,
  ] = useState<boolean>(
    // if permission is not default then persimion is granted, denied, or Notifications API is not supported
    () => window.Notification?.permission === "default"
  );
  const totalTime = getTodaysTotalTime(timeEntries);

  const addTimeEntry = (entry: WorkUnit) => {
    const nextValue = timeEntries.concat(entry);
    window.localStorage.setItem("entries", JSON.stringify(nextValue));
    setTimeEntries(nextValue);
  };

  const updateTimeEntry = (entry: WorkUnit) => {
    const copy = window.structuredClone(timeEntries);
    const targetIdx = getEntryIndex(entry, copy);
    Object.assign(copy[targetIdx], entry);
    window.localStorage.setItem("entries", JSON.stringify(copy));
    setTimeEntries(copy);
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
        <Timer addTimeEntry={addTimeEntry} />
      </section>
      <section>
        <TotalsDisplay totalTime={totalTime} />
        <TimeEntries entries={timeEntries} updateTimeEntry={updateTimeEntry} />
      </section>
    </main>
  );
}

export default App;
