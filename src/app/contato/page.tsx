"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { WhatsAppBrandIcon } from "@/components/BrandIcons";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

import img0 from "../../../Assets/imagens/layout.png";
import img1 from "../../../Assets/Fotos empresa oficial/WhatsApp Image 2026-10-05 at 17.48.53 (2).jpeg";
import img2 from "../../../Assets/Fotos empresa oficial/WhatsApp Image 2026-10-05 at 17.48.54.jpeg";
import img3 from "../../../Assets/Fotos empresa oficial/WhatsApp Image 2026-10-05 at 17.49.09.jpeg";
import img4 from "../../../Assets/Fotos empresa oficial/WhatsApp Image 2026-10-05 at 17.48.53.jpeg";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?1=pt_BR&phone=5567999257861&text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento.";
const ADDRESS_URL = "https://www.google.com.br/search?kgmid=/g/11j0j5f7xp&hl=pt-BR&q=DECORAT+FABRICA+DE+MOLDURAS+DE+EPS+(ISOPOR)&shem=epsd1,esd2e,ltae,rimspwouoe,sdpie";

const galleryImages = [img0, img1, img2, img3, img4];

export default function ContactPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <main id="conteudo" tabIndex={-1} className="contact-page">
      <SiteHeader active="contact" ctaHref={WHATSAPP_URL} externalCta />

      <section className="contact-hero section">
        <div className="contact-hero-copy">
          <p className="contact-kicker">FALE COM A DECORAT</p>
          <h1>Vamos transformar<br />o <em>seu projeto?</em></h1>
          <p>Nossa equipe está pronta para analisar seu projeto e orientar sobre a melhor solução em molduras em EPS.</p>
          <div className="contact-quick-links">
            <a className="contact-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppBrandIcon /><span><b>WhatsApp</b><small>(67) 99925-7861</small></span></a>
            <a href={ADDRESS_URL} target="_blank" rel="noreferrer"><MapPin /><span><b>Campo Grande, MS</b><small>Projetos para todo o Brasil</small></span></a>
          </div>
          <a className="button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Solicitar orçamento <b>→</b></a>
        </div>
        <div className="contact-hero-visual">
          {galleryImages.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Aplicação de molduras Decorat em fachada - Imagem ${index + 1}`}
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
          <a className="contact-address" href={ADDRESS_URL} target="_blank" rel="noreferrer"><MapPin /><span>Rua Pintassilgo, 232<br />Morada Verde, Campo Grande, MS</span></a>
          <a className="contact-map-link" href={ADDRESS_URL} target="_blank" rel="noreferrer">Ver no Google Maps <b>→</b></a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
