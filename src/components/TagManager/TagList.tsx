import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TagListProps {
  tags: string[];
  deleteTag: (tag: string) => void;
}

export function TagList({ tags, deleteTag }: TagListProps) {
  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        {tags.map((tag, index) => (
          <div key={tag}>
            <div className="flex justify-between items-center text-sm">
              <span>{tag}</span>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm">
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
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete the tag "{tag}"? This
                      action will remove the tag from all entries.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="submit" onClick={() => deleteTag(tag)}>
                        Delete
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {index < tags.length - 1 && <Separator className="my-2" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
