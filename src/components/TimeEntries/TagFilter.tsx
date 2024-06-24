import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import React, { SetStateAction } from "react";
import { FilterMode } from "./TimeEntries";

interface Props {
  tags: string[];
  selectedTags: string[];
  setSelectedTags: React.Dispatch<SetStateAction<string[]>>;
  filterMode: FilterMode;
  handleFilterChange: (value: string) => void;
}

// export function TagsFilter({
//   tags,
//   selectedTags,
//   setSelectedTags,
// }: TagsFilterProps) {
//   return (
//     <ToggleGroup
//       type="multiple"
//       value={selectedTags}
//       onValueChange={(value) => setSelectedTags(value)}
//     >
//       {tags.map((tag) => (
//         <ToggleGroupItem key={tag} value={tag}>
//           {tag}
//         </ToggleGroupItem>
//       ))}
//     </ToggleGroup>
//   );
// }

export function TagsFilter({
  tags,
  selectedTags,
  setSelectedTags,
  filterMode,
  handleFilterChange,
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">+ Add Filter</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="type">Filter Type</Label>
              <Select value={filterMode} onValueChange={handleFilterChange}>
                <SelectTrigger id="type" className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={FilterMode.AND}>
                    {FilterMode.AND}
                  </SelectItem>
                  <SelectItem value={FilterMode.OR}>{FilterMode.OR}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {tags.map((tag) => (
              <div key={tag} className="flex items-center space-x-2">
                <Checkbox
                  id={tag}
                  checked={selectedTags.includes(tag)}
                  value={tag}
                  onCheckedChange={(checkedState) => {
                    if (checkedState === true) {
                      setSelectedTags((prev) => prev.concat(tag));
                    } else {
                      setSelectedTags((prev) => prev.filter((t) => t !== tag));
                    }
                  }}
                />
                <label
                  htmlFor={tag}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {tag}
                </label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
