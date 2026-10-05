"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight, Ruler, Truck, ShieldCheck, FileText, ScanLine, CheckCircle2, Package, Wrench, MapPin } from "lucide-react";
import heroImage from "../../Assets/imagens/layout.png";
import categoryExternal from "../../Assets/categorias-Molduras-externas.jpeg";
import categoryBoiserie from "../../Assets/2-Categora-Filete-e-Boiseries.jpeg";
import categoryWindow from "../../Assets/3-Categoria-Guarnicoes-e-Janelas.jpg";
import categoryPillar from "../../Assets/pilares.jpeg";
import categoryPanels from "../../Assets/blocos-e-paineis.jpg";
import productBoiserie from "../../Assets/imagens/imagem_006.jpg";
import productSanca from "../../Assets/imagens/imagem_007.jpg";
import productPilar from "../../Assets/imagens/imagem_008.jpg";
import productFilete from "../../Assets/imagens/imagem_009.jpg";
import beforeImage from "../../Assets/imagens_isoframe/Vista-2.jpg";
import afterImage from "../../Assets/imagens_isoframe/Vista-1.jpg";
import installImage from "../../Assets/imagens/imagem_005.jpg";
import instagramThumbOne from "../../Assets/imagens/imagem_010.jpg";
import instagramThumbTwo from "../../Assets/imagens/imagem_011.jpg";
import instagramThumbThree from "../../Assets/imagens/imagem_012.jpg";

const categories = [
  { name: "Molduras externas", description: "Beirais, platibandas e acabamentos de fachada.", image: categoryExternal },
  { name: "Filetes e boiseries", description: "Linhas que valorizam ambientes internos.", image: categoryBoiserie },
  { name: "Guarnições para janelas", description: "Acabamentos que trazem elegância e proteção.", image: categoryWindow },
  { name: "Pilares decorativos", description: "Elementos arquitetônicos para fachadas marcantes.", image: categoryPillar },
  { name: "Blocos e painéis", description: "Texturas e volumes para projetos autorais.", image: categoryPanels },
];

const products: Array<{ family: string; name: string; code: string; image: StaticImageData }> = [
  { family: "BOISERIES INTERNAS", name: "Boiserie Clássica", code: "BI00210", image: productBoiserie },
  { family: "SANCAS EM EPS", name: "Sanca Iluminada", code: "SIC00235", image: productSanca },
  { family: "PILARES DECORATIVOS", name: "Pilar Decorativo", code: "PI00380", image: productPilar },
  { family: "FILETES EXTERNOS", name: "Filete Externo", code: "FI00215", image: productFilete },
];

const instagramReels = [
  { number: "01", title: "Conheça a Decorat", url: "https://www.instagram.com/reel/Cq8W6IUNNgH/", image: instagramThumbOne },
  { number: "02", title: "Projetos e aplicações", url: "https://www.instagram.com/reel/DYiZfV7BYAj/", image: instagramThumbTwo },
  { number: "03", title: "Inspirações em EPS", url: "https://www.instagram.com/reel/DHd6A2nOMUq/", image: instagramThumbThree },
];

const WHATSAPP_URL = "https://api.whatsapp.com/send/?1=pt_BR&phone=5567999257861";
const INSTAGRAM_URL = "https://www.instagram.com/decorat.molduras/";
const ADDRESS_URL = "https://www.google.com.br/search?kgmid=/g/11j0j5f7xp&hl=pt-BR&q=DECORAT+FABRICA+DE+MOLDURAS+DE+EPS+(ISOPOR)&shem=epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/osrp/m5/1&kgs=ff1b3324cb3efaff&utm_source=epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/osrp/m5/1";
const FACEBOOK_URL = "https://www.facebook.com/people/Decorat-Molduras-em-EPS/100043995587381/?mibextid=LQQJ4d";

const processSteps = [
  ["01", "Envio do projeto", "Você envia plantas, fotos ou referências da obra.", FileText],
  ["02", "Análise de medidas", "Conferimos dimensões, encaixes e viabilidade técnica.", ScanLine],
  ["03", "Desenvolvimento", "Desenhamos a peça em EPS com o perfil desejado.", Ruler],
  ["04", "Aprovação", "Você valida desenho, medidas e acabamento.", CheckCircle2],
  ["05", "Produção", "Fabricação e revestimento com argamassa.", Package],
  ["06", "Aplicação na obra", "Entrega e orientação para instalação.", Wrench],
] as const;

function Logo() {
  return <a className="brand" href="#inicio" aria-label="Decorat, início"><Image src="/decorat-logo.png" alt="Decorat" width={280} height={88} priority /></a>;
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>;
}

function InstagramBrandIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.25" y="3.25" width="17.5" height="17.5" rx="4.5" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.65" cy="6.55" r="1.1" fill="currentColor" /></svg>;
}

function FacebookBrandIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M13.65 21v-8h2.7l.4-3.1h-3.1V7.92c0-.9.25-1.52 1.56-1.52h1.67V3.63c-.29-.04-1.28-.13-2.44-.13-2.42 0-4.08 1.48-4.08 4.2V9.9H7.62V13h2.74v8h3.29Z" /></svg>;
}

export default function Home() {
  const [compare, setCompare] = useState(53);
  const [categoryStart, setCategoryStart] = useState(0);
  const visibleCategories = Array.from({ length: 3 }, (_, index) => categories[(categoryStart + index) % categories.length]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const categoryTimer = window.setInterval(() => {
      setCategoryStart((current) => (current + 1) % categories.length);
    }, 5000);

    return () => window.clearInterval(categoryTimer);
  }, []);

  return (
    <main onClick={(event) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const section = document.querySelector(href);
      if (!section) return;
      event.preventDefault();
      window.history.pushState(null, "", href);
      section.scrollIntoView({ behavior: "instant", block: "start" });
    }}>
      <div className="top-rule" />
      <header className="site-header">
        <Logo />
        <nav aria-label="Navegação principal">
          <a className="active" href="#inicio">Home</a><a href="#processo">Quem somos</a><a href="#catalogo">Catálogo</a><a href="#contato">Contato</a>
        </nav>
        <div className="header-actions"><a className="instagram" href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram"><InstagramBrandIcon /></a><a className="header-cta" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Enviar projeto <b>→</b></a></div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p>MOLDURAS ARQUITETÔNICAS EM EPS</p>
          <h1>Acabamento que transforma a <em>arquitetura.</em></h1>
          <span>Molduras em EPS leves, resistentes e sob medida para fachadas e interiores. Mais beleza, valor e personalidade para o seu projeto.</span>
          <div className="hero-actions"><a className="button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Enviar meu projeto <b>→</b></a><a className="hero-secondary" href="#catalogo">Explorar catálogo <b>→</b></a></div>
          <div className="hero-benefits"><span><Ruler /> <b>Sob medida</b><small>para o seu projeto</small></span><span><Truck /> <b>Envio para</b><small>todo o Brasil</small></span><span><ShieldCheck /> <b>Pronto para</b><small>aplicação na obra</small></span></div>
        </div>
        <div className="hero-photo"><Image src={heroImage} alt="Fachada residencial com molduras Decorat" fill priority sizes="70vw" /><div className="hero-callout">Detalhes<br />que valorizam<br />o seu projeto.<i /></div></div>
      </section>

      <section className="catalog section" id="catalogo">
        <div className="catalog-heading"><p>CATÁLOGO</p><h2>Categorias para cada tipo de projeto.</h2><span>Cada linha resolve uma necessidade de obra, do beiral à peça exclusiva. Consulte modelos e medidas.</span></div>
        <div className="category-grid">{visibleCategories.map((category) => <article className="category-card" key={category.name}><div className="category-image"><Image src={category.image} alt={category.name} fill sizes="30vw" /></div><div className="category-content"><h3>{category.name}</h3><p>{category.description}</p><a href="#contato">→</a></div></article>)}</div>
        <div className="category-controls"><button onClick={() => setCategoryStart((current) => (current - 1 + categories.length) % categories.length)} aria-label="Categorias anteriores"><ChevronLeft /></button><button onClick={() => setCategoryStart((current) => (current + 1) % categories.length)} aria-label="Próximas categorias"><ChevronRight /></button></div>
      </section>

      <section className="products section">
        <div className="section-title-row"><div><p>PEÇAS PREMIUM</p><h2>Perfis selecionados<br />para o seu projeto.</h2></div><a href="#catalogo">Ver todo o catálogo <b>→</b></a></div>
        <div className="product-grid">{products.map((product) => <article className="product-card" key={product.code}><div className="product-visual"><small>{product.family}</small><Image src={product.image} alt={product.name} fill sizes="25vw" /></div><h3>{product.name}</h3><p>{product.code}</p><a href="#contato">Ver detalhes <b>→</b></a></article>)}</div>
      </section>

      <section className="comparison section">
        <div className="comparison-copy"><p>ANTES E DEPOIS</p><h2>Veja a <em>grande diferença</em> com as molduras DECORAT.</h2><span>Mais elegância, valorização e identidade para fachadas e interiores, com soluções sob medida em EPS.</span></div>
        <div className="compare-frame" style={{ "--compare": `${compare}%` } as CSSProperties}><Image src={afterImage} alt="Fachada depois das molduras" fill sizes="60vw" /><div className="before-layer"><Image src={beforeImage} alt="Fachada antes das molduras" fill sizes="60vw" /></div><span className="before-label">Antes</span><span className="after-label">Depois</span><div className="compare-line" style={{ left: `${compare}%` }}><b><ChevronLeft /><ChevronRight /></b></div><input aria-label="Comparar antes e depois" type="range" min="0" max="100" value={compare} onChange={(event) => setCompare(Number(event.target.value))} /></div>
      </section>

      <section className="process section" id="processo">
        <div className="process-intro"><p>COMO FUNCIONA</p><h2>Do desenho à obra,<br /><em>sem complicação.</em></h2></div><div className="process-area"><span className="process-lead">Um processo simples, seguro e eficiente para transformar seu projeto em peças exclusivas, com a qualidade Decorat.</span><div className="process-grid">{processSteps.map(([number, title, text, Icon]) => <article key={number} tabIndex={0} aria-label={`${number} ${title}`}><b>{number}</b><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div>
      </section>
      <section className="technical"><div><ShieldCheck /><b>Leve e resistente</b><span>EPS revestido com argamassa para um acabamento durável.</span></div><div><Ruler /><b>Feito sob medida</b><span>Perfis e dimensões definidos conforme o seu projeto.</span></div><div><Wrench /><b>Pronto para aplicar</b><span>Peças para fachadas e interiores, com orientação de instalação.</span></div></section>

      <section className="installation section"><div className="installation-heading"><p>INSTALAÇÃO SIMPLES, RESULTADO PRECISO</p><h2>Como preparar e montar<br />a moldura em <em>EPS.</em></h2></div><div className="installation-content"><Image src={installImage} alt="Instalação de moldura Decorat" width={720} height={600} /><div className="installation-steps"><article><b>01</b><div><h3>Prepare a superfície</h3><p>Superfície limpa, seca e nivelada para melhor fixação e acabamento.</p></div></article><article><b>02</b><div><h3>Fixe a moldura</h3><p>Use espuma expansiva ou argamassa e confira o alinhamento.</p></div></article><article><b>03</b><div><h3>Trate as emendas</h3><p>Aplique tela e faça o acabamento para um resultado limpo e uniforme.</p></div></article></div></div></section>
      <section className="instagram-section section" id="instagram">
        <div className="instagram-copy">
          <p>DECORAT NO INSTAGRAM</p>
          <h2>Inspirações reais para o seu <em>projeto.</em></h2>
          <span>Acompanhe a Decorat no Instagram e veja projetos, aplicações, novidades e inspirações em acabamentos que transformam ambientes.</span>
          <div className="instagram-actions"><a className="button-primary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><InstagramBrandIcon /> Seguir no Instagram <b>→</b></a><a className="instagram-more" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Ver mais posts <b>→</b></a></div>
        </div>
        <div className="instagram-reels">{instagramReels.map((reel) => <article className="instagram-reel" key={reel.number}><Image className="reel-fallback" src={reel.image} alt={reel.title} fill sizes="(max-width: 767px) 82vw, 22vw" loading="lazy" /><iframe src={`${reel.url}embed/`} title={`${reel.title} no Instagram`} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" /><a className="reel-open" href={reel.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${reel.title} no Instagram`}><span className="reel-overlay">Abrir no Instagram <b>→</b></span></a><strong>{reel.title}</strong></article>)}</div>
      </section>

      <section className="final-cta" id="contato"><div><h2>Seu projeto merece um acabamento <em>à altura.</em></h2><p>Envie suas referências e receba uma orientação personalizada.</p></div><a className="button-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Enviar projeto <b>→</b></a></section>
      <footer>
        <div className="footer-main">
          <div className="footer-brand"><Logo /><p>Molduras arquitetônicas em EPS</p></div>
          <nav aria-label="Navegação do rodapé"><a href="#inicio">Home</a><a href="#processo">Quem somos</a><a href="#catalogo">Catálogo</a><a href="#contato">Contato</a></nav>
          <div className="footer-contact"><strong>Fale com a Decorat</strong><span>Envie suas dúvidas ou seu projeto.</span><div className="footer-contact-links"><a className="footer-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppIcon /> WhatsApp</a><a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><InstagramBrandIcon /> @decorat.molduras</a><a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><FacebookBrandIcon /> Facebook</a></div><a className="footer-address" href={ADDRESS_URL} target="_blank" rel="noreferrer"><MapPin /> Rua Pintassilgo, 232 · Campo Grande - MS</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Decorat. Todos os direitos reservados.</span><span>Campo Grande - MS · Envio para todo o Brasil</span></div>
      </footer>
      <a className="whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="Fale com a Decorat no WhatsApp"><span>Fale com a Decorat</span><b><WhatsAppIcon /></b></a>
    </main>
  );
}
