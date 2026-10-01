"use client";
import { useState, type ReactNode } from "react";

export function VenueThumbnail({ src, fallbackSrc, fallback }: { src?: string; fallbackSrc?: string; fallback: ReactNode }) {
  const [failedSources, setFailedSources] = useState<string[]>([]);
  const currentSrc = [src, fallbackSrc].find((candidate) => candidate && !failedSources.includes(candidate));
  if (!currentSrc) return <>{fallback}</>;
  // Decorative preview; the linked venue title provides the accessible name.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={currentSrc} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailedSources((previous) => [...previous, currentSrc])} />;
}
