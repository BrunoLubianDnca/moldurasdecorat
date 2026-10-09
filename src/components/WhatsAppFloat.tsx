"use client";

import { WhatsAppBrandIcon } from "./BrandIcons";
import { createWhatsAppUrl } from "@/config/site";

export default function WhatsAppFloat() {
  return (
    <a
      href={createWhatsAppUrl("Olá! Gostaria de falar com a equipe da Decorat.")}
      target="_blank"
      rel="noopener noreferrer"
      id="btn-whatsapp-float"
      aria-label="Fale com a Decorat no WhatsApp"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 200,
        display: "inline-flex",
        alignItems: "center",
        gap: "0.6rem",
        backgroundColor: "#25d366",
        color: "#ffffff",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "0.78rem",
        fontWeight: 700,
        textDecoration: "none",
        padding: "0.7rem 1.2rem 0.7rem 0.9rem",
        borderRadius: "50px",
        boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
        transition: "all 0.25s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.backgroundColor = "#1eb358";
        el.style.boxShadow = "0 6px 28px rgba(37,211,102,0.55)";
        el.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.backgroundColor = "#25d366";
        el.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)";
        el.style.transform = "translateY(0)";
      }}
    >
      <WhatsAppBrandIcon />
      Fale com a Decorat
    </a>
  );
}
