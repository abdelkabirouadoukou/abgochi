import { FadeIn } from "./FadeIn";

type SectionHeadingProps = {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <FadeIn className={`max-w-3xl ${alignment}`}>
      <p className="mb-4 text-[10px] uppercase tracking-[0.42em] text-muted">
        {label}
      </p>
      <h2 className="font-display text-4xl font-light leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </FadeIn>
  );
}
