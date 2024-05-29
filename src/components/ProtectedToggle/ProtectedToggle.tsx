import React from "react";
import { Toggle } from "../Toggle";

interface Props {
  isOn: boolean;
  handleToggle: () => void;
  offText: string;
  onText: string;
  predicate: () => boolean;
  warningMessage: string;
}

export function ProtectedToggle({
  isOn,
  handleToggle,
  offText,
  onText,
  predicate,
  warningMessage,
}: Props) {
  const [warningDisplayed, setWarningDisplayed] = React.useState(false);
  const [predicateExecuted, setPredicateExecuted] = React.useState(false);

  const handleChange = () => {
    if (!isOn && !predicateExecuted) {
      if (predicate()) {
        handleToggle();
      } else {
        setWarningDisplayed(true);
        setTimeout(() => {
          setWarningDisplayed(false);
        }, 5000);
      }
      setPredicateExecuted(true);
    } else {
      handleToggle();
      setWarningDisplayed(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <Toggle
        isOn={isOn}
        handleToggle={handleChange}
        offText={offText}
        onText={onText}
      />
      {warningDisplayed && !isOn && (
        <div className="bg-yellow-500 dark:bg-yellow-800 p-2 rounded-md text-white dark:text-gray-200 mt-2">
          <span className="text-lg">{warningMessage}</span>
        </div>
      )}
    </div>
  );
}
