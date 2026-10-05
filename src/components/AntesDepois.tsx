"use client";

import { useState } from "react";

const PETROL = "#153746";
const ORANGE = "#F56510";

export default function AntesDepois() {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 2), 98);
    setSliderPos(pct);
  };

  return (
    <section
      id="transformacoes"
      style={{ backgroundColor: "#ffffff", padding: "5rem 0" }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
        className="ba-wrapper"
      >
        {/* Left: Text */}
        <div>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 800,
              color: PETROL,
              lineHeight: 1.25,
              marginBottom: "1.5rem",
            }}
          >
            Veja a{" "}
            <strong style={{ color: PETROL, fontWeight: 900 }}>
              grande diferença
            </strong>{" "}
            com as molduras{" "}
            <span style={{ color: ORANGE }}>Decorat</span>
          </h2>

          <p
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "0.92rem",
              lineHeight: 1.85,
              color: "#3a3630",
              marginBottom: "0.5rem",
            }}
          >
            Nossas molduras são fabricadas em EPS (poliestireno expandido,
            popularmente Isopor®) com revestimento cimentício. São{" "}
            <strong style={{ color: PETROL }}>leves</strong>,{" "}
            <strong style={{ color: PETROL }}>resistentes</strong> às{" "}
            <strong style={{ color: PETROL }}>intempéries climáticas</strong>{" "}
            e fáceis de instalar tanto em aplicações internas quanto externas.
          </p>

          <p
            style={{
              fontFamily: "Open Sans, sans-serif",
              fontSize: "0.82rem",
              color: "#9a968f",
              marginBottom: "2rem",
              fontStyle: "italic",
            }}
          >
            Arraste a linha para comparar →
          </p>

          <a
            href="#contato"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: ORANGE,
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "0.85rem 1.75rem",
              borderRadius: "4px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#d85408")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = ORANGE)
            }
          >
            Solicitar orçamento
          </a>
        </div>

        {/* Right: Slider */}
        <div
          style={{
            position: "relative",
            aspectRatio: "16/10",
            cursor: isDragging ? "grabbing" : "ew-resize",
            userSelect: "none",
            borderRadius: "8px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
          }}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={(e) => {
            if (isDragging) handleMove(e.clientX, e.currentTarget.getBoundingClientRect());
          }}
          onTouchMove={(e) =>
            handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())
          }
        >
          {/* DEPOIS */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #d0dce6 0%, #a8c0d4 40%, #88a8c4 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <svg width="210" height="155" viewBox="0 0 210 155" fill="none" opacity={0.55}>
              <rect x="15" y="72" width="180" height="78" fill="white" rx="3" />
              <polygon points="105,12 8,77 202,77" fill="white" opacity="0.9" />
              {/* Molduras */}
              <rect x="15" y="72" width="180" height="7" fill="#d8e4ee" />
              <rect x="15" y="79" width="180" height="2" fill="#c4d4e4" />
              <rect x="42" y="90" width="38" height="32" fill="#b8cce0" rx="2" />
              <rect x="38" y="86" width="46" height="5" fill="#d4e2ee" />
              <rect x="130" y="90" width="38" height="32" fill="#b8cce0" rx="2" />
              <rect x="126" y="86" width="46" height="5" fill="#d4e2ee" />
              <rect x="80" y="108" width="28" height="42" fill="#a8bcd0" />
              <rect x="17" y="72" width="7" height="78" fill="#dce8f4" />
              <rect x="186" y="72" width="7" height="78" fill="#dce8f4" />
            </svg>
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(21,55,70,0.4)",
                fontWeight: 600,
              }}
            >
              Com molduras Decorat · foto real
            </span>
          </div>

          {/* ANTES */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #c0c8d0 0%, #98a8b8 40%, #7888a0 100%)",
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.75rem",
            }}
          >
            <svg width="210" height="155" viewBox="0 0 210 155" fill="none" opacity={0.45}>
              <rect x="15" y="72" width="180" height="78" fill="white" rx="3" />
              <polygon points="105,12 8,77 202,77" fill="white" opacity="0.9" />
              <rect x="42" y="90" width="38" height="32" fill="#98a8b8" rx="2" />
              <rect x="130" y="90" width="38" height="32" fill="#98a8b8" rx="2" />
              <rect x="80" y="108" width="28" height="42" fill="#889aac" />
            </svg>
            <span
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "rgba(21,55,70,0.35)",
                fontWeight: 600,
              }}
            >
              Sem molduras · foto real
            </span>
          </div>

          {/* Divider */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${sliderPos}%`,
              transform: "translateX(-50%)",
              width: "2px",
              backgroundColor: "#ffffff",
              pointerEvents: "none",
              boxShadow: "0 0 8px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "36px",
                height: "36px",
                backgroundColor: "#ffffff",
                borderRadius: "50%",
                boxShadow: "0 2px 12px rgba(0,0,0,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <path d="M4 5L0 1v8L4 5z" fill={PETROL} />
                <path d="M10 5l4-4v8l-4-4z" fill={PETROL} />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <div
            style={{
              position: "absolute", top: "1rem", left: "1rem",
              backgroundColor: "rgba(21,55,70,0.8)", color: "#fff",
              fontFamily: "Montserrat, sans-serif", fontSize: "0.58rem",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.25rem 0.65rem", borderRadius: "3px",
            }}
          >
            Antes
          </div>
          <div
            style={{
              position: "absolute", top: "1rem", right: "1rem",
              backgroundColor: ORANGE, color: "#fff",
              fontFamily: "Montserrat, sans-serif", fontSize: "0.58rem",
              fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
              padding: "0.25rem 0.65rem", borderRadius: "3px",
            }}
          >
            Depois
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ba-wrapper { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
