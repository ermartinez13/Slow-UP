export function NotificationsPermissionBtn() {
  const requestPermission = () => window.Notification.requestPermission();

  return (
    <button className="w-36 rounded-sm bg-cyan-700" onClick={requestPermission}>
      Set Notifications Permission
    </button>
  );
}
