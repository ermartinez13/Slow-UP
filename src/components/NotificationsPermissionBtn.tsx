export function NotificationsPermissionBtn() {
  const requestPermission = () => window.Notification.requestPermission();

  return (
    <button className="h-10 w-40" onClick={requestPermission}>
      Set Notifications Permission
    </button>
  );
}
