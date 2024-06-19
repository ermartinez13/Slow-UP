import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface TagListProps {
  tags: string[];
  deleteTag: (tag: string) => void;
}

export function TagList({ tags, deleteTag }: TagListProps) {
  return (
    <ScrollArea className="h-36 w-full rounded-md border">
      <div className="p-4">
        {tags.map((tag, index) => (
          <div key={tag}>
            <div className="flex justify-between items-center text-sm">
              <span>{tag}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTag(tag)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
            {index < tags.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
