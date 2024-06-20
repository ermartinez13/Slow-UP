import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/utils";
import { Tag } from "./Tag";

interface TagListProps {
  tags: string[];
  onDelete: (tag: string) => void;
  className?: string;
}

export function TagList({ tags, onDelete, className }: TagListProps) {
  return (
    <TooltipProvider>
      <div className={cn("flex flex-wrap gap-4", className)}>
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} onDelete={onDelete} />
        ))}
      </div>
    </TooltipProvider>
  );
}
