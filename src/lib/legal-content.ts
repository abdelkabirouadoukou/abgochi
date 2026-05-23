import { siteConfig } from "@/lib/config";
import { TERMS_SUMMARY } from "@/lib/order-rules";

export type LegalSection = {
  title: string;
  paragraphs: string[];
};

const brand = siteConfig.brand;
const artisan = siteConfig.artisanDisplayName;

export const privacyPolicyContent = {
  title: "Privacy Policy",
  updated: "Last updated: 2026",
  intro: `${brand} respects your privacy. This page explains what we collect, why we collect it, and how your information is used — only for orders and communication.`,
  sections: [
    {
      title: "What we collect",
      paragraphs: [
        "When you contact us or place an order request, we may collect: your name, city, phone number (if you share it on WhatsApp), product interest, quantity, and any message you write.",
        "If you become a registered client in our workshop system, we may also store order notes, deadlines, and files you or we attach for your project.",
      ],
    },
    {
      title: "Why we collect it",
      paragraphs: [
        "We use this information only to handle your order, answer questions, and communicate about handmade pieces made by " +
          artisan +
          ".",
        "We do not sell your data. We do not use it for unrelated marketing.",
      ],
    },
    {
      title: "Contact form & WhatsApp orders",
      paragraphs: [
        "When you submit an order request through our website form, the details are saved in our private admin dashboard so we can follow up.",
        "When you continue to WhatsApp, you send a message directly to us. WhatsApp has its own privacy policy — please review it on their website.",
      ],
    },
    {
      title: "How data is stored",
      paragraphs: [
        "Order and client information is stored securely in our database (hosted cloud provider). Files uploaded for a client project are stored via our file hosting service and linked only to that client record.",
        "Access is limited to authorised admin users who manage the workshop.",
      ],
    },
    {
      title: "How long we keep data",
      paragraphs: [
        "We keep client and order records as long as needed to complete your request and for reasonable workshop records. You may ask us to update or remove your contact details by messaging us on WhatsApp or email.",
      ],
    },
    {
      title: "Your rights",
      paragraphs: [
        "You can ask what information we hold about you, request correction, or ask us to stop contacting you. We will respond in a reasonable time.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        `Questions about privacy: contact ${brand} via WhatsApp or ${siteConfig.email}.`,
      ],
    },
  ] satisfies LegalSection[],
};

export const termsOfUseContent = {
  title: "Terms of Use",
  updated: "Last updated: 2026",
  intro: `These terms apply when you browse ${brand} or request a handmade bag. They are written in plain language so you know what to expect from a small artisan workshop.`,
  sections: [
    {
      title: "Handmade custom orders",
      paragraphs: [
        "Every piece is made by hand in Morocco. When you request a product — especially one shown as available to make on order — you agree that this is a custom handmade process, not mass production.",
        TERMS_SUMMARY.productionTime,
        "You will be informed when your piece is ready. There is no guaranteed delivery date.",
      ],
    },
    {
      title: "Payment before production",
      paragraphs: [
        TERMS_SUMMARY.payment,
        "Until payment is received and your order is accepted, production does not begin.",
      ],
    },
    {
      title: "Materials & capacity",
      paragraphs: [
        TERMS_SUMMARY.materials,
        "If a product is marked unavailable, we cannot accept that request at this time.",
      ],
    },
    {
      title: "Photos & natural variation",
      paragraphs: [
        TERMS_SUMMARY.variation,
        "Colors and textures can look slightly different in person because of fabric batches and workshop lighting.",
      ],
    },
    {
      title: "Prices & communication",
      paragraphs: [
        "Prices shown on the website are in Moroccan dirhams (MAD) unless stated otherwise. Final confirmation happens on WhatsApp.",
        "Please provide accurate contact details so we can reach you about your order.",
      ],
    },
    {
      title: "Website use",
      paragraphs: [
        "You may browse our site for personal use. Do not misuse the site, attempt to access admin areas, or copy content without permission.",
      ],
    },
    {
      title: "Changes",
      paragraphs: [
        "We may update these terms occasionally. Continued use of the site or placing a new request means you accept the current version.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        `Questions: reach ${brand} / ${artisan} via WhatsApp or ${siteConfig.email}.`,
      ],
    },
  ] satisfies LegalSection[],
};
