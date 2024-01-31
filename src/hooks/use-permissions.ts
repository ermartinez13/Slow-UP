import { useEffect, useState } from "react";

export function usePermissions(permissionName: PermissionName) {
  const [permissionState, setPermissionState] = useState<
    PermissionState | undefined
  >();

  useEffect(() => {
    let permissionStatus: PermissionStatus | null = null;

    const handleStatusChange = (e: Event) => {
      const target = e.target;
      if (target instanceof PermissionStatus) {
        setPermissionState(target.state);
      }
    };

    window.navigator.permissions
      .query({ name: permissionName })
      .then((v) => {
        permissionStatus = v;
        setPermissionState(permissionStatus.state);
        permissionStatus.addEventListener("change", handleStatusChange);
      })
      .catch(console.error);

    return () =>
      permissionStatus?.removeEventListener("change", handleStatusChange);
  }, [permissionName]);

  return permissionState;
}
