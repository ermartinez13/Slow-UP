interface Props {
  handleClick: () => void;
}

export function NotificationsPermissionBtn({ handleClick }: Props) {
  return (
    <button style={{ height: "2.5rem", width: "10rem" }} onClick={handleClick}>
      Set Permissions
    </button>
  );
}
