"use client";

import { Package, Truck, HeadphonesIcon } from "lucide-react";

const PETROL = "#153746";
const ORANGE = "#F56510";

const diferenciais = [
  { Icon: Package, label: "Fabricação própria" },
  { Icon: Truck, label: "Envio para todo o Brasil" },
  { Icon: HeadphonesIcon, label: "Atendimento humanizado" },
];

const thumbLabels = ["Interna", "Externa", "Personalizada"];

export default function Hero() {
  return (
    <section id="home" style={{ paddingTop: "64px" }}>
      {/* ── Main hero ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          minHeight: "480px",
          maxHeight: "560px",
          position: "relative",
        }}
        className="hero-main"
      >
        {/* LEFT: photo placeholder */}
        <div
          style={{
            position: "relative",
            background: "linear-gradient(135deg, #b8c8d4 0%, #8aa8bc 40%, #6b90a8 100%)",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Small logo mark top-left */}
          <div
            style={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              zIndex: 2,
              backgroundColor: "rgba(255,255,255,0.92)",
              borderRadius: "4px",
              padding: "0.4rem 0.6rem",
              display: "flex",
              alignItems: "center",
              gap: "0.35rem",
            }}
          >
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 800,
                color: PETROL,
                letterSpacing: "0.04em",
              }}
            >
              DECORAT
            </span>
          </div>

          {/* House silhouette */}
          <svg
            width="200"
            height="150"
            viewBox="0 0 200 150"
            fill="none"
            opacity={0.35}
          >
            <rect x="20" y="80" width="160" height="65" fill="white" rx="3" />
            <polygon points="100,15 10,85 190,85" fill="white" opacity="0.9" />
            {/* Windows */}
            <rect x="40" y="95" width="35" height="28" fill="#6b90a8" rx="2" />
            <rect x="125" y="95" width="35" height="28" fill="#6b90a8" rx="2" />
            {/* Door */}
            <rect x="78" y="108" width="28" height="37" fill="#5a7e94" />
            {/* Pillar hints */}
            <rect x="22" y="80" width="6" height="65" fill="#e0e8f0" />
            <rect x="172" y="80" width="6" height="65" fill="#e0e8f0" />
          </svg>
          <span
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "Open Sans, sans-serif",
              fontSize: "0.62rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.55)",
              whiteSpace: "nowrap",
            }}
          >
            Foto de projeto real · placeholder
          </span>
        </div>

        {/* RIGHT: petrol panel */}
        <div
          style={{
            backgroundColor: PETROL,
            display: "flex",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Copy */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "3rem 2.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "0.04em",
                marginBottom: "0.4rem",
                textTransform: "uppercase",
              }}
            >
              Molduras que elevam o nível da sua
            </p>

            <h1
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                fontWeight: 900,
                color: "#ffffff",
                lineHeight: 0.95,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
              }}
            >
              OBRA
            </h1>

            <p
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "clamp(1.6rem, 2.8vw, 2.5rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: "#ffffff",
                lineHeight: 1.1,
                marginBottom: "2.5rem",
              }}
            >
              Contemporânea
            </p>

            <div>
              <a
                href="#catalogo"
                id="btn-conheca-modelos"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  backgroundColor: ORANGE,
                  color: "#ffffff",
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  padding: "0.85rem 2rem",
                  borderRadius: "50px",
                  transition: "all 0.25s ease",
                  boxShadow: "0 4px 16px rgba(245,101,16,0.45)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = "#ff7826";
                  el.style.transform = "translateY(-2px)";
                  el.style.boxShadow = "0 7px 22px rgba(245,101,16,0.55)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = ORANGE;
                  el.style.transform = "translateY(0)";
                  el.style.boxShadow = "0 4px 16px rgba(245,101,16,0.45)";
                }}
              >
                Conheça os modelos
              </a>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div
            style={{
              width: "78px",
              backgroundColor: "#0e2530",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "1rem 0",
              borderLeft: "1px solid rgba(255,255,255,0.05)",
            }}
            className="hero-thumbs"
          >
            {thumbLabels.map((lbl) => (
              <div
                key={lbl}
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#f0ede8",
                  borderRadius: "4px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s",
                  border: "1px solid rgba(255,255,255,0.08)",
                  gap: "3px",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "scale(1.06)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
                }
              >
                <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
                  <rect x="0" y="8" width="34" height="11" fill="#1a1a1a" rx="1" />
                  <rect x="3" y="4" width="28" height="6" fill="#2a2a2a" rx="1" />
                  <rect x="7" y="0" width="20" height="5" fill="#333" rx="1" />
                </svg>
                <span
                  style={{
                    fontFamily: "Open Sans, sans-serif",
                    fontSize: "0.5rem",
                    color: "#153746",
                    opacity: 0.6,
                  }}
                >
                  {lbl}
                </span>
              </div>
            ))}
          </div>

          {/* Orange tile pattern at the bottom right */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: "78px",
              width: "72px",
              height: "72px",
              overflow: "hidden",
            }}
          >
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              {[0, 1, 2].map((r) =>
                [0, 1, 2].map((c) => (
                  <rect
                    key={`${r}-${c}`}
                    x={c * 24}
                    y={r * 24}
                    width="22"
                    height="22"
                    rx="3"
                    fill={ORANGE}
                    opacity={0.55 + (r + c) * 0.06}
                  />
                ))
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* ── Diferenciais strip ── */}
      <div
        style={{
          backgroundColor: PETROL,
          borderTop: `2px solid rgba(245,101,16,0.35)`,
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1px 1fr 1px 1fr",
            alignItems: "center",
          }}
          className="diferenciais-grid"
        >
          {diferenciais.map((d, i) => (
            <>
              <div
                key={d.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  padding: "1.1rem 1rem",
                }}
              >
                <d.Icon size={21} color={ORANGE} strokeWidth={1.8} />
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  {d.label}
                </span>
              </div>
              {i < diferenciais.length - 1 && (
                <div
                  key={`sep-${i}`}
                  style={{
                    width: "1px",
                    height: "32px",
                    backgroundColor: "rgba(255,255,255,0.13)",
                    justifySelf: "center",
                  }}
                />
              )}
            </>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-main          { grid-template-columns: 1fr !important; max-height: none !important; }
          .hero-thumbs        { display: none !important; }
          .diferenciais-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
