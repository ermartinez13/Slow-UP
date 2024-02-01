export function NotificationsPermissionBtn() {
  const requestPermission = () => window.Notification.requestPermission();

  return (
    <button
      style={{ height: "2.5rem", width: "10rem" }}
      onClick={requestPermission}
    >
      Set Notifications Permission
    </button>
  );
}
