"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight, Box, Ruler, Search } from "lucide-react";
import catalogDataRaw from "@/data/catalogo.json";
import {
  applicationContexts,
  createPreAttendanceHref,
  hasPreAttendanceContext,
  projectStageContexts,
  type PreAttendanceContext,
} from "@/lib/preAtendimento";
import MolduraModal, { ProductItem } from "./MolduraModal";

const catalogData = catalogDataRaw as ProductItem[];
const ALL_APPLICATIONS = "Todos";

const validatedApplications = Array.from(
  new Set(
    catalogData.flatMap((item) =>
      Array.isArray(item.aplicacoes)
        ? item.aplicacoes.filter((application): application is string => Boolean(application?.trim()))
        : [],
    ),
  ),
).sort((a, b) => a.localeCompare(b, "pt-BR"));

function formatApplicationLabel(application: string) {
  const label = application.replaceAll("_", " ").replaceAll("-", " ").trim();
  return label ? label.charAt(0).toLocaleUpperCase("pt-BR") + label.slice(1) : application;
}

export default function CatalogoDigital({ initialContext = {} }: { initialContext?: PreAttendanceContext }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeApplication, setActiveApplication] = useState(ALL_APPLICATIONS);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.toLocaleLowerCase("pt-BR").trim();

    return catalogData.filter((item) => {
      const matchesSearch =
        item.codigo.toLocaleLowerCase("pt-BR").includes(normalizedSearch) ||
        item.nome.toLocaleLowerCase("pt-BR").includes(normalizedSearch);
      const matchesApplication =
        activeApplication === ALL_APPLICATIONS || item.aplicacoes.includes(activeApplication);

      return matchesSearch && matchesApplication;
    });
  }, [searchTerm, activeApplication]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleRequestQuote = (product: ProductItem) => {
    window.location.assign(createPreAttendanceHref({ ...initialContext, profileCode: product.codigo }));
  };

  const contextLabel = [
    initialContext.application ? applicationContexts[initialContext.application].label : "",
    initialContext.projectStage ? projectStageContexts[initialContext.projectStage] : "",
  ].filter(Boolean).join(" · ");

  return (
    <section className="catalogo-digital-section" id="catalogo-digital">
      <div className="catalogo-container">
        <span className="catalogo-anchor" id="pecas-premium" aria-hidden="true" />

        {hasPreAttendanceContext(initialContext) && contextLabel && (
          <div className="catalogo-navigation-context" role="status">
            <span>CONTEXTO DA CONSULTA</span>
            <strong>{contextLabel}</strong>
            <p>A listagem completa permanece disponível; nenhuma aplicação foi usada como filtro técnico.</p>
          </div>
        )}
        
        {/* Header Title & Controls */}
        <div className="catalogo-header">
          <div className="catalogo-title-area">
            <div className="catalogo-kicker-row">
              <p>CATÁLOGO ARQUITETÔNICO</p>
              <span>DECORAT · 2026</span>
            </div>
            <h2>Molduras em EPS Decorat</h2>
            <span>
              Uma biblioteca de perfis para desenhar fachadas e interiores com mais intenção, proporção e acabamento.
            </span>
          </div>

          <div className="catalogo-header-actions">
            <div className="catalogo-header-note">
              <Box size={16} />
              <span><strong>{catalogData.length}</strong> perfis disponíveis</span>
            </div>
            <div className="catalogo-toolbar">
              <div className="catalogo-search-box">
                <Search className="catalogo-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar por código (ex: M001)..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setVisibleCount(12);
                  }}
                  aria-label="Buscar perfis por código ou nome"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Application filters are rendered only from validated product data. */}
        {validatedApplications.length > 0 ? (
          <div className="catalogo-categories-filter" aria-label="Filtrar perfis por aplicação">
            {[ALL_APPLICATIONS, ...validatedApplications].map((application) => (
              <button
                key={application}
                type="button"
                onClick={() => {
                  setActiveApplication(application);
                  setVisibleCount(12);
                }}
                className={`catalogo-category-btn ${activeApplication === application ? "active" : ""}`}
                aria-pressed={activeApplication === application}
              >
                {application === ALL_APPLICATIONS ? application : formatApplicationLabel(application)}
              </button>
            ))}
          </div>
        ) : (
          <p className="catalogo-classification-note">
            Filtros por aplicação serão disponibilizados após a validação técnica dos perfis.
          </p>
        )}

        {/* Counter Info */}
        <div className="catalogo-meta-bar">
          <span><strong>{displayedProducts.length}</strong> de {filteredProducts.length} perfis exibidos</span>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="catalogo-grid">
            {displayedProducts.map((product, index) => (
            <article key={product.codigo} className="catalogo-card">
              
              {/* Product Visual Area */}
              <div className="catalogo-card-visual">
                <span className="catalogo-card-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="catalogo-card-kind">PERFIL EPS</span>
                <div className="catalogo-card-img-wrap">
                  <Image
                    src={product.imagem}
                    alt={product.nome}
                    fill
                    style={{ objectFit: "contain" }}
                    sizes="280px"
                  />
                </div>
              </div>

              {/* Product Info Area */}
              <div className="catalogo-card-body">
                <div>
                  <span className="catalogo-card-overline">MOLDURA ARQUITETÔNICA</span>
                  <h3 className="catalogo-card-title">{product.codigo}</h3>
                  <div className="catalogo-card-specs">
                    <span><Ruler size={13} />
                      {product.altura_mm ? `${product.altura_mm} mm` : "Sob consulta"} <small>altura</small>
                    </span>
                    <span className="catalogo-card-spec-divider">×</span>
                    <span><Ruler size={13} />
                      {product.largura_mm ? `${product.largura_mm} mm` : "Sob consulta"} <small>projeção</small>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProduct(product)}
                  className="catalogo-card-btn"
                >
                  <span>Explorar perfil</span>
                  <ArrowUpRight style={{ width: 15, height: 15 }} />
                </button>
              </div>

            </article>
            ))}
          </div>
        ) : (
          <div className="catalogo-empty-state" role="status">
            <p>Nenhum perfil encontrado.</p>
            <span>
              {activeApplication !== ALL_APPLICATIONS
                ? "Não há perfis classificados que correspondam à aplicação e à busca informadas."
                : "Confira o código ou o nome digitado e tente novamente."}
            </span>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setActiveApplication(ALL_APPLICATIONS);
                setVisibleCount(12);
              }}
            >
              Limpar busca
            </button>
          </div>
        )}

        {/* Load More Action */}
        {visibleCount < filteredProducts.length && (
          <div className="catalogo-load-more">
            <button
              onClick={() => setVisibleCount((prev) => prev + 16)}
              className="catalogo-load-more-btn"
            >
              Carregar mais molduras ({filteredProducts.length - visibleCount} restantes)
            </button>
          </div>
        )}

      </div>

      {/* Details Modal */}
      {selectedProduct && (
        <MolduraModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onRequestQuote={handleRequestQuote}
        />
      )}
    </section>
  );
}
