"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight, Box, Ruler, Search } from "lucide-react";
import catalogDataRaw from "@/data/catalogo.json";
import { createWhatsAppUrl } from "@/config/site";
import MolduraModal, { ProductItem } from "./MolduraModal";

const catalogData = catalogDataRaw as ProductItem[];

export default function CatalogoDigital() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const filterCategories = ["Todos", "Molduras externas", "Filetes", "Guarnições", "Sancas", "Pilares", "Internos", "Personalizados"];

  const filteredProducts = useMemo(() => {
    return catalogData.filter((item) => {
      const matchesSearch =
        item.codigo.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        item.nome.toLowerCase().includes(searchTerm.toLowerCase().trim());
      // For now, if activeCategory is not Todos, we can match it against category or name
      let matchesCategory = true;
      if (activeCategory !== "Todos") {
         matchesCategory = item.categoria?.toLowerCase().includes(activeCategory.toLowerCase()) || item.nome?.toLowerCase().includes(activeCategory.toLowerCase());
         if (activeCategory === "Molduras externas") matchesCategory = true; // Fallback since all are EPS
      }
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const displayedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleWhatsAppQuote = (product: ProductItem) => {
    const text = `Olá! Gostaria de solicitar um orçamento para a moldura ${product.codigo} (${
      product.altura_mm ? `${product.altura_mm}x${product.largura_mm}mm` : "dimensões no catálogo"
    }).`;
    const url = createWhatsAppUrl(text);
    window.open(url, "_blank");
  };

  return (
    <section className="catalogo-digital-section" id="catalogo-digital">
      <div className="catalogo-container">
        
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
              <span><strong>114</strong> perfis disponíveis</span>
            </div>
            <div className="catalogo-toolbar">
              <div className="catalogo-search-box">
                <Search className="catalogo-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar por código (ex: M001)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <div className="catalogo-categories-filter">
          {filterCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`catalogo-category-btn ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Counter Info */}
        <div className="catalogo-meta-bar">
          <span><strong>{displayedProducts.length}</strong> de {filteredProducts.length} perfis exibidos</span>
        </div>

        {/* Product Cards Grid */}
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
          onSelectWhatsApp={handleWhatsAppQuote}
        />
      )}
    </section>
  );
}
