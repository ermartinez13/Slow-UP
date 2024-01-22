import { ActionButtons } from "./ActionButtons";
import { TimeDisplay } from "./TimeDisplay";
import { TotalsDisplay } from "./TotalsDisplay";

export function Timer() {
  return (
    <div className="timer">
      <div className="display">
        <TimeDisplay />
        <TotalsDisplay />
      </div>
      <ActionButtons />
    </div>
  );
}
