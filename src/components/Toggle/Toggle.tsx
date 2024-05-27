interface Props {
  isOn: boolean;
  handleToggle: () => void;
  offText: string;
  onText: string;
}

export function Toggle({ isOn, handleToggle, offText, onText }: Props) {
  return (
    <div className="flex justify-center items-center">
      <span className="text-lg">{offText}</span>
      <input
        type="checkbox"
        id="toggle"
        className="hidden"
        checked={isOn}
        onChange={handleToggle}
      />
      <label
        htmlFor="toggle"
        className="relative inline-block w-12 h-7 rounded-full bg-gray-600 cursor-pointer mx-2"
      >
        <span
          className={`absolute top-1/2 transform -translate-y-1/2 ${
            isOn ? "translate-x-6" : "translate-x-1"
          } w-5 h-5 rounded-full bg-gray-400 transition`}
        />
      </label>
      <span className="text-lg">{onText}</span>
    </div>
  );
}
