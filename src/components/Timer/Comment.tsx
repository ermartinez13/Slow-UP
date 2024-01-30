import { useState } from "react";
import { PartialTimeEntry } from "./Timer.models";

interface Props {
  description: string;
  updatePartialTimeEntry: React.Dispatch<
    React.SetStateAction<PartialTimeEntry>
  >;
}

export function Comment({
  description,
  updatePartialTimeEntry: updateTimeEntry,
}: Props) {
  const [comment, setComment] = useState<string>(description);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };
  const persistComment = () => {
    updateTimeEntry((prev) => ({ ...prev, description: comment }));
  };

  return (
    <textarea
      value={comment}
      onChange={handleChange}
      onBlur={persistComment}
    ></textarea>
  );
}
