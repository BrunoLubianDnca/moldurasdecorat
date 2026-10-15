"use client";

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { DecoratLogo, InstagramBrandIcon } from "./BrandIcons";

type SiteHeaderProps = {
  active?: "home" | "about" | "contact" | "catalogo" | "molduras-em-eps";
  ctaHref?: string;
  onCtaClick?: () => void;
  externalCta?: boolean;
};

export default function SiteHeader({ active, ctaHref = "/contato", onCtaClick, externalCta = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLDivElement>(null);
  const solutionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeSolutions = (event: MouseEvent) => {
      if (!solutionsRef.current?.contains(event.target as Node)) setSolutionsOpen(false);
    };
    const closeSolutionsOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSolutionsOpen(false);
    };
    document.addEventListener("pointerdown", closeSolutions);
    document.addEventListener("keydown", closeSolutionsOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeSolutions);
      document.removeEventListener("keydown", closeSolutionsOnEscape);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const navigationFocusable = Array.from(
      mobileNavigationRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [],
    );
    const focusable = [toggleRef.current, ...navigationFocusable].filter(
      (element): element is HTMLElement => Boolean(element),
    );
    navigationFocusable[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusable.length) return;
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
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);
  const cta = (mobile = false) => onCtaClick ? (
    <button className={mobile ? "mobile-menu-cta" : "header-cta"} type="button" onClick={() => { closeMenu(); onCtaClick(); }}>Enviar projeto <b>→</b></button>
  ) : (
    <a className={mobile ? "mobile-menu-cta" : "header-cta"} href={ctaHref} target={externalCta ? "_blank" : undefined} rel={externalCta ? "noreferrer" : undefined} onClick={closeMenu}>Enviar projeto <b>→</b></a>
  );

  return (
    <>
      <div className="top-rule" />
      <header className="site-header">
        <DecoratLogo priority />
        <nav aria-label="Navegação principal">
          <div className="nav-solutions" ref={solutionsRef}>
            <button className={active === "molduras-em-eps" ? "active" : undefined} type="button" aria-expanded={solutionsOpen} aria-controls="solutions-menu" onClick={() => setSolutionsOpen((current) => !current)}>Soluções <ChevronDown aria-hidden="true" /></button>
            <div className={`solutions-menu${solutionsOpen ? " is-open" : ""}`} id="solutions-menu">
              <Link href="/molduras-em-eps" onClick={() => setSolutionsOpen(false)}>Molduras em EPS</Link>
              <Link href="/catalogo#pecas-premium" onClick={() => setSolutionsOpen(false)}>Peças premium</Link>
              <Link href="/#sob-medida" onClick={() => setSolutionsOpen(false)}>Sob medida</Link>
              <Link href="/#processo" onClick={() => setSolutionsOpen(false)}>Como funciona</Link>
            </div>
          </div>
          <Link className={active === "catalogo" ? "active" : undefined} aria-current={active === "catalogo" ? "page" : undefined} href="/catalogo">Catálogo</Link>
          <Link className={active === "about" ? "active" : undefined} aria-current={active === "about" ? "page" : undefined} href="/quem-somos">A Decorat</Link>
        </nav>
        <div className="header-actions">
          <a className="instagram" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram da Decorat"><InstagramBrandIcon /></a>
          {cta()}
          <button ref={toggleRef} className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen((current) => !current)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <div ref={mobileNavigationRef} className={`mobile-navigation${menuOpen ? " is-open" : ""}`} id="mobile-navigation" aria-hidden={!menuOpen}>
          <nav aria-label="Navegação mobile">
            <span className="mobile-solutions-label">Soluções</span>
            <div className="mobile-solutions-links">
              <Link href="/molduras-em-eps" onClick={closeMenu}>Molduras em EPS</Link>
              <Link href="/catalogo#pecas-premium" onClick={closeMenu}>Peças premium</Link>
              <Link href="/#sob-medida" onClick={closeMenu}>Sob medida</Link>
              <Link href="/#processo" onClick={closeMenu}>Como funciona</Link>
            </div>
            <Link aria-current={active === "catalogo" ? "page" : undefined} href="/catalogo" onClick={closeMenu}>Catálogo</Link>
            <Link aria-current={active === "about" ? "page" : undefined} href="/quem-somos" onClick={closeMenu}>A Decorat</Link>
          </nav>
          <a className="mobile-instagram" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><InstagramBrandIcon /> @decorat.molduras</a>
          {cta(true)}
        </div>
      </header>
    </>
  );
}
