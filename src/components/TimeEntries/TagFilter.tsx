import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TagsFilterProps {
  tags: string[];
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
}

export function TagsFilter({
  tags,
  selectedTags,
  setSelectedTags,
}: TagsFilterProps) {
  return (
    <ToggleGroup
      type="multiple"
      value={selectedTags}
      onValueChange={(value) => setSelectedTags(value)}
    >
      {tags.map((tag) => (
        <ToggleGroupItem key={tag} value={tag}>
          {tag}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
