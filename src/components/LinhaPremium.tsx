"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const PETROL = "#153746";
const ORANGE = "#F56510";

const produtos = [
  { id: "MI001", codigo: "MI00145", categoria: "Molduras Internas", tipo: "Moldura Interna" },
  { id: "ME004", codigo: "ME00445", categoria: "Molduras Externas", tipo: "Moldura Externa" },
  { id: "ME008", codigo: "ME00845", categoria: "Molduras Externas", tipo: "Moldura Externa" },
  { id: "FE002", codigo: "FE00215", categoria: "Filetes Externos",  tipo: "Filete Externo"  },
  { id: "ME009", codigo: "ME00945", categoria: "Molduras Externas", tipo: "Moldura Externa" },
  { id: "PL001", codigo: "PL00180", categoria: "Pilares",           tipo: "Pilar"           },
  { id: "GJ003", codigo: "GJ00330", categoria: "Guarnições",        tipo: "Guarnição"       },
  { id: "PC001", codigo: "PC00100", categoria: "Personalizadas",    tipo: "Personalizada"   },
];

const VISIBLE = 4;

function MoldingSVG({ tipo }: { tipo: string }) {
  if (tipo.includes("Filete"))
    return (
      <svg width="96" height="44" viewBox="0 0 96 44" fill="none">
        <rect x="0" y="16" width="96" height="18" fill="#1a1a1a" rx="2" />
        <rect x="4" y="10" width="88" height="8" fill="#2a2a2a" rx="1" />
        <rect x="10" y="7"  width="76" height="5" fill="#333"   rx="1" />
      </svg>
    );
  if (tipo.includes("Pilar"))
    return (
      <svg width="54" height="100" viewBox="0 0 54 100" fill="none">
        <rect x="4"  y="0"  width="46" height="10" fill="#2a2a2a" rx="2" />
        <rect x="11" y="10" width="32" height="80" fill="#1a1a1a" rx="1" />
        <rect x="7"  y="9"  width="40" height="3"  fill="#333"   />
        <rect x="4"  y="90" width="46" height="10" fill="#2a2a2a" rx="2" />
      </svg>
    );
  if (tipo.includes("Guarnição"))
    return (
      <svg width="88" height="66" viewBox="0 0 88 66" fill="none">
        <rect x="0"  y="24" width="88" height="18" fill="#1a1a1a" rx="2" />
        <rect x="4"  y="10" width="80" height="16" fill="#222"   rx="2" />
        <rect x="10" y="4"  width="68" height="8"  fill="#2a2a2a" rx="2" />
        <rect x="0"  y="40" width="88" height="10" fill="#222"   rx="2" />
      </svg>
    );
  // default (internal / external molding)
  return (
    <svg width="96" height="66" viewBox="0 0 96 66" fill="none">
      <rect x="0"  y="30" width="96" height="28" fill="#1a1a1a" rx="2" />
      <rect x="5"  y="18" width="86" height="14" fill="#222"   rx="2" />
      <rect x="10" y="8"  width="76" height="12" fill="#2a2a2a" rx="2" />
      <rect x="20" y="0"  width="56" height="10" fill="#333"   rx="2" />
    </svg>
  );
}

export default function LinhaPremium() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(produtos.length - VISIBLE, i + 1));
  const visible = produtos.slice(idx, idx + VISIBLE);

  return (
    <section
      id="premium"
      style={{ backgroundColor: "#ffffff", padding: "5rem 0" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "3rem",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: ORANGE,
                marginBottom: "0.5rem",
              }}
            >
              Peças Premium
            </p>
            <h2
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(1.7rem, 3.5vw, 2.5rem)",
                fontWeight: 800,
                color: PETROL,
                lineHeight: 1.2,
                maxWidth: "520px",
              }}
            >
              Soluções selecionadas para o seu projeto
            </h2>
          </div>

          <a
            href="#contato"
            id="btn-ver-catalogo"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              border: `2px solid ${PETROL}`,
              color: PETROL,
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.76rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "0.7rem 1.4rem",
              borderRadius: "4px",
              flexShrink: 0,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = PETROL;
              el.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.color = PETROL;
            }}
          >
            Ver todo o catálogo <ArrowRight size={14} />
          </a>
        </div>

        {/* Carousel */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "1rem" }}
        >
          <button
            onClick={prev}
            disabled={idx === 0}
            aria-label="Produto anterior"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "4px",
              backgroundColor: ORANGE,
              border: "none",
              cursor: idx === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              opacity: idx === 0 ? 0.35 : 1,
              transition: "opacity 0.2s",
              color: "#ffffff",
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.25rem",
            }}
            className="prod-cards"
          >
            {visible.map((prod) => (
              <div
                key={prod.id}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2dfd9",
                  borderRadius: "8px",
                  overflow: "hidden",
                  transition: "box-shadow 0.25s, transform 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
                  el.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "none";
                  el.style.transform = "translateY(0)";
                }}
              >
                <div style={{ padding: "0.65rem 1rem 0" }}>
                  <span
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                      fontSize: "0.62rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      color: "#9a968f",
                    }}
                  >
                    {prod.categoria}
                  </span>
                </div>

                <div
                  style={{
                    height: "136px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f4f1",
                    margin: "0.5rem 1rem",
                    borderRadius: "6px",
                  }}
                >
                  <MoldingSVG tipo={prod.tipo} />
                </div>

                <div style={{ padding: "0.5rem 1rem 1.25rem" }}>
                  <h3
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: PETROL,
                      lineHeight: 1.2,
                    }}
                  >
                    {prod.id}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                      fontSize: "0.73rem",
                      fontWeight: 600,
                      color: ORANGE,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {prod.codigo}
                  </p>
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "#f0ede8",
                      marginBottom: "0.75rem",
                    }}
                  />
                  <a
                    href="#contato"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontFamily: "Open Sans, sans-serif",
                      fontSize: "0.76rem",
                      fontWeight: 700,
                      color: PETROL,
                      textDecoration: "none",
                      transition: "color 0.2s, gap 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = ORANGE;
                      el.style.gap = "0.55rem";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.color = PETROL;
                      el.style.gap = "0.3rem";
                    }}
                  >
                    Ver detalhes <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={next}
            disabled={idx >= produtos.length - VISIBLE}
            aria-label="Próximo produto"
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "4px",
              backgroundColor: ORANGE,
              border: "none",
              cursor: idx >= produtos.length - VISIBLE ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              opacity: idx >= produtos.length - VISIBLE ? 0.35 : 1,
              transition: "opacity 0.2s",
              color: "#ffffff",
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .prod-cards { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 768px)  { .prod-cards { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px)  { .prod-cards { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
