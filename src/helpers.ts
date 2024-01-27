export function notify() {
  const permissionGranted = window.Notification?.permission === "granted";
  if (permissionGranted) new Notification("Timer Session Ended");
}
