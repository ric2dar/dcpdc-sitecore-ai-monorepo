"use client";

import * as React from "react";

/** Highlights matching `query` segments in `text` with bold marks */
export function HighlightMatch({
  text,
  query,
}: {
  text: string;
  query?: string;
}) {
  if (!query?.trim()) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-transparent font-bold text-inherit">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
