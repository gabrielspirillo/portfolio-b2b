import { Fragment, ReactNode } from "react";

// Renders **emphasis** from the copy as highlighted words
export function rich(text: string, strongClass = "font-semibold text-white"): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? (
      <strong key={i} className={strongClass}>
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}
