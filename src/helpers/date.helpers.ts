export function getDayBoundaries(dateOrOffset: string | number): {
  start: number;
  end: number;
} {
  let date: Date;

  if (typeof dateOrOffset === "string") {
    date = new Date(dateOrOffset); // date-only forms are interpreted as a UTC time
    const timezoneOffset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() + timezoneOffset); // inject the local time's offset into UTC date to address off-by-one day error
  } else {
    date = new Date();
    date.setDate(date.getDate() - dateOrOffset);
  }

  const start = date.setHours(0, 0, 0, 0);
  const end = date.setHours(23, 59, 59, 999);

  return { start, end };
}