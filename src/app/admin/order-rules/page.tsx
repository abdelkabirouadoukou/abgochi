import Link from "next/link";
import {
  CUSTOM_ORDER_NOTE,
  ORDER_AGREEMENT_CHECKBOX,
  ORDER_AGREEMENT_SHORT,
  TERMS_SUMMARY,
} from "@/lib/order-rules";
import { privacyPolicyContent, termsOfUseContent } from "@/lib/legal-content";

export const dynamic = "force-dynamic";

export default function AdminOrderRulesPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div>
        <h1 className="text-3xl text-white">Règles de commande</h1>
        <p className="mt-2 text-lg text-white/50">
          Texte affiché sur le site et dans WhatsApp. Pour modifier, éditez les fichiers
          indiqués ci-dessous.
        </p>
      </div>

      <div className="admin-card space-y-4">
        <h2 className="text-xl text-accent">Fichiers à modifier</h2>
        <ul className="space-y-2 text-white/70">
          <li>
            <code className="text-accent">src/lib/order-rules.ts</code> — case à cocher,
            messages WhatsApp
          </li>
          <li>
            <code className="text-accent">src/lib/legal-content.ts</code> — pages légales
          </li>
        </ul>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="/terms-of-use" className="btn-ghost py-3 text-sm" target="_blank">
            Voir Conditions
          </Link>
          <Link href="/privacy-policy" className="btn-ghost py-3 text-sm" target="_blank">
            Voir Confidentialité
          </Link>
        </div>
      </div>

      <PreviewBlock title="Case à cocher (commande)" text={ORDER_AGREEMENT_CHECKBOX} />
      <PreviewBlock title="Rappel court (modal)" text={ORDER_AGREEMENT_SHORT} />
      <PreviewBlock title="Note WhatsApp" text={CUSTOM_ORDER_NOTE} />

      <div className="admin-card space-y-4">
        <h2 className="text-xl text-white">Résumé des conditions</h2>
        {Object.entries(TERMS_SUMMARY).map(([key, text]) => (
          <div key={key}>
            <p className="text-sm uppercase tracking-widest text-accent">{key}</p>
            <p className="mt-1 text-white/60">{text}</p>
          </div>
        ))}
      </div>

      <div className="admin-card space-y-2">
        <h2 className="text-xl text-white">Pages légales</h2>
        <p className="text-white/50">
          {privacyPolicyContent.sections.length} sections confidentialité ·{" "}
          {termsOfUseContent.sections.length} sections conditions
        </p>
      </div>
    </div>
  );
}

function PreviewBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="admin-card space-y-3">
      <h2 className="text-lg text-white">{title}</h2>
      <p className="whitespace-pre-line text-base leading-relaxed text-white/60">{text}</p>
    </div>
  );
}
