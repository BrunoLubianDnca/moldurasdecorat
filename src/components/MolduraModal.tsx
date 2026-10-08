"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Box, FileText, ZoomIn, MoveVertical, MoveHorizontal, Layers, Ruler, Download, Maximize2, Minimize2, ChevronDown } from "lucide-react";
import dynamic from "next/dynamic";

const Moldura3DViewer = dynamic(() => import("./Moldura3DViewer"), {
  ssr: false,
  loading: () => (
    <div style={{ width: "100%", height: 340, background: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 12 }}>
      <span style={{ fontSize: 13, color: "var(--deep)", fontWeight: 600 }}>Carregando ambiente 3D...</span>
    </div>
  ),
});

export interface ProductItem {
  codigo: string;
  nome: string;
  categoria: string;
  altura_mm: number | null;
  largura_mm: number | null;
  imagem: string;
  perfil: string;
  modelo3d: string;
  status_validacao: "validado" | "pendente" | string;
}

interface MolduraModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onSelectWhatsApp: (product: ProductItem) => void;
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.198-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.945L.057 24l6.293-1.65a11.882 11.882 0 005.693 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.477-8.414" />
    </svg>
  );
}

function PremiumM001Showroom({ product, onClose, onSelectWhatsApp }: MolduraModalProps) {
  const [view, setView] = useState<"3d" | "render">("3d");
  const [showTechnical, setShowTechnical] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const visualRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateFullscreenState = () => setIsFullscreen(document.fullscreenElement === visualRef.current);
    document.addEventListener("fullscreenchange", updateFullscreenState);
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState);
  }, []);

  const toggleFullscreen = async () => {
    const visual = visualRef.current;
    if (!visual) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen?.();
    } else if (visual.requestFullscreen) {
      await visual.requestFullscreen();
    }
  };

  if (!product) return null;

  return (
    <div className="decorat-m001-backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className={`decorat-m001-showroom ${isFullscreen ? "is-fullscreen" : ""}`}>
        <section className="decorat-m001-visual" ref={visualRef}>
          <div className="decorat-m001-visual-meta">
            <span>DECORAT / COLLECTION 01</span>
            <span>M001 · PROFILE STUDY</span>
          </div>

          <button onClick={onClose} className="decorat-m001-close" aria-label="Fechar showroom">
            <X size={19} />
          </button>

          <div className="decorat-m001-stage">
            {view === "3d" ? (
              <Moldura3DViewer
                glbUrl={product.modelo3d}
                heightMm={product.altura_mm}
                widthMm={product.largura_mm}
              />
            ) : (
              <div className="decorat-m001-render">
                <Image src={product.imagem} alt={product.nome} fill sizes="(max-width: 768px) 100vw, 65vw" priority />
              </div>
            )}

            <div className="decorat-m001-stage-footer">
              <span>Arraste para girar · scroll para aproximar</span>
              <div className="decorat-m001-view-controls">
                <button type="button" className={view === "3d" ? "active" : ""} onClick={() => setView("3d")}>3D interativo</button>
                <button type="button" className={view === "render" ? "active" : ""} onClick={() => setView("render")}>Render</button>
                <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Sair da tela cheia" : "Abrir tela cheia"}>
                  {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                </button>
              </div>
            </div>
          </div>
        </section>

        <aside className="decorat-m001-info">
          <div className="decorat-m001-info-body">
            <div className="decorat-m001-info-kicker"><span /> {product.categoria}</div>
            <p className="decorat-m001-code">{product.codigo}</p>
            <h2>Moldura <em>{product.codigo}</em></h2>
            <p className="decorat-m001-description">
              Um perfil arquitetônico de presença discreta e acabamento preciso para compor fachadas com proporção e personalidade.
            </p>

            <div className="decorat-m001-dimensions">
              <span>DIMENSÕES CONFIRMADAS</span>
              <div>
                <div><strong>{product.altura_mm ?? "—"}</strong><small>mm<br />altura</small></div>
                <i />
                <div><strong>{product.largura_mm ?? "—"}</strong><small>mm<br />projeção</small></div>
              </div>
            </div>

            <button type="button" className="decorat-m001-quote" onClick={() => onSelectWhatsApp(product)} aria-label={`Solicitar orçamento da moldura ${product.codigo} pelo WhatsApp`}>
              <span>Solicitar orçamento</span>
              <WhatsAppIcon size={20} />
            </button>

            <button type="button" className="decorat-m001-technical-toggle" onClick={() => setShowTechnical((current) => !current)}>
              <span>{showTechnical ? "Ocultar informações técnicas" : "Ver informações técnicas"}</span>
              <ChevronDown size={16} className={showTechnical ? "rotated" : ""} />
            </button>

            {showTechnical && (
              <div className="decorat-m001-technical" role="region" aria-label="Informações técnicas">
                <div><span>Material</span><strong>EPS revestido Decorat</strong></div>
                <div><span>Comprimento padrão</span><strong>2,00 metros</strong></div>
              </div>
            )}
          </div>

          <div className="decorat-m001-info-footer">
            <span>DECORAT / MOLDURAS ARQUITETÔNICAS</span>
            <span>Campo Grande · MS</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function MolduraModal({ product, onClose, onSelectWhatsApp }: MolduraModalProps) {
  const [activeTab, setActiveTab] = useState<"render" | "perfil" | "3d">("render");
  const [zoom, setZoom] = useState(false);

  if (!product) return null;

  if (product.codigo === "M001") {
    return <PremiumM001Showroom product={product} onClose={onClose} onSelectWhatsApp={onSelectWhatsApp} />;
  }

  return (
    <div className="catalogo-modal-backdrop" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="catalogo-modal-card">
        
        {/* Close Button */}
        <button onClick={onClose} className="catalogo-modal-close" aria-label="Fechar">
          <X style={{ width: 18, height: 18 }} />
        </button>

        {/* Left Side: Viewer */}
        <div className="catalogo-modal-left">
          
          {/* Tab Selector */}
          <div className="catalogo-modal-tabs">
            <button
              onClick={() => setActiveTab("render")}
              className={`catalogo-modal-tab-btn ${activeTab === "render" ? "active" : ""}`}
            >
              <FileText style={{ width: 14, height: 14 }} />
              <span>Render 3D</span>
            </button>
            <button
              onClick={() => setActiveTab("perfil")}
              className={`catalogo-modal-tab-btn ${activeTab === "perfil" ? "active" : ""}`}
            >
              <FileText style={{ width: 14, height: 14 }} />
              <span>Corte Técnico</span>
            </button>
            <button
              onClick={() => setActiveTab("3d")}
              className={`catalogo-modal-tab-btn ${activeTab === "3d" ? "active-3d" : ""}`}
            >
              <Box style={{ width: 14, height: 14 }} />
              <span>3D Interativo</span>
            </button>
          </div>

          {/* Main Visual Content */}
          <div className="catalogo-modal-viewer-area">
            {activeTab === "render" && (
              <div style={{ position: "relative", width: "100%", height: 320, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f0eee6 0%, #e0ddd3 100%)", borderRadius: 12, overflow: "hidden" }}>
                <Image
                  src={product.imagem}
                  alt={product.nome}
                  fill
                  style={{
                    objectFit: "contain",
                    transform: zoom ? "scale(1.25)" : "scale(1)",
                    transition: "transform 0.3s ease"
                  }}
                  sizes="400px"
                />
                <button
                  onClick={() => setZoom(!zoom)}
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 8,
                    padding: "6px 12px",
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: 8,
                    border: "1px solid var(--line)",
                    fontSize: 11,
                    color: "var(--deep)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4
                  }}
                >
                  <ZoomIn style={{ width: 14, height: 14 }} />
                  <span>{zoom ? "Reduzir" : "Ampliar"}</span>
                </button>
              </div>
            )}

            {activeTab === "perfil" && (
              <div style={{ width: "100%", height: 320, background: "#ffffff", borderRadius: 12, border: "1px solid var(--line)", padding: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "relative", width: 180, height: 180, marginBottom: 12 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.perfil}
                    alt={`Perfil técnico ${product.codigo}`}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--deep)" }}>Seção Transversal do Perfil</p>
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>Geometria vetorizada original EPS</span>
                </div>
              </div>
            )}

            {activeTab === "3d" && (
              <div style={{ width: "100%", height: "100%" }}>
                <Moldura3DViewer
                  glbUrl={product.modelo3d}
                  heightMm={product.altura_mm}
                  widthMm={product.largura_mm}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Info & Actions */}
        <div className="catalogo-modal-right">
          <div>
            <span className="catalogo-modal-tag">
              MOLDURA EPS DECORAT
            </span>

            <h2 className="catalogo-modal-title">Moldura {product.codigo}</h2>
            <p className="catalogo-modal-desc">
              Moldura arquitetônica em EPS de alta densidade, leve, durável e pronta para aplicação e acabamento em fachada ou ambiente interno.
            </p>

            <div className="catalogo-modal-specs-box">
              <h4 style={{ textTransform: "uppercase", fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: "var(--deep)", marginBottom: 16 }}>Especificações Técnicas</h4>
              <div className="catalogo-modal-specs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px 16px" }}>
                
                <div className="catalogo-spec-item" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <MoveVertical style={{ width: 20, height: 20, color: "var(--deep)", flexShrink: 0, marginTop: 2 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>Altura do Perfil</span>
                    <strong style={{ fontSize: 15, color: "var(--deep)" }}>{product.altura_mm ? `${product.altura_mm} mm` : "Sob consulta"}</strong>
                  </div>
                </div>

                <div className="catalogo-spec-item" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <MoveHorizontal style={{ width: 20, height: 20, color: "var(--deep)", flexShrink: 0, marginTop: 2 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>Largura / Projeção</span>
                    <strong style={{ fontSize: 15, color: "var(--deep)" }}>{product.largura_mm ? `${product.largura_mm} mm` : "Sob consulta"}</strong>
                  </div>
                </div>

                <div className="catalogo-spec-item" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Layers style={{ width: 20, height: 20, color: "var(--deep)", flexShrink: 0, marginTop: 2 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>Material</span>
                    <strong style={{ fontSize: 13, color: "var(--deep)" }}>EPS Revestido Decorat</strong>
                  </div>
                </div>

                <div className="catalogo-spec-item" style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Ruler style={{ width: 20, height: 20, color: "var(--deep)", flexShrink: 0, marginTop: 2 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>Comprimento Padrão</span>
                    <strong style={{ fontSize: 13, color: "var(--deep)" }}>2,00 metros</strong>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
            <button
              onClick={() => onSelectWhatsApp(product)}
              className="catalogo-whatsapp-cta"
            >
              <WhatsAppIcon size={19} />
              <span>Solicitar Orçamento no WhatsApp</span>
            </button>
            
            <button
              style={{
                width: "100%",
                padding: "14px 24px",
                background: "#ffffff",
                border: "1px solid var(--line)",
                borderRadius: 8,
                color: "var(--deep)",
                fontWeight: 600,
                fontSize: 14,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "#f8f9fa"}
              onMouseLeave={(e) => e.currentTarget.style.background = "#ffffff"}
            >
              <Download style={{ width: 16, height: 16 }} />
              <span>Baixar ficha técnica (PDF)</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
