import React, { useEffect } from "react";
import emailjs from "@emailjs/browser";
import { type CartProduct } from "../type/Product";

interface EmailServiceProps {
  customerName: string;
  customerEmail: string;
  cartItems: CartProduct[];
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

    // Build HTML string for cart items
    const cartItemsPreview = cartItems
      .map(
        (item) =>
          `<tr>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${
          item.title
        }</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${item.price.toFixed(
          2
        )}</td>
        <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${
          item.quantity
        }</td>
      </tr>`
      )
      .join("");
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
      .then(() => console.log("Email sent successfully!"))
      .catch((err) => console.error("Failed to send email:", err));
  }, [customerName, customerEmail, cartItems, total]);

  return null;
};

export default EmailService;
