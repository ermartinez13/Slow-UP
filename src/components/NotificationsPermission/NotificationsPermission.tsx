import { useNotifications } from "../../hooks/use-notifications";

export function NotificationsPermission() {
  const [permissionState, requestPermission] = useNotifications();

  const buttonText =
    permissionState === "prompt"
      ? "Grant permission to enable desktop notifications with sound."
      : `Notifications are ${permissionState === "granted" ? "enabled" : "disabled"}. Use the browser's site settings to update permissions.`;

  return (
    <div>
      <p>{buttonText}</p>
      {permissionState === "prompt" ? (
        <button
          className="w-36 rounded-sm bg-cyan-700"
          onClick={requestPermission}
        >
          Set Permission
        </button>
      ) : null}
    </div>
  );
}
