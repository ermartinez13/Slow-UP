import { useState } from "react";

interface Props {
  text: string;
  updateTimeEntry: React.Dispatch<
    React.SetStateAction<{ start: number; text: string }>
  >;
}

export function Comment({ text, updateTimeEntry }: Props) {
  const [comment, setComment] = useState<string>(text);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.currentTarget.value);
  };
  const persistComment = () => {
    updateTimeEntry((prev) => ({ ...prev, text: comment }));
  };

  return (
    <textarea
      value={comment}
      onChange={handleChange}
      onBlur={persistComment}
    ></textarea>
  );
}
