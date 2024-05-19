import { usePermissions } from './use-permissions';

export function useNotifications() {
  const permissionState = usePermissions('notifications');

  const requestPermission = () => {
    window.Notification.requestPermission();
  };

  return [permissionState, requestPermission];
}