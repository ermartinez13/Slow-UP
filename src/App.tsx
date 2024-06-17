import { NotificationsPermission } from "./components/NotificationsPermission";
import { PreviousEntries } from "./components/TimeEntries";
import { getEntryIndex } from "./helpers";
import { WorkEntry } from "./models";
import { useLocalStorage } from "./hooks/use-local-storage";
import { CurrentEntry } from "./components/CurrentEntry";
import { ThemeProvider } from "@/components/Theme";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const INITIAL_ENTRIES: WorkEntry[] = [];

function App() {
  const [entries, setEntries] = useLocalStorage<WorkEntry[]>(
    "entries",
    INITIAL_ENTRIES
  );

  const [tags, setTags] = useLocalStorage<string[]>("tags", []);

  const saveEntry = (entry: WorkEntry) => {
    setEntries(entries.concat(entry));
  };

  const updateEntry = (entry: WorkEntry) => {
    const nextEntries = window.structuredClone(entries);
    const targetIdx = getEntryIndex(entry, nextEntries);
    Object.assign(nextEntries[targetIdx], entry);
    setEntries(nextEntries);
  };

  const deleteEntry = (entry: WorkEntry) => {
    const targetIdx = getEntryIndex(entry, entries);
    const nextEntries = entries.toSpliced(targetIdx, 1);
    setEntries(nextEntries);
  };

  const addTag = (tag: string) => {
    setTags(tags.concat(tag));
  };

  const deleteTag = (tag: string) => {
    const targetIdx = tags.indexOf(tag);
    const nextTags = tags.toSpliced(targetIdx, 1);
    setTags(nextTags);
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="grid gap-y-20">
        <section>
          <TagManager tags={tags} addTag={addTag} deleteTag={deleteTag} />
          <NotificationsPermission />
          <CurrentEntry saveEntry={saveEntry} />
        </section>
        <section>
          <PreviousEntries
            entries={entries}
            updateEntry={updateEntry}
            deleteEntry={deleteEntry}
          />
        </section>
      </main>
    </ThemeProvider>
  );
}

export default App;

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

function TagManager({ tags, addTag, deleteTag }: TagManagerProps) {
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
                  <Input placeholder="Tag" {...field} />
                </FormControl>
                <FormDescription>Enter a new tag.</FormDescription>
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
