import { useEffect, useState } from "react";

import "./App.css";
import { Timer } from "./components/Timer";
import { NotificationsPermissionBtn } from "./components/NotificationsPermissionBtn";

function App() {
  const [totalTime, setTotalTime] = useState<number>(
    () => Number(window.localStorage.getItem("totalTime")) ?? 0
  );
  const [
    shouldRequestNotificationsPermission,
    setShouldRequestNotificationsPermission,
  ] = useState<boolean>(
    // if permission is not default then persimion is granted, denied, or Notifications API is not supported
    () => window.Notification?.permission === "default"
  );

  const updateTotalTime = (time: number) => {
    const nextValue = totalTime + time;
    window.localStorage.setItem("totalTime", nextValue.toString());
    setTotalTime(nextValue);
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
      <Timer totalTime={totalTime} updateTotalTime={updateTotalTime} />
    </>
  );
}

export default App;
