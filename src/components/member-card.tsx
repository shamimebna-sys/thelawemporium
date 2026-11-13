import Link from "next/link";
import { MediaFrame } from "@/components/media-frame";
import { pick } from "@/lib/locale";
import type { Locale, Member } from "@/lib/types";

export function MemberCard({ member, locale }: { member: Member; locale: Locale }) {
  return (
    <article className="member-card group">
      <Link href={`/members/${member.slug}`}>
        <MediaFrame ratio="square" seed={member.slug} />
        <h3 className="member-name transition-colors duration-300 ease-in-out group-hover:text-gold">
          {pick(member.name, locale)}
        </h3>
        <p>{pick(member.summary, locale)}</p>
      </Link>
    </article>
  );
}
