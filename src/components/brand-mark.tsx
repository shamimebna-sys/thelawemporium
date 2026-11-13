export function BrandMark({ className = "" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static brand asset, sized by CSS
    <img
      className={className}
      src="/images/the-law-emporium-logo-transparent.png"
      alt=""
      aria-hidden="true"
    />
  );
}
