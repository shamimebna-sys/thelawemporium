"use client";

import Link from "next/link";
import { useRef } from "react";
import { MediaFrame } from "@/components/media-frame";
import { pick } from "@/lib/locale";
import { t, type MessageKey } from "@/lib/messages";
import type { ContentItem, ContentKind, Locale } from "@/lib/types";

const kindPath: Record<ContentKind, string> = {
  story: "/stories",
  precedent: "/precedents",
  research: "/research",
  video: "/videos",
  print: "/media/print",
  electronic: "/media/electronic",
};

const kindLabel: Record<ContentKind, MessageKey> = {
  story: "kindStory",
  precedent: "kindPrecedent",
  research: "kindResearch",
  video: "kindVideo",
  print: "kindPrint",
  electronic: "kindElectronic",
};

export function FeaturedSlider({
  items,
  locale,
}: {
  items: ContentItem[];
  locale: Locale;
}) {
  const track = useRef<HTMLDivElement>(null);

  function scroll(dir: number) {
    const width = track.current?.clientWidth ?? 800;
    track.current?.scrollBy({ left: dir * (width * 0.8), behavior: "smooth" });
  }

  return (
    <section className="grey-band" aria-label={t(locale, "featured")}>
      <div className="slider-wrap">
        <div className="slider-shell">
          <button type="button" className="slider-btn slider-prev" onClick={() => scroll(-1)} aria-label={t(locale, "prev")}>
            <Chevron dir="prev" />
          </button>
          <div className="slider-track" ref={track}>
            {items.map((item) => (
              <article key={`${item.kind}-${item.slug}`} className="slide group">
                <Link href={`${kindPath[item.kind]}/${item.slug}`}>
                  <div className="video-wrap">
                    <MediaFrame
                      ratio="card"
                      seed={item.slug}
                      play={item.kind === "video" || item.kind === "electronic"}
                    />
                  </div>
                  <div className="slide-kind">{t(locale, kindLabel[item.kind])}</div>
                  <div className="slide-title transition-colors duration-300 ease-in-out group-hover:text-gold">
                    {pick(item.title, locale)}
                  </div>
                </Link>
              </article>
            ))}
          </div>
          <button type="button" className="slider-btn slider-next" onClick={() => scroll(1)} aria-label={t(locale, "next")}>
            <Chevron dir="next" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "prev" | "next" }) {
  const points = dir === "prev" ? "12,2 3,15 12,28" : "3,2 12,15 3,28";
  return (
    <svg viewBox="0 0 15 30" aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
