"use client";

import { useState } from "react";

interface AdvocateImageProps {
  src?: string | null;
  name: string;
  designation?: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
}

/**
 * Extracts dignified initials from an advocate's name,
 * filtering common honorifics (Md., Most., Barrister, Advocate, Dr.).
 */
function getInitials(name: string): string {
  const clean = name
    .replace(/^(Md\.?|Most\.?|Dr\.?|Barrister|Advocate)\s+/i, "")
    .trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  const fallback = name.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase();
  return fallback || "LE";
}

export function AdvocateImage({
  src,
  name,
  designation,
  className = "",
  priority = false,
  objectPosition = "top center",
}: AdvocateImageProps) {
  const [prevSrc, setPrevSrc] = useState(src);
  const [error, setError] = useState(false);

  // Sync state during render when prop changes
  if (src !== prevSrc) {
    setPrevSrc(src);
    setError(false);
  }

  const initials = getInitials(name);

  if (src && !error) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${className}`}
        style={{ objectPosition }}
        onError={() => setError(true)}
      />
    );
  }

  // Dignified chambers fallback graphic filling the frame completely
  return (
    <div
      className={`absolute inset-0 w-full h-full flex flex-col items-center justify-center p-4 sm:p-6 select-none bg-gradient-to-br from-[#0c141f] via-[#141e2b] to-[#1c293a] text-center overflow-hidden ${className}`}
      role="img"
      aria-label={`${name} - ${designation || "Advocate"}`}
    >
      {/* Decorative Gold Inset Border */}
      <div className="absolute inset-2 sm:inset-3 border border-gold/20 rounded pointer-events-none" />

      {/* Decorative Scales of Justice Silhouette */}
      <svg
        className="w-7 h-7 sm:w-8 sm:h-8 text-gold/60 mb-2 drop-shadow"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
        <path d="M7 21h10" />
        <path d="M12 3v18" />
        <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      </svg>

      {/* Initials Crest Badge */}
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-gold/40 flex items-center justify-center bg-black/40 shadow-inner my-1">
        <span className="font-serif text-base sm:text-xl font-bold tracking-wider text-gold">
          {initials}
        </span>
      </div>

      {/* Advocate Name */}
      <span className="mt-2 text-xs sm:text-sm font-semibold tracking-wide text-neutral-100 line-clamp-1 max-w-[90%]">
        {name}
      </span>

      {/* Designation */}
      {designation ? (
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-gold/80 line-clamp-1 max-w-[85%] mt-0.5">
          {designation}
        </span>
      ) : null}
    </div>
  );
}
