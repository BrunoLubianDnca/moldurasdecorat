"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { DecoratLogo, InstagramBrandIcon } from "./BrandIcons";

const INSTAGRAM_URL = "https://www.instagram.com/decorat.molduras/";

type SiteHeaderProps = {
  active: "home" | "about" | "contact";
  ctaHref?: string;
  onCtaClick?: () => void;
  externalCta?: boolean;
};

export default function SiteHeader({ active, ctaHref = "/contato", onCtaClick, externalCta = false }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
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
          <Link className={active === "home" ? "active" : undefined} aria-current={active === "home" ? "page" : undefined} href="/">Home</Link>
          <Link className={active === "about" ? "active" : undefined} aria-current={active === "about" ? "page" : undefined} href="/quem-somos">Quem somos</Link>
          <Link href="/#catalogo">Catálogo</Link>
          <Link className={active === "contact" ? "active" : undefined} aria-current={active === "contact" ? "page" : undefined} href="/contato">Contato</Link>
        </nav>
        <div className="header-actions">
          <a className="instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram da Decorat"><InstagramBrandIcon /></a>
          {cta()}
          <button ref={toggleRef} className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen((current) => !current)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
        <div className={`mobile-navigation${menuOpen ? " is-open" : ""}`} id="mobile-navigation">
          <nav aria-label="Navegação mobile">
            <Link aria-current={active === "home" ? "page" : undefined} href="/" onClick={closeMenu}>Home</Link>
            <Link aria-current={active === "about" ? "page" : undefined} href="/quem-somos" onClick={closeMenu}>Quem somos</Link>
            <Link href="/#catalogo" onClick={closeMenu}>Catálogo</Link>
            <Link aria-current={active === "contact" ? "page" : undefined} href="/contato" onClick={closeMenu}>Contato</Link>
          </nav>
          <a className="mobile-instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><InstagramBrandIcon /> @decorat.molduras</a>
          {cta(true)}
        </div>
      </header>
    </>
  );
}
