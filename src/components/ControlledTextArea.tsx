import React from "react";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "./ui/card";

interface Props {
  content: string;
  setContent: (value: string) => void;
  label?: string;
}

export function ControlledTextArea({ content, setContent, label }: Props) {
  const [localContent, setLocalContent] = React.useState<string>(content);

  return (
    <Card className="p-0 w-full min-w-[33ch]">
      <CardContent className="p-4 space-y-1">
        {label && <Label htmlFor="textarea">{label}</Label>}
        <Textarea
          id="textarea"
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          onBlur={() => setContent(localContent)}
        />
      </CardContent>
    </Card>
  );
}
