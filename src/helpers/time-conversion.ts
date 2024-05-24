interface TimeBreakdown {
  hours: number;
  minutes: number;
  seconds: number;
  centiseconds: number;
}

export function millisecondsToTimeBreakdown(milliseconds: number): TimeBreakdown {
  const centiseconds = Math.floor((milliseconds % 1000) / 10);
  const seconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = seconds % 60;

  return { hours, minutes, seconds: secondsLeft, centiseconds };
}