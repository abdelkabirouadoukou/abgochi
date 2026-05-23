"use client";

import { memo } from "react";
import { PremiumImage } from "@/components/ui/PremiumImage";
import { craftSteps } from "@/lib/config";

type LandingProcessProps = {
  stepImages: string[];
};

const ProcessStep = memo(function ProcessStep({
  item,
  image,
  index,
}: {
  item: (typeof craftSteps)[number];
  image?: string;
  index: number;
}) {
  const reversed = index % 2 === 1;

  return (
    <section
      className={`grid min-h-0 items-center gap-10 py-16 md:grid-cols-2 md:gap-16 md:py-24 ${
        reversed ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      <div className="reveal-on-scroll relative">
        <div className="landing-image-frame relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
          {image ? (
            <PremiumImage
              src={image}
              alt={item.title}
              sizes="(max-width: 768px) 100vw, 50vw"
              wrapperClassName="absolute inset-0 h-full w-full"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[280px] items-end bg-gradient-to-t from-[#12100e] to-[#050505] p-8">
              <span className="font-serif text-6xl text-white/[0.06]">{item.step}</span>
            </div>
          )}
          <div className="landing-image-vignette pointer-events-none absolute inset-0" />
        </div>
        <span className="absolute -left-2 top-6 font-serif text-7xl text-white/[0.04] md:-left-8 md:text-8xl">
          {item.step}
        </span>
      </div>

      <div className="reveal-on-scroll">
        <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9b896]">
          Step {item.step}
        </p>
        <h3 className="mt-4 font-serif text-3xl text-[#f4f1ea] md:text-4xl">
          {item.title}
        </h3>
        <p className="mt-6 max-w-md text-lg leading-[1.75] text-white/50">
          {item.text}
        </p>
      </div>
    </section>
  );
});

export function LandingProcess({ stepImages }: LandingProcessProps) {
  return (
    <section id="process" className="scroll-mt-24 border-t border-white/[0.06] bg-[#060606]">
      <div className="mx-auto max-w-[90rem] px-6 md:px-12">
        <div className="reveal-on-scroll pt-24 md:pt-32">
          <p className="text-[11px] uppercase tracking-[0.4em] text-[#c9b896]">Process</p>
          <h2 className="mt-4 max-w-2xl font-serif text-4xl text-[#f4f1ea] md:text-5xl">
            A craft journey in three quiet steps
          </h2>
        </div>

        <div className="mt-8 divide-y divide-white/[0.06]">
          {craftSteps.map((item, i) => (
            <ProcessStep
              key={item.step}
              item={item}
              image={stepImages[i]}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
