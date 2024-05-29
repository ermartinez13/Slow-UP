import React from "react";
import { Toggle } from "../Toggle";

interface Props {
  isOn: boolean;
  handleToggle: () => void;
  offText: string;
  onText: string;
  shouldShowWarning: () => boolean;
  warningMessage: string;
}

export function ProtectedToggle({
  isOn,
  handleToggle,
  offText,
  onText,
  shouldShowWarning,
  warningMessage,
}: Props) {
  const [hasWarned, setHasWarned] = React.useState(false);
  const [isWarningVisible, setIsWarningVisible] = React.useState(false);

  const handleChange = () => {
    if (!isOn && !hasWarned && shouldShowWarning()) {
      setIsWarningVisible(true);
      setTimeout(() => {
        setIsWarningVisible(false);
      }, 5000);
      setHasWarned(true);
    } else {
      handleToggle();
      setIsWarningVisible(false);
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
      {isWarningVisible && (
        <div className="bg-yellow-500 dark:bg-yellow-800 p-2 rounded-md text-white dark:text-gray-200 mt-2">
          <span className="text-lg">{warningMessage}</span>
        </div>
      )}
    </div>
  );
}
