import { Button } from "./ui/button";

interface Props {
  tags: string[];
  deleteTag: (tag: string) => void;
}

export function TagList({ tags, deleteTag }: Props) {
  return (
    <div className="space-y-4">
      {tags.map((tag) => (
        <div key={tag} className="flex justify-between items-center">
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
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Button>
        </div>
      ))}
    </div>
  );
}
