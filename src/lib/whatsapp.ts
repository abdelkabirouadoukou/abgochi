import { CUSTOM_ORDER_NOTE } from "@/lib/order-rules";
import { siteConfig } from "./config";

export type OrderFormData = {
  fullName: string;
  city: string;
  quantity: number;
  message?: string;
};

export type OrderMessageOptions = {
  productName: string;
  productUrl: string;
  data: OrderFormData;
  mode: "in_stock" | "made_to_order";
};

export function buildOrderMessage({
  productName,
  productUrl,
  data,
  mode,
}: OrderMessageOptions) {
  const note = data.message?.trim() ? data.message.trim() : "—";

  const lines = [
    "Hello ABGOCHI 👋",
    "",
    "I want to order this product:",
    "",
    `Product: ${productName}`,
    `Link: ${productUrl}`,
    `Quantity: ${data.quantity}`,
    `Name: ${data.fullName}`,
    `City: ${data.city}`,
    `Message: ${note}`,
  ];

  if (mode === "made_to_order") {
    lines.push(
      "",
      "This product is out of stock, but I want to order it as a handmade custom piece if possible.",
      "Please confirm if the materials are available."
    );
  } else {
    lines.push("", "Please confirm availability. Thank you.");
  }

  lines.push("", CUSTOM_ORDER_NOTE);

  return lines.join("\n");
}

export function whatsappOrderUrl(options: OrderMessageOptions) {
  const text = buildOrderMessage(options);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function whatsappContactUrl(text = "Hello ABGOCHI, I have a question.") {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
