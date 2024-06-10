import { Switch } from "@/components/ui/switch";

interface Props {
  isOn: boolean;
  handleToggle: () => void;
  offText: string;
  onText: string;
}

export function Toggle({ isOn, handleToggle, offText, onText }: Props) {
  return (
    <div className="flex justify-center items-center gap-x-3">
      <span aria-hidden="true" className="text-lg">
        {offText}
      </span>
      <span id="toggle-label" className="sr-only">
        {isOn ? onText : offText}
      </span>
      <Switch
        checked={isOn}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-gray-300"
        aria-labelledby="toggle-label"
      />
      <span aria-hidden="true" className="text-lg">
        {onText}
      </span>
    </div>
  );
}
