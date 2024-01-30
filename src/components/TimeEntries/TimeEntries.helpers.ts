export function getTimeSpentStr(timeSpent: number) {
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;
  const minutesStr = minutes === 0 ? "" : `${minutes}min `;
  const secondsStr = `${seconds}s`;
  return `${minutesStr} ${secondsStr}`;
}
