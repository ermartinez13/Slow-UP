export function TotalsDisplay({ totalTime }: { totalTime: number }) {
  const hours = Math.floor(totalTime / 3600);
  const minutes = Math.floor(totalTime / 60) % 60;
  return (
    <span>
      {hours} hrs &nbsp;{minutes} min
    </span>
  );
}
