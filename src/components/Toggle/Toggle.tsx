import { Label } from "@/components/ui/label";
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
      <Label className="text-lg">{offText}</Label>
      <Switch
        checked={isOn}
        onCheckedChange={handleToggle}
        className="data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-gray-300"
      />
      <Label className="text-lg">{onText}</Label>
    </div>
  );
}
