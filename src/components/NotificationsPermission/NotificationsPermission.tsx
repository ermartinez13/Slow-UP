import { useNotifications } from "@/hooks/use-notifications";
import { Button } from "@/components/ui/button";

export function NotificationsPermission() {
  const [permissionState, requestPermission] = useNotifications();

  const buttonText =
    permissionState === "prompt"
      ? "Grant permission to enable desktop notifications with sound."
      : `Notifications are ${
          permissionState === "granted" ? "enabled" : "disabled"
        }. Use the browser's site settings to update permissions.`;

  return (
    <div>
      <p>{buttonText}</p>
      {permissionState === "prompt" ? (
        <Button
          className="bg-cyan-700 hover:bg-cyan-700/80 text-white"
          onClick={requestPermission}
        >
          Set Permission
        </Button>
      ) : null}
    </div>
  );
}
