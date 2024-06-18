import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface TagManagerProps {
  tags: string[];
  addTag: (tag: string) => void;
  deleteTag: (tag: string) => void;
}

const tagSchema = z.object({
  tag: z.string().min(1, {
    message: "Tag is required.",
  }),
});

export function TagManager({ tags, addTag, deleteTag }: TagManagerProps) {
  const form = useForm<z.infer<typeof tagSchema>>({
    resolver: zodResolver(tagSchema),
    defaultValues: {
      tag: "",
    },
  });

  function onSubmit(values: z.infer<typeof tagSchema>) {
    addTag(values.tag);
    form.reset();
  }

  const tagInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setValue("tag", e.target.value);
    if (form.formState.errors.tag) {
      form.clearErrors("tag");
    }
  };

  return (
    <div className="container mx-auto max-w-[400px] text-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tag</FormLabel>
                <FormControl className="w-[50%] mx-auto">
                  <Input {...field} onChange={tagInputChangeHandler} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Add Tag</Button>
        </form>
      </Form>
      {tags.map((tag) => (
        <div key={tag} className="flex justify-between items-center">
          <span>{tag}</span>
          <Button variant="destructive" onClick={() => deleteTag(tag)}>
            Delete
          </Button>
        </div>
      ))}
    </div>
  );
}
