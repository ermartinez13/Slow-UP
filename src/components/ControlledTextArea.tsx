import { useState } from "react";

interface Props {
  content: string;
  setContent: (value: string) => void;
}

export function ControlledTextArea({ content, setContent }: Props) {
  const [localContent, setLocalContent] = useState<string>(content);

  return (
    <textarea
      rows={3}
      value={localContent}
      onChange={(e) => setLocalContent(e.target.value)}
      onBlur={() => setContent(localContent)}
    ></textarea>
  );
}
