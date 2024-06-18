import { NewTagForm } from "./NewTagForm";
import { TagList } from "./TagList";
import { z } from "zod";

interface TagManagerProps {
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}

export const tagSchema = z.object({
  tag: z.string().min(1, {
    message: "Tag is required.",
  }),
});

export function TagManager({ tags, addTag, deleteTag }: TagManagerProps) {
  return (
    <div className="container mx-auto max-w-[400px] text-center">
      <NewTagForm addTag={addTag} />
      <TagList tags={tags} deleteTag={deleteTag} />
    </div>
  );
}
