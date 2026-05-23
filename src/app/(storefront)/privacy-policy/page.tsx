import { LegalPageLayout } from "@/components/legal/LegalPageLayout";
import { privacyPolicyContent } from "@/lib/legal-content";

export const metadata = {
  title: "Privacy Policy | ABGOCHI",
  description: "How ABGOCHI collects and uses your information for orders and communication.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      title={privacyPolicyContent.title}
      updated={privacyPolicyContent.updated}
      intro={privacyPolicyContent.intro}
      sections={privacyPolicyContent.sections}
    />
  );
}
