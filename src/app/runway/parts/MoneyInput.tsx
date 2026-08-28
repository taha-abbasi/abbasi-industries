"use client";
import { useEffect, useRef, useState } from "react";

/**
 * A text field whose displayed value follows state — except while it has focus,
 * so reformatting never fights someone mid-keystroke.
 */
export default function MoneyInput({
  display, onCommit, className, ariaLabel,
}: {
  display: string;
  onCommit: (raw: string) => void;
  className?: string;
  ariaLabel: string;
}) {
  const [text, setText] = useState(display);
  const focused = useRef(false);

  useEffect(() => {
    if (!focused.current) setText(display);
  }, [display]);

  return (
    <input
      inputMode="decimal"
      aria-label={ariaLabel}
      value={text}
      className={className}
      onFocus={() => { focused.current = true; }}
      onBlur={() => { focused.current = false; setText(display); }}
      onChange={(e) => { setText(e.target.value); onCommit(e.target.value); }}
    />
  );
}
