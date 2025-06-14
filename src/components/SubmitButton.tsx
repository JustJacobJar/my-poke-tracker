"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button className={className} type="submit" disabled={pending}>
      {text}
    </button>
  );
}
