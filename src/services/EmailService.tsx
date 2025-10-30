import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";

interface CartItem {
  title: string;
  price: number;
  quantity: number;
}

interface EmailServiceProps {
  customerName: string;
  customerEmail: string;
  cartItems: CartItem[];
  total: number;
}

const EmailService: React.FC<EmailServiceProps> = ({
  customerName,
  customerEmail,
  cartItems,
  total,
}) => {
  useEffect(() => {
    if (!customerEmail || cartItems.length === 0) return;

    // Flatten cart items into a string suitable for EmailJS
    const cartItemsPreview = cartItems
      .map(
        (item) => `${item.title} | $${item.price.toFixed(2)} | ${item.quantity}`
      )
      .join("\n");

    const templateParams = {
      to_name: customerName,
      to_email: customerEmail,
      cart_items_preview: cartItemsPreview,
      total: total.toFixed(2),
    };

    emailjs
      .send(
        "service_2942wfp",
        "template_pqu93it",
        templateParams,
        "Yz6eYBhmSsLR84IUh"
      )
      .then(() => {
        console.log("Email sent successfully!");
      })
      .catch((err) => {
        console.error("Failed to send email:", err);
      });
  }, [customerName, customerEmail, cartItems, total]);

  return null;
};

export default EmailService;
