import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddTagFormProps {
  tags: string[];
  addTag: (value: string) => void;
}

const tagSchema = z.object({
  tag: z.string().min(1, {
    message: "Tag is required.",
  }),
});

export function AddTagForm({ tags, addTag }: AddTagFormProps) {
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

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-row items-center justify-center gap-4"
        >
          <FormField
            control={form.control}
            name="tag"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-y-0 space-x-4">
                <FormLabel>Tag</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    value={form.watch("tag")}
                    disabled={tags.length === 0}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select a tag" />
                    </SelectTrigger>
                    <SelectContent>
                      {tags.map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={tags.length === 0}>
            Add Tag
          </Button>
        </form>
      </Form>
    </div>
  );
}
