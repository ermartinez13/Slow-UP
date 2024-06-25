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
import { FilterMode } from "./TimeEntries.constants";
import { FilterLayer } from "./TimeEntries.models";

interface Props {
  tags: string[];
  filterLayers: FilterLayer[];
  setFilterLayers: (layers: FilterLayer[]) => void;
}

export function TagsFilter({ tags, filterLayers, setFilterLayers }: Props) {
  const addFilterLayer = () => {
    setFilterLayers([
      ...filterLayers,
      { selectedTags: [], filterMode: FilterMode.OR },
    ]);
  };

  const removeFilterLayer = (index: number) => {
    setFilterLayers(filterLayers.filter((_, i) => i !== index));
  };

  const updateFilterLayer = (index: number, layer: FilterLayer) => {
    const newLayers = [...filterLayers];
    newLayers[index] = layer;
    setFilterLayers(newLayers);
  };

  return (
    <div className="flex flex-row gap-4 px-12">
      <Button onClick={addFilterLayer}>Add Filter Layer</Button>
      {filterLayers.map((layer, index) => (
        <Popover key={index}>
          <PopoverTrigger asChild>
            <Button variant="secondary">Filter {index + 1}</Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor={`type-${index}`}>Filter Type</Label>
                  <Select
                    value={layer.filterMode}
                    onValueChange={(value) =>
                      updateFilterLayer(index, {
                        ...layer,
                        filterMode: value as FilterMode,
                      })
                    }
                  >
                    <SelectTrigger id={`type-${index}`} className="w-[120px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={FilterMode.AND}>
                        {FilterMode.AND}
                      </SelectItem>
                      <SelectItem value={FilterMode.OR}>
                        {FilterMode.OR}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-y-2">
                  {tags.map((tag) => (
                    <div key={tag} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${tag}-${index}`}
                        checked={layer.selectedTags.includes(tag)}
                        value={tag}
                        onCheckedChange={(checkedState) => {
                          const newSelectedTags = checkedState
                            ? layer.selectedTags.concat(tag)
                            : layer.selectedTags.filter((t) => t !== tag);
                          updateFilterLayer(index, {
                            ...layer,
                            selectedTags: newSelectedTags,
                          });
                        }}
                      />
                      <label
                        htmlFor={`${tag}-${index}`}
                        className="text-sm font-medium leading-none"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
                </div>
                <Button
                  variant="secondary"
                  onClick={() => removeFilterLayer(index)}
                >
                  Remove Layer
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
}
