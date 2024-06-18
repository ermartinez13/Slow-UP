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
import { tagSchema } from "./TagManager";

interface Props {
  addTag: (tag: string) => void;
}

export function NewTagForm({ addTag }: Props) {
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
  );
}
