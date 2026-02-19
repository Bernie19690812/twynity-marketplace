import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface JourneyCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export function JourneyCard({
  icon: Icon,
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: JourneyCardProps) {
  return (
    <article className="flex flex-col gap-6 rounded-2xl bg-cyan-tint p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy">
        <Icon className="h-6 w-6 text-cyan" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold text-navy">{title}</h2>
        <p className="text-base font-normal text-navy/70 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-auto">
        <Link
          href={primaryHref}
          className="inline-flex items-center justify-center rounded-lg bg-royal px-6 py-3 text-base font-medium text-white transition-colors duration-150 hover:bg-[#006690] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
        >
          {primaryLabel}
        </Link>
        <Link
          href={secondaryHref}
          className="inline-flex items-center justify-center rounded-lg border border-royal px-6 py-3 text-base font-medium text-royal bg-transparent transition-colors duration-150 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-royal"
        >
          {secondaryLabel}
        </Link>
      </div>
    </article>
  );
}
