"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const PETROL = "#153746";
const ORANGE = "#F56510";

const categorias = [
  {
    num: "01",
    nome: "Molduras Internas",
    descricao: "Acabamentos internos em EPS para tetos, paredes e rodapés.",
    cor: "#c8d8e0",
  },
  {
    num: "02",
    nome: "Molduras Externas",
    descricao: "Proteção e elegância para fachadas com durabilidade climática.",
    cor: "#bcccd8",
  },
  {
    num: "03",
    nome: "Filetes e Boiseries",
    descricao: "Detalhes refinados que valorizam qualquer superfície.",
    cor: "#c4d4e0",
  },
  {
    num: "04",
    nome: "Guarnições para Janelas",
    descricao: "Molduras que enquadram e valorizam aberturas e portas.",
    cor: "#b8c8d4",
  },
  {
    num: "05",
    nome: "Pilares Decorativos",
    descricao: "Colunas em EPS para projetos clássicos e contemporâneos.",
    cor: "#c0d0dc",
  },
  {
    num: "06",
    nome: "Personalizadas",
    descricao: "Criamos o modelo ideal para o seu projeto sob medida.",
    cor: "#bacad6",
  },
];

const VISIBLE = 3;

export default function Categorias() {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(categorias.length - VISIBLE, i + 1));
  const visible = categorias.slice(idx, idx + VISIBLE);

  return (
    <section
      id="catalogo"
      style={{ backgroundColor: "#f8f6f3", padding: "4.5rem 0 5rem" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
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
          Catálogo
        </p>

        <h2
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
            fontWeight: 800,
            color: PETROL,
            lineHeight: 1.15,
            marginBottom: "0.9rem",
          }}
        >
          Categorias de peças
        </h2>

        <p
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.75,
            color: "#4a4540",
            maxWidth: "360px",
            marginBottom: "3rem",
          }}
        >
          Cada linha resolve uma necessidade da obra, do beiral à peça
          exclusiva.{" "}
          <a
            href="#contato"
            style={{ color: ORANGE, textDecoration: "none", fontWeight: 600 }}
          >
            Consulte modelos e medidas.
          </a>
        </p>

        {/* Carousel */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          {/* Prev */}
          <button
            onClick={prev}
            disabled={idx === 0}
            aria-label="Anterior"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "4px",
              backgroundColor: idx === 0 ? "#dedad4" : ORANGE,
              border: "none",
              cursor: idx === 0 ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#ffffff",
              transition: "background-color 0.2s",
            }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
            className="cat-cards"
          >
            {visible.map((cat) => (
              <div
                key={cat.num}
                style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.25s, transform 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)";
                  el.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                  el.style.transform = "translateY(0)";
                }}
              >
                {/* Photo placeholder */}
                <div
                  style={{
                    aspectRatio: "4/3",
                    backgroundColor: cat.cor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    position: "relative",
                  }}
                >
                  <svg
                    width="90"
                    height="70"
                    viewBox="0 0 90 70"
                    fill="none"
                    opacity={0.35}
                  >
                    <rect x="5" y="30" width="80" height="38" fill="white" rx="2" />
                    <rect x="10" y="20" width="70" height="12" fill="white" rx="1" />
                    <rect x="20" y="12" width="50" height="10" fill="white" rx="1" />
                    <rect x="30" y="48" width="14" height="20" fill={cat.cor} />
                    <rect x="50" y="42" width="22" height="14" fill={cat.cor} />
                    <rect x="8" y="38" width="16" height="12" fill={cat.cor} />
                  </svg>
                  <span
                    style={{
                      fontFamily: "Open Sans, sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(21,55,70,0.4)",
                    }}
                  >
                    Foto real · {cat.nome}
                  </span>
                </div>

                {/* Info */}
                <div style={{ padding: "1.1rem 1.25rem 1.35rem" }}>
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: ORANGE,
                      lineHeight: 1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {cat.num}
                  </p>
                  <h3
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 700,
                      color: PETROL,
                      marginBottom: "0.9rem",
                      lineHeight: 1.2,
                    }}
                  >
                    {cat.nome}
                  </h3>
                  <a
                    href="#contato"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      fontFamily: "Open Sans, sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: ORANGE,
                      textDecoration: "none",
                      transition: "gap 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.gap = "0.55rem")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.gap = "0.3rem")
                    }
                  >
                    Consultar modelo <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            disabled={idx >= categorias.length - VISIBLE}
            aria-label="Próximo"
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "4px",
              backgroundColor:
                idx >= categorias.length - VISIBLE ? "#dedad4" : ORANGE,
              border: "none",
              cursor:
                idx >= categorias.length - VISIBLE ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              color: "#ffffff",
              transition: "background-color 0.2s",
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.4rem",
            marginTop: "1.75rem",
          }}
        >
          {Array.from({ length: categorias.length - VISIBLE + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Página ${i + 1}`}
              style={{
                width: i === idx ? "20px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: i === idx ? ORANGE : "#d0cdc8",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .cat-cards { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .cat-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
