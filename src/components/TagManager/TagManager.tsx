import { NewTagForm } from "./NewTagForm";
import { TagList } from "./TagList";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface Props {
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}

export function TagManager({ tags, addTag, deleteTag }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Tag Manager</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Tags</SheetTitle>
          <SheetDescription>
            Make changes to your entry tags here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <NewTagForm addTag={addTag} />
          <TagList tags={tags} deleteTag={deleteTag} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
