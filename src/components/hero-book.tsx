export function HeroBook({ alt }: { alt: string }) {
  return (
    <div className="hero-book">
      {/* Native img keeps aspect ratio and absolute layout predictable. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/hero-book.png" alt={alt} width={600} height={400} />
    </div>
  );
}
