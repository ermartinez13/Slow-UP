export function getFormattedDate(timestamp: number) {
  const date = new Date(timestamp);
  const month = (date.getMonth() + 1).toString();
  const day = date.getDate().toString();
  return `${month} / ${day}`;
}

export function getFormattedTime(timestamp: number) {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const formattedHours = (hours <= 12 ? hours : hours % 12).toString();
  const formattedMinutes = date.getMinutes().toString().padStart(2, "0");
  const amPm = hours >= 12 ? "pm" : "am";
  return `${formattedHours}:${formattedMinutes}${amPm}`;
}

export function getDatesToRender(startTimestamp: number, endTimestamp: number) {
  const dateStart = getFormattedDate(startTimestamp);
  const dateEnd = getFormattedDate(endTimestamp);
  const isSameDate = dateStart === dateEnd;
  return `${dateStart}${isSameDate ? "" : ` - ${dateEnd}`}`;
}

export function getTimesToRender(startTimestamp: number, endTimestamp: number) {
  const timeStart = getFormattedTime(startTimestamp);
  const timeEnd = getFormattedTime(endTimestamp);
  const isSameTime = timeStart === timeEnd;
  return `${timeStart}${isSameTime ? "" : ` - ${timeEnd}`}`;
}

interface TimeBreakdown {
  hours: number;
  minutes: number;
  seconds: number;
  centiseconds: number;
}

function millisecondsToTimeBreakdown(milliseconds: number): TimeBreakdown {
  const centiseconds = Math.floor((milliseconds % 1000) / 10);
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  return { hours, minutes, seconds: secondsLeft, centiseconds };
}

export function getTimeSpentStr(timeSpent: number) {
  const {hours, minutes, seconds} = millisecondsToTimeBreakdown(timeSpent);
  let timeString = '';
  if (hours > 0) timeString += `${hours}h `;
  if (minutes > 0) timeString += `${minutes}m `;
  timeString += `${seconds}s`;
  return timeString;
}