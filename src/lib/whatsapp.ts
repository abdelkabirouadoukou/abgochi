import { siteConfig } from "./data";

export function whatsappUrl(message: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function productInquiryMessage(productName: string) {
  return `Hello Atelier Mohammed, I would like to inquire about "${productName}".`;
}

export function customOrderMessage() {
  return "Hello Atelier Mohammed, I would like to request a custom handcrafted piece.";
}
