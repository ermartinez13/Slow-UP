import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface TagProps {
  tag: string;
  onDelete: (tag: string) => void;
}

export function Tag({ tag, onDelete }: TagProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative">
          <Badge variant="secondary" className="px-4 py-2 max-w-xs truncate">
            <span className="text-sm">{tag}</span>
          </Badge>
          <Button
            variant="destructive"
            onClick={() => onDelete(tag)}
            className="absolute -top-2 -right-2 w-4 h-4 p-0 rounded-full flex items-center justify-center"
          >
            <span className="text-md">&times;</span>
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tag}</p>
      </TooltipContent>
    </Tooltip>
  );
}
