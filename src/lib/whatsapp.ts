import { siteConfig } from "./config";

export type OrderFormData = {
  fullName: string;
  city: string;
  quantity: number;
  message?: string;
};

export function buildOrderMessage(productName: string, data: OrderFormData) {
  const note = data.message?.trim() ? data.message.trim() : "—";

  return `Hello ABGOCHI,

I would like to order:

Product: ${productName}
Quantity: ${data.quantity}
Name: ${data.fullName}
City: ${data.city}
Note: ${note}

Please confirm availability. Thank you.`;
}

export function whatsappOrderUrl(productName: string, data: OrderFormData) {
  const text = buildOrderMessage(productName, data);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function whatsappContactUrl(text = "Hello ABGOCHI, I have a question.") {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
