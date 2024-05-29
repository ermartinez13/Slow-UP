export function notify() {
  const permissionGranted = window.Notification?.permission === "granted";
  if (permissionGranted) {
    const notification = new Notification("Timer Session Ended", {
      silent: false,
    });
    notification.addEventListener("show", () => {
      const audio = new Audio("/success-trumpets.mp3");
      audio.play().catch(console.error);
    });
  }
}