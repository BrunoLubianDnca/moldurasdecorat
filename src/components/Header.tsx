"use client";

import { useState } from "react";
import { Instagram, Menu, X, Send } from "lucide-react";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Quem somos", href: "#quem-somos" },
  { label: "Catálogo", href: "#catalogo" },
  { label: "Contato", href: "#contato" },
];

const PETROL = "#153746";
const ORANGE = "#F56510";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{
        backgroundColor: ORANGE,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* ── Logo ── */}
        <a
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: "38px",
              height: "38px",
              backgroundColor: "#ffffff",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {/* "D" lettermark */}
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1.25rem",
                fontWeight: 900,
                color: PETROL,
                lineHeight: 1,
                letterSpacing: "-0.04em",
              }}
            >
              D
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "1.05rem",
                fontWeight: 800,
                color: "#ffffff",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Decorat
            </span>
            <span
              style={{
                fontFamily: "Open Sans, sans-serif",
                fontSize: "0.52rem",
                fontWeight: 400,
                color: "rgba(255,255,255,0.8)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Molduras em EPS
            </span>
          </div>
        </a>

        {/* ── Desktop Nav ── */}
        <nav
          style={{ display: "flex", alignItems: "center", gap: "2rem" }}
          className="hdr-nav"
        >
          {NAV.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "none",
                letterSpacing: "0.01em",
                opacity: 1,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.opacity = "0.75")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.opacity = "1")
              }
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── Right ── */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
          className="hdr-right"
        >
          <a
            href="https://www.instagram.com/decorat.molduras/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @decorat.molduras"
            style={{
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              opacity: 0.9,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "1")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.9")
            }
          >
            <Instagram size={20} />
          </a>

          <a
            href="#contato"
            id="btn-enviar-projeto"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              backgroundColor: "#ffffff",
              color: PETROL,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
              textDecoration: "none",
              padding: "0.5rem 1.1rem",
              borderRadius: "4px",
              border: "2px solid #ffffff",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "#ffffff";
              el.style.color = PETROL;
            }}
          >
            <Send size={13} />
            Enviar projeto
          </a>
        </div>

        {/* ── Mobile ── */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          style={{
            display: "none",
            color: "#ffffff",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          className="hdr-ham"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div
          style={{
            backgroundColor: "#d45208",
            borderTop: "1px solid rgba(255,255,255,0.15)",
            padding: "1rem 1.5rem 1.5rem",
          }}
        >
          {NAV.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#ffffff",
                textDecoration: "none",
                padding: "0.75rem 0",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            style={{
              display: "block",
              backgroundColor: "#ffffff",
              color: PETROL,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              textDecoration: "none",
              textAlign: "center",
              padding: "0.75rem",
              borderRadius: "4px",
              marginTop: "1rem",
            }}
          >
            Enviar projeto
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hdr-nav  { display: none !important; }
          .hdr-right { display: none !important; }
          .hdr-ham  { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
