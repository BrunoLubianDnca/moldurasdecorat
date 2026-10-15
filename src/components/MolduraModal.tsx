"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { ChevronDown, Maximize2, Minimize2, X } from "lucide-react";
import dynamic from "next/dynamic";

const Moldura3DViewer = dynamic(() => import("./Moldura3DViewer"), {
  ssr: false,
  loading: () => <div className="moldura-3d-loading"><span>Preparando o visualizador 3D…</span></div>,
});

export interface ProductItem {
  codigo: string;
  nome: string;
  categoria: string;
  familia: string;
  aplicacoes: string[];
  status_classificacao: string;
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
  onRequestQuote: (product: ProductItem) => void;
}

function useDialogInteraction(enabled: boolean, onClose: () => void, dialogRef: RefObject<HTMLDivElement | null>, initialFocusRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!enabled) return;

    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => initialFocusRef.current?.focus({ preventScroll: true }), 0);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [dialogRef, enabled, initialFocusRef, onClose]);
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.198-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.89c0 2.096.547 4.142 1.588 5.945L.057 24l6.293-1.65a11.882 11.882 0 005.693 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.477-8.414" />
    </svg>
  );
}

export default function MolduraModal({ product, onClose, onRequestQuote }: MolduraModalProps) {
  const [view, setView] = useState<"3d" | "render">("3d");
  const [showTechnical, setShowTechnical] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const visualRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const technicalId = `decorat-${product?.codigo ?? "product"}-technical`;

  useDialogInteraction(Boolean(product), onClose, dialogRef, closeRef);

  useEffect(() => {
    const updateFullscreenState = () => setIsFullscreen(document.fullscreenElement === visualRef.current);
    document.addEventListener("fullscreenchange", updateFullscreenState);
    return () => document.removeEventListener("fullscreenchange", updateFullscreenState);
  }, []);

  if (!product) return null;

  const toggleFullscreen = async () => {
    const visual = visualRef.current;
    if (!visual) return;
    if (document.fullscreenElement) await document.exitFullscreen?.();
    else await visual.requestFullscreen?.();
  };

  return (
    <div className="decorat-m001-backdrop" onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div ref={dialogRef} className={`decorat-m001-showroom ${isFullscreen ? "is-fullscreen" : ""}`} role="dialog" aria-modal="true" aria-labelledby="decorat-showroom-title" aria-describedby="decorat-showroom-description">
        <section className="decorat-m001-visual" ref={visualRef}>
          <div className="decorat-m001-visual-meta">
            <span>CATÁLOGO DECORAT</span>
            <span>{product.codigo} · {product.categoria}</span>
          </div>

          <button ref={closeRef} type="button" onClick={onClose} className="decorat-m001-close" aria-label="Fechar showroom" title="Fechar showroom">
            <X size={19} />
          </button>

          <div className="decorat-m001-stage">
            {view === "3d" ? (
              <Moldura3DViewer
                glbUrl={product.modelo3d}
                heightMm={product.altura_mm}
                widthMm={product.largura_mm}
                fitFactor={1.02}
                mobileFitFactor={1.14}
                showHint={false}
              />
            ) : (
              <div className="decorat-m001-render">
                <Image src={product.imagem} alt={product.nome} fill sizes="(max-width: 768px) 100vw, 65vw" priority />
              </div>
            )}

            <div className={`decorat-m001-stage-footer ${view === "render" ? "is-render" : ""}`}>
              {view === "3d" && <span>Arraste para girar · role para aproximar</span>}
              <div className="decorat-m001-view-controls">
                <button type="button" className={view === "3d" ? "active" : ""} onClick={() => setView("3d")} aria-pressed={view === "3d"}>3D interativo</button>
                <button type="button" className={view === "render" ? "active" : ""} onClick={() => setView("render")} aria-pressed={view === "render"}>Imagem</button>
                <button type="button" onClick={toggleFullscreen} aria-label={isFullscreen ? "Sair da tela cheia" : "Abrir tela cheia"} title={isFullscreen ? "Sair da tela cheia" : "Expandir visual"}>
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
            <h2 id="decorat-showroom-title">Moldura <em>{product.codigo}</em></h2>
            <p id="decorat-showroom-description" className="decorat-m001-description">Perfil arquitetônico em EPS com acabamento preciso, leveza e presença para especificação em projeto.</p>

            <div className="decorat-m001-dimensions">
              <span>DIMENSÕES CONFIRMADAS</span>
              <div>
                <div><strong>{product.altura_mm ?? "—"}</strong><small>mm<br />altura</small></div>
                <i />
                <div><strong>{product.largura_mm ?? "—"}</strong><small>mm<br />projeção</small></div>
              </div>
            </div>

            <button type="button" className="decorat-m001-quote" onClick={() => onRequestQuote(product)} aria-label={`Iniciar atendimento sobre a moldura ${product.codigo}`}>
              <span>Solicitar orçamento</span>
              <WhatsAppIcon size={20} />
            </button>

            <button type="button" className="decorat-m001-technical-toggle" onClick={() => setShowTechnical((current) => !current)} aria-expanded={showTechnical} aria-controls={technicalId}>
              <span>{showTechnical ? "Ocultar informações técnicas" : "Ver informações técnicas"}</span>
              <ChevronDown size={16} className={showTechnical ? "rotated" : ""} />
            </button>

            {showTechnical && (
              <div id={technicalId} className="decorat-m001-technical" role="region" aria-label="Informações técnicas">
                <div><span>Material</span><strong>EPS revestido Decorat</strong></div>
                <div><span>Comprimento padrão</span><strong>2,00 metros</strong></div>
              </div>
            )}
          </div>

          <div className="decorat-m001-info-footer">
            <span>MOLDURAS EM EPS · DECORAT</span>
            <span>Campo Grande · MS</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
