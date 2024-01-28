import { useEffect, useState } from "react";

import "./App.css";
import { Timer } from "./components/Timer";
import { NotificationsPermissionBtn } from "./components/NotificationsPermissionBtn";
import { TimeEntries } from "./components/TimeEntries";
import { getTodaysTotalTime } from "./helpers";

function App() {
  const [timeEntries, setTimeEntries] = useState<
    Array<{ start: number; end: number; text: string }>
  >(() => JSON.parse(window.localStorage.getItem("entries") ?? "[]"));
  const [
    shouldRequestNotificationsPermission,
    setShouldRequestNotificationsPermission,
  ] = useState<boolean>(
    // if permission is not default then persimion is granted, denied, or Notifications API is not supported
    () => window.Notification?.permission === "default"
  );
  const totalTime = getTodaysTotalTime(timeEntries);

  const updateTimeEntries = (entry: {
    start: number;
    end: number;
    text: string;
  }) => {
    const nextValue = timeEntries.concat(entry);
    window.localStorage.setItem("entries", JSON.stringify(nextValue));
    setTimeEntries(nextValue);
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
    <>
      {shouldRequestNotificationsPermission ? (
        <NotificationsPermissionBtn handleClick={requestPermission} />
      ) : null}
      <Timer totalTime={totalTime} updateTimeEntries={updateTimeEntries} />
      <TimeEntries entries={timeEntries} />
    </>
  );
}

export default App;
