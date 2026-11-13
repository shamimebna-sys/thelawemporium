import { t, type MessageKey } from "@/lib/messages";
import type { Locale } from "@/lib/types";

export function PageTitle({
  locale,
  label,
  text,
}: {
  locale: Locale;
  label?: MessageKey;
  text?: string;
}) {
  return (
    <div className="page-title-band">
      <div className="compact">
        <h1 className="page-title transition-colors duration-300 ease-in-out hover:text-gold">
          {text ?? (label ? t(locale, label) : "")}
        </h1>
      </div>
    </div>
  );
}
