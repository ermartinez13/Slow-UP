interface Props {
  time: number;
}

export function TimeDisplay({ time }: Props) {
  return (
    <div className="time-display">
      <div className="time-unit">
        <label htmlFor="hours">hr</label>
        <input type="number" name="hours" value={Math.floor(time / 3600)} />
      </div>
      <span>:</span>
      <div className="time-unit">
        <label htmlFor="minutes">min</label>
        <input
          type="number"
          name="minutes"
          value={Math.floor((time / 60) % 60)}
        />
      </div>
      <span>:</span>
      <div className="time-unit">
        <label htmlFor="seconds">sec</label>
        <input type="number" name="seconds" value={time % 60} />
      </div>
    </div>
  );
}
