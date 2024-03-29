import { useState } from "react";

interface Props {
  content: string;
  setContent: (value: string) => void;
}

export function ControlledTextArea({ content, setContent }: Props) {
  const [localContent, setLocalContent] = useState<string>(content);

  return (
    <textarea
      className="w-full rounded-sm border-0 p-1.5"
      rows={3}
      cols={35}
      value={localContent}
      onChange={(e) => setLocalContent(e.target.value)}
      onBlur={() => setContent(localContent)}
    ></textarea>
  );
}
