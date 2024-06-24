import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Button } from "@/components/ui/button";

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
    <div>
      <Button
        variant="ghost"
        onClick={() => console.log("clicked add filter button")}
      >
        + Add Filter
      </Button>
    </div>
  );
}
