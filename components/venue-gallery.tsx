"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";
import type { Locale } from "@/lib/data";

export type VenuePhoto = {
  url: string;
  source: string;
  credit: string;
  creditType?: "official" | "contributed";
  alt: { en: string; "zh-hk": string };
};

export function VenueGallery({ photos, locale }: { photos: VenuePhoto[]; locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const available = photos.filter((photo) => !failed.includes(photo.url));
  const current = Math.min(selected, available.length - 1);
  const photo = available[current];
  const move = (direction: -1 | 1) => setSelected((current + direction + available.length) % available.length);
  if (!photo) return <div className="gallery-unavailable">{locale === "en" ? "Photos are temporarily unavailable." : "相片暫時未能載入。"}</div>;
  return <figure className="venue-gallery">
    <div className="venue-gallery-image">
      {/* Official-source images retain their original hosting and attribution. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={photo.url} alt={photo.alt[locale]} referrerPolicy="no-referrer" onError={() => { setFailed((previous) => [...previous, photo.url]); setSelected(0); }} />
      <div className="venue-gallery-count"><Images size={15} aria-hidden="true" /> {current + 1} / {available.length}</div>
      {available.length > 1 && <div className="venue-gallery-nav">
        <button type="button" onClick={() => move(-1)} aria-label={locale === "en" ? "Previous photograph" : "上一張相片"}><ChevronLeft aria-hidden="true" /></button>
        <button type="button" onClick={() => move(1)} aria-label={locale === "en" ? "Next photograph" : "下一張相片"}><ChevronRight aria-hidden="true" /></button>
      </div>}
    </div>
    <figcaption><a href={photo.source} target="_blank" rel="noreferrer">{photo.creditType === "contributed" ? (locale === "en" ? "Contributed photo" : "讀者提供相片") : (locale === "en" ? "Official photo" : "官方相片")}: {photo.credit}</a><span>{locale === "en" ? "Venue gallery" : "場地相簿"}</span></figcaption>
    {available.length > 1 && <div className="venue-gallery-controls" aria-label={locale === "en" ? "Venue photographs" : "場地相片"}>{available.map((item, index) => <button type="button" key={item.url} onClick={() => setSelected(index)} aria-pressed={current === index} aria-label={`${locale === "en" ? "Show photo" : "顯示相片"} ${index + 1}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.url} alt="" loading="lazy" referrerPolicy="no-referrer" /><span>{index + 1}</span>
    </button>)}</div>}
  </figure>;
}
