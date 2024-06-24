import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
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

export function TagsFilter({ tags, selectedTags, setSelectedTags }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => console.log("clicked add filter button")}
        >
          + Add Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="type">Filter Type</Label>
              <Select defaultValue="OR">
                <SelectTrigger id="type" className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AND">AND</SelectItem>
                  <SelectItem value="OR">OR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">Max. width</Label>
              <Input
                id="maxWidth"
                defaultValue="300px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="height">Height</Label>
              <Input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxHeight">Max. height</Label>
              <Input
                id="maxHeight"
                defaultValue="none"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
