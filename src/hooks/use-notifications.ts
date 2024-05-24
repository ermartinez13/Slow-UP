import { usePermission } from './use-permission';

export function useNotifications() {
  const permissionState = usePermission('notifications');

  const requestPermission = () => {
    window.Notification.requestPermission();
  };

  return [permissionState, requestPermission] as const;
}