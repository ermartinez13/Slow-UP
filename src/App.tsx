import { NotificationsPermission } from "./components/NotificationsPermission";
import { PreviousEntries } from "./components/TimeEntries";
import { getEntryIndex } from "./helpers";
import { WorkEntry } from "./models";
import { useLocalStorage } from "./hooks/use-local-storage";
import { CurrentEntry } from "./components/CurrentEntry";
import { ThemeProvider } from "@/components/Theme";

const INITIAL_ENTRIES: WorkEntry[] = [];

function App() {
  const [entries, setEntries] = useLocalStorage<WorkEntry[]>(
    "entries",
    INITIAL_ENTRIES
  );

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

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="grid gap-y-20">
        <section>
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
