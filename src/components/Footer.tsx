"use client";

import { Instagram, Facebook, Youtube } from "lucide-react";

const PETROL_DARK = "#0e2530";
const ORANGE  = "#F56510";

const links = {
  Produtos: [
    "Molduras Internas",
    "Molduras Externas",
    "Filetes e Boiseries",
    "Pilares Decorativos",
    "Personalizadas",
  ],
  Empresa: [
    "Quem somos",
    "Nossa fábrica",
    "Como funciona",
    "Depoimentos",
  ],
  Suporte: [
    "Solicitar orçamento",
    "Guia de instalação",
    "FAQ",
    "Política de troca",
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: PETROL_DARK }}>
      {/* Main */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 2rem 2.5rem",
          display: "grid",
          gridTemplateColumns: "1.8fr 1fr 1fr 1fr",
          gap: "3rem",
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.65rem",
              marginBottom: "1.25rem",
            }}
          >
            <div
              style={{
                width: "38px",
                height: "38px",
                backgroundColor: ORANGE,
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  color: "#ffffff",
                  lineHeight: 1,
                }}
              >
                D
              </span>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Decorat
              </p>
              <p
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "0.52rem",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Molduras em EPS
              </p>
            </div>
          </div>

          <p
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "0.82rem",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(255,255,255,0.4)",
              maxWidth: "270px",
              marginBottom: "0.75rem",
            }}
          >
            Fabricação e instalação de molduras em EPS internas e externas personalizadas.
            Campo Grande, MS.
          </p>

          <p
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)",
              marginBottom: "1.5rem",
            }}
          >
            Rua Pintassilgo, 232 · Campo Grande-MS<br />
            CEP 79013-790
          </p>

          {/* Social */}
          <div style={{ display: "flex", gap: "0.6rem" }}>
            {[
              {
                Icon: Instagram,
                label: "Instagram",
                href: "https://www.instagram.com/decorat.molduras/",
              },
              { Icon: Facebook, label: "Facebook",  href: "#" },
              { Icon: Youtube,  label: "YouTube",   href: "#" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href !== "#" ? "_blank" : undefined}
                rel={href !== "#" ? "noopener noreferrer" : undefined}
                aria-label={label}
                style={{
                  width: "36px",
                  height: "36px",
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = ORANGE;
                  el.style.color = "#ffffff";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "rgba(255,255,255,0.07)";
                  el.style.color = "rgba(255,255,255,0.45)";
                }}
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(links).map(([section, items]) => (
          <div key={section}>
            <h4
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: ORANGE,
                marginBottom: "1.25rem",
              }}
            >
              {section}
            </h4>
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "0.65rem",
              }}
            >
              {items.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 400,
                      color: "rgba(255,255,255,0.35)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#ffffff")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.35)")
                    }
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.25rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <p
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: "0.7rem",
            color: "rgba(255,255,255,0.18)",
          }}
        >
          © {new Date().getFullYear()} Decorat Molduras · Campo Grande, MS · Todos os direitos reservados.
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["Privacidade", "Termos de uso"].map((l) => (
            <a
              key={l}
              href="#"
              style={{
                fontFamily: "Open Sans, sans-serif",
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.18)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.5)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.18)")
              }
            >
              {l}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 2rem !important; }
        }
        @media (max-width: 520px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
