import React from "react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Props {
  content: string;
  setContent: (value: string) => void;
  label?: string;
}

export function ControlledTextArea({ content, setContent, label }: Props) {
  const [localContent, setLocalContent] = React.useState<string>(content);

  return (
    <div>
      <div className="grid w-full gap-1.5">
        <Label htmlFor="message">{label}</Label>
        <Textarea
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          onBlur={() => setContent(localContent)}
        />
      </div>
    </div>
  );
}
