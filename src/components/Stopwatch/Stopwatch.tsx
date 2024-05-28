interface Props {
  timeSpent: number;
}

export function Stopwatch({ timeSpent }: Props) {
  const formatTime = (time: number) => {
    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const tenthsOfASecond = Math.floor((time % 1000) / 100);
    return `${minutes.toString().padStart(2, "0")}:${secondsRemaining
      .toString()
      .padStart(2, "0")}.${tenthsOfASecond}`;
  };

  return (
    <div className="grid gap-y-8 place-content-center">
      <h1>{formatTime(timeSpent)}</h1>
    </div>
  );
}
