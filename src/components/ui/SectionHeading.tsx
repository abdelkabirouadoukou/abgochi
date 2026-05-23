import { FadeIn } from "./FadeIn";
import { Label } from "./Label";

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
  const alignment = align === "center" ? "text-center mx-auto items-center" : "text-left";

  return (
    <FadeIn className={`max-w-3xl ${alignment}`}>
      <Label centered={align === "center"} className={align === "center" ? "mb-6" : "mb-5"}>
        {label}
      </Label>
      <h2 className="headline-display text-4xl text-white sm:text-5xl md:text-[3.5rem] md:leading-[1.06]">
        {title}
      </h2>
      {description ? (
        <p className="body-luxury mt-6 max-w-2xl text-base md:text-[1.0625rem]">
          {description}
        </p>
      ) : null}
    </FadeIn>
  );
}
