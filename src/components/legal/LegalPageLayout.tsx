import Link from "next/link";
import type { LegalSection } from "@/lib/legal-content";
import { siteConfig } from "@/lib/config";

type LegalPageLayoutProps = {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
};

export function LegalPageLayout({
  title,
  updated,
  intro,
  sections,
}: LegalPageLayoutProps) {
  return (
    <article className="landing-page bg-[#050505] pt-28 pb-24 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-3xl px-6 md:px-12">
        <Link
          href="/"
          className="text-sm text-white/45 transition hover:text-[#c9b896]"
        >
          ← Back to home
        </Link>

        <p className="mt-10 text-[11px] uppercase tracking-[0.4em] text-[#c9b896]">
          {siteConfig.brand}
        </p>
        <h1 className="mt-4 font-serif text-4xl text-[#f4f1ea] md:text-5xl">{title}</h1>
        <p className="mt-3 text-sm text-white/35">{updated}</p>
        <p className="mt-8 text-lg leading-relaxed text-white/55">{intro}</p>

        <div className="mt-14 space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="font-serif text-2xl text-[#f4f1ea] md:text-3xl">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-base leading-[1.75] text-white/50">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="footer-divider mt-16" />
        <p className="mt-8 text-sm text-white/40">
          <Link href="/terms-of-use" className="underline-offset-4 hover:text-[#c9b896] hover:underline">
            Terms of Use
          </Link>
          {" · "}
          <Link href="/privacy-policy" className="underline-offset-4 hover:text-[#c9b896] hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </article>
  );
}
