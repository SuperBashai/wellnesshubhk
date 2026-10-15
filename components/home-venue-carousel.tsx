"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from "lucide-react";

export type HomeVenue = { slug: string; name: string; category: string; image: string; alt: string; credit: string };

export function HomeVenueCarousel({ venues, locale }: { venues: HomeVenue[]; locale: string }) {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const pages = Math.ceil(venues.length / 4);
  const english = locale === "en";
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || hovered || reducedMotion || pages < 2) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setPage((current) => (current + 1) % pages);
    }, 8000);
    return () => window.clearInterval(timer);
  }, [paused, hovered, reducedMotion, pages]);
  const move = (direction: number) => {
    setPaused(true);
    setPage((current) => (current + direction + pages) % pages);
  };
  return <div role="region" aria-roledescription="carousel" aria-label={english ? "Explore venues" : "探索場地"}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setPaused(true)}>
    <div className="home-carousel-controls">
      <span aria-live={paused ? "polite" : "off"}>{page + 1} / {pages}</span>
      <button type="button" onClick={() => move(-1)} aria-label={english ? "Previous venues" : "上一組場地"}><ArrowLeft size={18} /></button>
      {!reducedMotion && <button type="button" onClick={() => setPaused(!paused)} aria-label={english ? (paused ? "Start rotation" : "Pause rotation") : (paused ? "開始輪播" : "暫停輪播")}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>}
      <button type="button" onClick={() => move(1)} aria-label={english ? "Next venues" : "下一組場地"}><ArrowRight size={18} /></button>
    </div>
    <div className="home-visual-grid">
      {venues.slice(page * 4, page * 4 + 4).map((item, index) => <Link className={`home-visual-card home-visual-card-${index + 1}`} href={`/${locale}/venues/${item.slug}`} key={item.slug}>
        <span className="home-visual-media"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 780px) 100vw, 50vw" /></span>
        <span className="home-visual-overlay" aria-hidden="true" />
        <span className="home-visual-copy"><small>{item.category}</small><strong>{item.name}</strong><span>{item.credit}</span></span>
        <ArrowUpRight className="home-visual-arrow" size={22} aria-hidden="true" />
      </Link>)}
    </div>
  </div>;
}
