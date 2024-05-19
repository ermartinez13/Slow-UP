import React from 'react';
import { PartialEntry, TimerStatus } from './Timer.models';

interface Props {
  entry: PartialEntry;
  secondsLeft: number;
  status: TimerStatus;
}

function padZero(value: number): string {
  return value.toString().padStart(2, '0');
}

export function TimeRange({ entry, secondsLeft, status }: Props) {
  const [expectedCompletionTime, setExpectedCompletionTime] = React.useState('--');

  React.useEffect(() => {
    if (status === TimerStatus.ON) {
      const now = new Date();
      const expectedCompletionDate = new Date(now.getTime() + (secondsLeft * 1000));
      const expectedCompletionHours = expectedCompletionDate.getHours();
      const expectedCompletionMinutes = expectedCompletionDate.getMinutes();
      const expectedCompletionSeconds = expectedCompletionDate.getSeconds();
      const expectedCompletionAmPm = expectedCompletionHours >= 12 ? 'pm' : 'am';
      const expectedCompletionHours12 = expectedCompletionHours % 12 || 12;

      setExpectedCompletionTime(`${padZero(expectedCompletionHours12)}:${padZero(expectedCompletionMinutes)}:${padZero(expectedCompletionSeconds)} ${expectedCompletionAmPm}`);
    } else {
      setExpectedCompletionTime('--');
    }
  }, [status, secondsLeft]);

  if (entry.start === -1) {
    return (
      <div>
        <p>Started at: --</p>
        <p>Expected completion: --</p>
      </div>
    );
  }

  const startDate = new Date(entry.start);
  const startHours = startDate.getHours();
  const startMinutes = startDate.getMinutes();
  const startSeconds = startDate.getSeconds();
  const ampm = startHours >= 12 ? 'pm' : 'am';
  const startHours12 = startHours % 12 || 12;

  return (
    <div>
      <p>Started at: {padZero(startHours12)}:{padZero(startMinutes)}:{padZero(startSeconds)} {ampm}</p>
      <p>Expected completion: {expectedCompletionTime}</p>
    </div>
  );
}