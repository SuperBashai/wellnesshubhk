"use client";

import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";

type HeaderDropdownItem = {
  href: string;
  label: string;
  description: string;
};

export function HeaderDropdown({ label, ariaLabel, items }: { label: string; ariaLabel: string; items: HeaderDropdownItem[] }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (!detailsRef.current?.contains(event.target as Node)) detailsRef.current?.removeAttribute("open");
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        detailsRef.current?.removeAttribute("open");
        detailsRef.current?.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <details className="header-dropdown" ref={detailsRef}>
      <summary>{label}<ChevronDown size={14} aria-hidden="true" /></summary>
      <div className="header-dropdown-panel" aria-label={ariaLabel}>
        {items.map((item) => (
          <Link href={item.href} key={item.href} onClick={() => detailsRef.current?.removeAttribute("open")}>
            <span><strong>{item.label}</strong><small>{item.description}</small></span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </details>
  );
}
