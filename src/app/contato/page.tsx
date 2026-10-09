"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { WhatsAppBrandIcon } from "@/components/BrandIcons";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { createWhatsAppUrl, siteConfig } from "@/config/site";

import facadeImage from "../../../Assets/institucional/07-fachada-residencial-clean.jpg";
import gardenImage from "../../../Assets/institucional/08-detalhe-fachada-jardim-clean.jpg";
import moldingDetailImage from "../../../Assets/institucional/09-detalhe-molduras-clean.jpg";
import contemporaryFacadeImage from "../../../Assets/institucional/10-fachada-contemporanea-clean.jpg";

const WHATSAPP_URL = createWhatsAppUrl("Olá, gostaria de solicitar um orçamento.");

const galleryImages = [
  { src: facadeImage, alt: "Fachada residencial com molduras arquitetônicas Decorat" },
  { src: gardenImage, alt: "Detalhe de moldura Decorat aplicada em área externa" },
  { src: moldingDetailImage, alt: "Detalhe de molduras arquitetônicas aplicadas em fachada residencial" },
  { src: contemporaryFacadeImage, alt: "Fachada contemporânea finalizada com molduras arquitetônicas" },
];

export default function ContactPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryPaused, setGalleryPaused] = useState(false);

  useEffect(() => {
    if (galleryPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [galleryPaused]);

  return (
    <main id="conteudo" tabIndex={-1} className="contact-page">
      <SiteHeader active="contact" ctaHref={WHATSAPP_URL} externalCta />

      <section className="contact-hero section">
        <div className="contact-hero-copy">
          <p className="contact-kicker">FALE COM A DECORAT</p>
          <h1>Vamos transformar<br />o <em>seu projeto?</em></h1>
          <p>Nossa equipe está pronta para analisar seu projeto e orientar sobre a melhor solução em molduras em EPS.</p>
          <div className="contact-quick-links">
            <a className="contact-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppBrandIcon /><span><b>WhatsApp</b><small>{siteConfig.phoneDisplay}</small></span></a>
            <a href={siteConfig.addressUrl} target="_blank" rel="noreferrer"><MapPin /><span><b>Campo Grande, MS</b><small>Projetos para todo o Brasil</small></span></a>
          </div>
          <a className="button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Solicitar orçamento <b>→</b></a>
        </div>
        <div
          className="contact-hero-visual"
          onMouseEnter={() => setGalleryPaused(true)}
          onMouseLeave={() => setGalleryPaused(false)}
          onFocusCapture={() => setGalleryPaused(true)}
          onBlurCapture={() => setGalleryPaused(false)}
          aria-label="Galeria institucional da Decorat"
        >
          {galleryImages.map((image, index) => (
            <Image
              key={index}
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 767px) 100vw, 55vw"
              priority={index === 0}
              className={`contact-gallery-image ${index === currentIndex ? "active" : ""}`}
            />
          ))}
        </div>
      </section>

      <section className="contact-location section">
        <div className="contact-map"><iframe title="Localização da Decorat no Google Maps" src="https://www.google.com/maps?q=Rua%20Pintassilgo%2C%20232%2C%20Campo%20Grande%20-%20MS&output=embed" loading="lazy" /></div>
        <div className="contact-location-card">
          <p className="contact-kicker">NOSSA LOCALIZAÇÃO</p>
          <h2>Campo Grande, MS</h2>
          <p>Atendemos projetos em todo o Brasil.</p>
          <a className="contact-address" href={siteConfig.addressUrl} target="_blank" rel="noreferrer"><MapPin /><span>Rua Pintassilgo, 232<br />Morada Verde, Campo Grande, MS</span></a>
          <a className="contact-map-link" href={siteConfig.addressUrl} target="_blank" rel="noreferrer">Ver no Google Maps <b>→</b></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
