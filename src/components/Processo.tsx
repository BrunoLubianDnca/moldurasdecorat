"use client";

import { FileText, Package, Truck, Wrench } from "lucide-react";

const PETROL = "#153746";
const ORANGE = "#F56510";

const etapas = [
  {
    Icon: FileText,
    num: "01",
    titulo: "Escolha os modelos",
    descricao:
      "Navegue pelo catálogo e selecione as molduras para seu projeto. Disponíveis em diversos perfis, tamanhos e acabamentos.",
  },
  {
    Icon: FileText,
    num: "02",
    titulo: "Solicite o orçamento",
    descricao:
      "Informe as medidas e a quantidade. Nossa equipe retorna com proposta personalizada em até 24h úteis, sem compromisso.",
  },
  {
    Icon: Package,
    num: "03",
    titulo: "Fabricação em EPS",
    descricao:
      "As peças são produzidas em nossa fábrica em Campo Grande-MS, em EPS com revestimento cimentício de alta resistência.",
  },
  {
    Icon: Truck,
    num: "04",
    titulo: "Entrega e instalação",
    descricao:
      "Enviamos para todo o Brasil com rastreamento. A instalação pode ser feita por nossa equipe ou por terceiros com nosso guia.",
  },
];

export default function Processo() {
  return (
    <section
      id="processo"
      style={{ backgroundColor: PETROL, padding: "5rem 0" }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
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
            Como funciona
          </p>
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.2,
            }}
          >
            Do pedido à sua obra em 4 etapas
          </h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "2rem",
            position: "relative",
          }}
          className="steps-grid"
        >
          {/* Connector */}
          <div
            style={{
              position: "absolute",
              top: "2rem",
              left: "calc(12.5% + 1rem)",
              right: "calc(12.5% + 1rem)",
              height: "1px",
              backgroundColor: `rgba(245,101,16,0.3)`,
              zIndex: 0,
            }}
            className="steps-line"
          />

          {etapas.map((etapa, i) => (
            <div
              key={etapa.num}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "50%",
                  backgroundColor: i === 0 ? ORANGE : "#1e4d63",
                  border: `2px solid ${i === 0 ? ORANGE : "rgba(245,101,16,0.3)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "1.5rem",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = ORANGE;
                  el.style.borderColor = ORANGE;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.backgroundColor = i === 0 ? ORANGE : "#1e4d63";
                  el.style.borderColor = i === 0 ? ORANGE : "rgba(245,101,16,0.3)";
                }}
              >
                <etapa.Icon size={24} color="#ffffff" strokeWidth={1.8} />
              </div>

              <span
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: ORANGE,
                  marginBottom: "0.35rem",
                }}
              >
                Etapa {etapa.num}
              </span>

              <h3
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "#ffffff",
                  marginBottom: "0.65rem",
                  lineHeight: 1.25,
                }}
              >
                {etapa.titulo}
              </h3>

              <p
                style={{
                  fontFamily: "Open Sans, sans-serif",
                  fontSize: "0.8rem",
                  lineHeight: 1.7,
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                {etapa.descricao}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
          <a
            href="#contato"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              backgroundColor: ORANGE,
              color: "#ffffff",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              textDecoration: "none",
              padding: "0.9rem 2.5rem",
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
            <Wrench size={16} />
            Quero começar meu projeto
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-line { display: none; }
        }
        @media (max-width: 520px) {
          .steps-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
