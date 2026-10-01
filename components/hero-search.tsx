"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Search } from "lucide-react";
import type { Locale, TerritoryId } from "@/lib/data";

export type HeroSearchSuggestion = {
  name: string;
  area: string;
  category: string;
  href: string;
  searchText: string;
};

type HeroSearchProps = {
  locale: Locale;
  suggestions: HeroSearchSuggestion[];
  territories: Array<{ id: TerritoryId; label: string }>;
  labels: {
    placeholder: string;
    allAreas: string;
    submit: string;
    suggestions: string;
    viewAll: string;
  };
};

function normalize(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
}

export function HeroSearch({ locale, suggestions, territories, labels }: HeroSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const matches = useMemo(() => {
    const term = normalize(query);
    if (!term) return [];
    return suggestions
      .filter((item) => normalize(item.searchText).includes(term))
      .map((item, originalIndex) => {
        const name = normalize(item.name);
        const area = normalize(item.area);
        const score = name.startsWith(term) ? 0 : name.includes(term) ? 1 : area.startsWith(term) ? 2 : area.includes(term) ? 3 : 4;
        return { item, originalIndex, score };
      })
      .sort((a, b) => a.score - b.score || a.originalIndex - b.originalIndex)
      .slice(0, 6)
      .map(({ item }) => item);
  }, [query, suggestions]);

  const showSuggestions = open && query.trim().length > 0;

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showSuggestions || matches.length === 0) {
      if (event.key === "Escape") setOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % matches.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index <= 0 ? matches.length - 1 : index - 1));
    } else if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      router.push(matches[activeIndex].href);
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <form
      className="hero-search hero-search-autocomplete"
      action={`/${locale}/places`}
      onFocus={() => setOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="hero-search-combobox">
        <label className="search-field" htmlFor="hero-venue-search"><Search size={20} /><span className="sr-only">{labels.placeholder}</span><input
          id="hero-venue-search"
          name="q"
          value={query}
          placeholder={labels.placeholder}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showSuggestions}
          aria-controls="hero-search-suggestions"
          aria-activedescendant={activeIndex >= 0 ? `hero-suggestion-${activeIndex}` : undefined}
          onChange={(event) => { setQuery(event.target.value); setOpen(true); setActiveIndex(-1); }}
          onKeyDown={handleKeyDown}
        /></label>
        {showSuggestions && <div className="hero-search-menu" id="hero-search-suggestions" role="listbox" aria-label={labels.suggestions}>
          {matches.length > 0 ? matches.map((item, index) => <Link
            id={`hero-suggestion-${index}`}
            role="option"
            aria-selected={activeIndex === index}
            className={activeIndex === index ? "active" : ""}
            href={item.href}
            key={item.href}
            onMouseEnter={() => setActiveIndex(index)}
          ><span><strong>{item.name}</strong><small>{item.area} · {item.category}</small></span><ArrowRight size={16} /></Link>) : <Link className="hero-search-all" href={`/${locale}/places?q=${encodeURIComponent(query)}`}><span><strong>{labels.viewAll}</strong><small>“{query}”</small></span><ArrowRight size={16} /></Link>}
        </div>}
      </div>
      <label className="select-field"><MapPin size={20} /><span className="sr-only">{labels.allAreas}</span><select name="territory" defaultValue="all"><option value="all">{labels.allAreas}</option>{territories.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
      <button type="submit">{labels.submit}<ArrowRight size={18} /></button>
    </form>
  );
}
