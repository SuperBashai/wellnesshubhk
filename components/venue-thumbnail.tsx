"use client";
import { useState, type ReactNode } from "react";

export function VenueThumbnail({ src, fallback }: { src?: string; fallback: ReactNode }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return <>{fallback}</>;
  // Decorative preview; the linked venue title provides the accessible name.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setFailed(true)} />;
}
