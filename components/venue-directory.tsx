"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUpRight, Dumbbell, Flame, Leaf, MapPin, Search, ShoppingBasket, Snowflake, X } from "lucide-react";
import { categories, copy, listingName, listingSlug, listings, territories, type CategoryId, type Locale, type TerritoryId } from "@/lib/data";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VenueThumbnail } from "@/components/venue-thumbnail";
import { listingCategories } from "@/lib/listing-categories";
import { sports, listingSports, type SportId } from "@/lib/sports";
import { venueFallbacks } from "@/lib/venue-fallbacks";

const categoryIcons = { movement: Dumbbell, recovery: Snowflake, sauna: Flame, food: Leaf, shops: ShoppingBasket };

function normalize(value: string) {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().trim();
}

export function VenueDirectory({ locale, covers, initialCategory, initialTerritory, initialQuery }: { locale: Locale; covers: Record<string, string>; initialCategory: CategoryId | "all"; initialTerritory: TerritoryId | "all"; initialQuery: string }) {
  const router = useRouter();
  const t = copy[locale];
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<CategoryId | "all">(initialCategory);
  const [territory, setTerritory] = useState<TerritoryId | "all">(initialTerritory);
  const [visibleCount, setVisibleCount] = useState(20);
  const [sport, setSport] = useState<SportId | "all">("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);

  const filtered = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return listings.filter((listing) => {
      const activities = listingSports(listing);
      const searchable = [listingName(listing, "en"), listingName(listing, "zh-hk"), listing.area.en, listing.area["zh-hk"], listing.address?.en, listing.address?.["zh-hk"], listing.description[locale], ...listing.tags.en, ...listing.tags["zh-hk"], ...sports.filter((item) => activities.includes(item.id)).flatMap((item) => [item.label.en, item.label["zh-hk"]])].join(" ").toLocaleLowerCase();
      return (!term || searchable.includes(term)) && (category === "all" || listingCategories(listing).includes(category)) && (territory === "all" || listing.territory === territory) && (category !== "movement" || sport === "all" || activities.includes(sport));
    });
  }, [category, locale, query, territory, sport]);

  const searchSuggestions = useMemo(() => {
    const term = normalize(query);
    if (!term) return [];
    return filtered
      .map((listing, originalIndex) => {
        const name = normalize(listingName(listing, locale));
        const alternateName = normalize(listingName(listing, locale === "en" ? "zh-hk" : "en"));
        const area = normalize(listing.area[locale]);
        const score = name.startsWith(term) ? 0 : name.includes(term) ? 1 : alternateName.startsWith(term) ? 2 : alternateName.includes(term) ? 3 : area.startsWith(term) ? 4 : area.includes(term) ? 5 : 6;
        return { listing, originalIndex, score };
      })
      .sort((a, b) => a.score - b.score || a.originalIndex - b.originalIndex)
      .slice(0, 6)
      .map(({ listing }) => listing);
  }, [filtered, locale, query]);

  const showSearchSuggestions = searchOpen && query.trim().length > 0 && searchSuggestions.length > 0;

  function handleSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!showSearchSuggestions) {
      if (event.key === "Escape") setSearchOpen(false);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveSuggestion((index) => (index + 1) % searchSuggestions.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveSuggestion((index) => (index <= 0 ? searchSuggestions.length - 1 : index - 1));
    } else if (event.key === "Enter" && activeSuggestion >= 0) {
      event.preventDefault();
      router.push(`/${locale}/venues/${listingSlug(searchSuggestions[activeSuggestion])}`);
      setSearchOpen(false);
    } else if (event.key === "Escape") {
      setSearchOpen(false);
    }
  }

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setTerritory("all");
    setVisibleCount(20);
    setSport("all");
    setSearchOpen(false);
    setActiveSuggestion(-1);
  }

  return (
    <main>
      <SiteHeader locale={locale} alternatePath="/places" />
      <section className="section directory-section" id="places">
        <div className="shell">
          <div className="section-heading directory-heading"><div><span className="eyebrow"><span />{t.featuredEyebrow}</span><h1>{t.featuredTitle}</h1><p>{t.featuredBody}</p></div><strong className="result-count">{String(filtered.length).padStart(2, "0")}<small>{locale === "en" ? "places" : "個地方"}</small></strong></div>
          <div className="directory-search">
            <div
              className="directory-search-combobox"
              onFocus={() => setSearchOpen(true)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setSearchOpen(false);
              }}
            >
              <label htmlFor="directory-venue-search"><Search size={18} /><span className="sr-only">{locale === "en" ? "Search directory" : "搜尋目錄"}</span><input
                id="directory-venue-search"
                placeholder={t.searchPlaceholder}
                value={query}
                autoComplete="off"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={showSearchSuggestions}
                aria-controls="directory-search-suggestions"
                aria-activedescendant={activeSuggestion >= 0 ? `directory-suggestion-${activeSuggestion}` : undefined}
                onChange={(event) => { setQuery(event.target.value); setVisibleCount(20); setSearchOpen(true); setActiveSuggestion(-1); }}
                onKeyDown={handleSearchKeyDown}
              /></label>
              {showSearchSuggestions ? <div className="hero-search-menu directory-search-menu" id="directory-search-suggestions" role="listbox" aria-label={locale === "en" ? "Venue suggestions" : "場地建議"}>
                {searchSuggestions.map((listing, index) => {
                  const name = listingName(listing, locale);
                  const href = `/${locale}/venues/${listingSlug(listing)}`;
                  const categoryLabel = categories.find((item) => item.id === listing.category)?.label[locale] ?? "";
                  return <Link
                    id={`directory-suggestion-${index}`}
                    role="option"
                    aria-selected={activeSuggestion === index}
                    className={activeSuggestion === index ? "active" : ""}
                    href={href}
                    key={href}
                    onMouseEnter={() => setActiveSuggestion(index)}
                    onClick={() => setSearchOpen(false)}
                  ><span><strong>{name}</strong><small>{listing.area[locale]} · {categoryLabel}</small></span><ArrowRight size={16} /></Link>;
                })}
              </div> : null}
            </div>
            <label><MapPin size={18} /><span className="sr-only">{locale === "en" ? "Filter by region" : "按區域篩選"}</span><select value={territory} onChange={(event) => { setTerritory(event.target.value as TerritoryId | "all"); setVisibleCount(20); }}><option value="all">{t.allAreas}</option>{territories.map((item) => <option key={item.id} value={item.id}>{item.label[locale]}</option>)}</select></label>
          </div>
          <div className="filter-bar" aria-label="Directory filters">
            <button aria-pressed={category === "all"} className={category === "all" ? "active" : ""} onClick={() => { setCategory("all"); setVisibleCount(20); }}>{t.all}</button>
            {categories.map((item) => <button aria-pressed={category === item.id} className={category === item.id ? "active" : ""} key={item.id} onClick={() => { setCategory(item.id); setVisibleCount(20); }}>{item.label[locale]}</button>)}
            {(query || category !== "all" || territory !== "all") && <button className="clear-filter" onClick={clearFilters}><X size={14} />{t.clear}</button>}
          </div>
          {category === "movement" && <div className="sport-filter"><label htmlFor="sport-select">{locale === "en" ? "Choose your sport" : "揀你想玩嘅運動"}</label><select id="sport-select" value={sport} onChange={(event) => { setSport(event.target.value as SportId | "all"); setVisibleCount(20); }}><option value="all">{locale === "en" ? "All sports & fitness" : "全部運動健身"}</option>{sports.map((item) => <option key={item.id} value={item.id}>{item.label[locale]}</option>)}</select></div>}
          {filtered.length ? <><div className="listing-list">{filtered.slice(0, visibleCount).map((listing, index) => {
            const Icon = categoryIcons[listing.category];
            const name = listingName(listing, locale);
            return <article className="listing-row" key={listingName(listing, "en")}>
              <div className={`listing-icon icon-${listing.category}`}><VenueThumbnail src={covers[listingSlug(listing)]} fallbackSrc={venueFallbacks[listing.category]} fallback={<Icon size={32} strokeWidth={1.5} />} /></div>
              <div className="listing-main">
                <div className="listing-meta"><span>{listing.area[locale]}</span><i /><span>{listingCategories(listing).map((id) => categories.find((item) => item.id === id)?.label[locale]).join(" · ")}</span></div>
                <h3><Link href={`/${locale}/venues/${listingSlug(listing)}`}>{name}</Link></h3><p>{listing.description[locale]}</p>
                <div className="tag-row">{listing.tags[locale].map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
              <div className="listing-action"><Link href={`/${locale}/venues/${listingSlug(listing)}`} aria-label={`${t.view}: ${name}`}>{t.view}<ArrowUpRight size={17} /></Link></div>
            </article>;
          })}</div>{filtered.length > visibleCount && <div className="load-more"><button onClick={() => setVisibleCount((count) => count + 20)}>{t.showMore}<span>{Math.min(visibleCount, filtered.length)} / {filtered.length}</span><ArrowDown size={16} /></button></div>}</> : <div className="empty-state"><Search size={28} /><p>{t.noResults}</p><button onClick={clearFilters}>{t.clear}</button></div>}
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
