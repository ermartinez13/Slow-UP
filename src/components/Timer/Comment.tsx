import { useState } from "react";
import { PartialEntry } from "./Timer.models";

interface Props {
  description: string;
  setPartialEntry: React.Dispatch<React.SetStateAction<PartialEntry>>;
}

export function Comment({ description, setPartialEntry }: Props) {
  const [comment, setComment] = useState<string>(description);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };
  const persistComment = () => {
    setPartialEntry((prev) => ({ ...prev, description: comment }));
  };

  return (
    <textarea
      value={comment}
      onChange={handleChange}
      onBlur={persistComment}
    ></textarea>
  );
}
