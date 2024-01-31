export function TotalsDisplay({ totalSeconds }: { totalSeconds: number }) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor(totalSeconds / 60) % 60;
  return (
    <span>
      {hours} hrs &nbsp;{minutes} min
    </span>
  );
}
