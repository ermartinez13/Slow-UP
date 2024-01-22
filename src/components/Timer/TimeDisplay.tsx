export function TimeDisplay() {
  return (
    <div className="time-display">
      <div className="time-unit">
        <label htmlFor="hours">hr</label>
        <input type="number" name="hours" defaultValue="00" />
      </div>
      <span>:</span>
      <div className="time-unit">
        <label htmlFor="minutes">min</label>
        <input type="number" name="minutes" defaultValue="00" />
      </div>
      <span>:</span>
      <div className="time-unit">
        <label htmlFor="seconds">sec</label>
        <input type="number" name="seconds" defaultValue="00" />
      </div>
    </div>
  );
}
