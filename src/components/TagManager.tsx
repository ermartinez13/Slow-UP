import { NewTagForm } from "./NewTagForm";
import { TagList } from "./TagList";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";

export const tagSchema = z.object({
  tag: z.string().min(1, {
    message: "Tag is required.",
  }),
});

interface TagManagerProps {
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}

interface TagManagerProps {
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}

export function TagManager({ tags, addTag, deleteTag }: TagManagerProps) {
  const [open, setOpen] = React.useState(false);
  const [tagToDelete, setTagToDelete] = React.useState<string | null>(null);

  const handleDelete = (tag: string) => {
    setTagToDelete(tag);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (tagToDelete) {
      deleteTag(tagToDelete);
    }
    setOpen(false);
  };

  const handleCancelDelete = () => {
    setOpen(false);
    setTagToDelete(null);
  };

  return (
    <div className="container mx-auto max-w-[400px] text-center">
      <NewTagForm addTag={addTag} />
      <TagList tags={tags} deleteTag={handleDelete} />
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the tag "{tagToDelete}"? This
              action will remove the tag from all entries.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDelete}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
