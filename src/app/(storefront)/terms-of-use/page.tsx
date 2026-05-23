import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { termsOfUseContent } from "@/lib/legal-content";

export const metadata = {
  title: "Terms of Use | ABGOCHI",
  description: "Terms for handmade custom orders at ABGOCHI.",
};

export default function TermsOfUsePage() {
  return (
    <LegalPageLayout
      title={termsOfUseContent.title}
      updated={termsOfUseContent.updated}
      intro={termsOfUseContent.intro}
      sections={termsOfUseContent.sections}
    />
  );
}
