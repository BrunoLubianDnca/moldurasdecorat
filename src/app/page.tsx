"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { ChevronLeft, ChevronRight, X, Ruler, Truck, ShieldCheck, FileText, ScanLine, CheckCircle2, Package, Wrench } from "lucide-react";
import { InstagramBrandIcon, WhatsAppBrandIcon } from "@/components/BrandIcons";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import heroImage from "../../Assets/imagens/layout.png";
import categoryExternal from "../../Assets/Fotos empresa oficial/WhatsApp Image 2026-10-05 at 17.48.53 (2).jpeg";
import categoryBoiserie from "../../Assets/Fotos empresa oficial/WhatsApp Image 2026-10-05 at 17.49.09.jpeg";
import categoryWindow from "../../Assets/Fotos empresa oficial/WhatsApp Image 2026-10-05 at 17.48.54.jpeg";
import categoryPillar from "../../Assets/imagens/imagem_008.jpg";
import categoryPanels from "../../Assets/blocos-e-paineis.jpg";
import productBoiserie from "../../Assets/peças/Boiserie Clássica — BI00210.png";
import productSanca from "../../Assets/peças/sanca Iluminada — SIC00235.png";
import productPilar from "../../Assets/peças/Pilar Decorativo — PI00380.png";
import productFilete from "../../Assets/peças/Filete Externo — FI00215.png";
import beforeImage from "../../Assets/imagens_isoframe/Vista-2.jpg";
import afterImage from "../../Assets/imagens_isoframe/Vista-1.jpg";
import instagramThumbOne from "../../Assets/imagens/imagem_010.jpg";
import instagramThumbTwo from "../../Assets/imagens/imagem_011.jpg";
import instagramThumbThree from "../../Assets/imagens/imagem_012.jpg";

const categories = [
  { name: "Molduras externas", description: "Beirais, platibandas e acabamentos de fachada.", image: categoryExternal },
  { name: "Filetes e boiseries", description: "Linhas e detalhes que valorizam paredes e fachadas.", image: categoryBoiserie },
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
  { number: "01", title: "Apresentação da Decorat", url: "https://www.instagram.com/reel/DW9-kGPBpSp/", image: instagramThumbOne },
  { number: "02", title: "Informações para realizar o projeto", url: "https://www.instagram.com/reel/DWEmuqBx0GY/", image: instagramThumbTwo },
  { number: "03", title: "Como é feita a moldura em EPS", url: "https://www.instagram.com/reel/DYiZfV7BYAj/", image: instagramThumbThree },
  { number: "04", title: "Antes e depois", url: "https://www.instagram.com/reel/DK97ZY6OqzZ/", image: instagramThumbOne },
  { number: "05", title: "Resultado nível uau", url: "https://www.instagram.com/reel/DIPdWr8twuw/", image: instagramThumbTwo },
];

const WHATSAPP_URL = "https://api.whatsapp.com/send/?1=pt_BR&phone=5567999257861";
const INSTAGRAM_URL = "https://www.instagram.com/decorat.molduras/";
const ADDRESS_URL = "https://www.google.com.br/search?kgmid=/g/11j0j5f7xp&hl=pt-BR&q=DECORAT+FABRICA+DE+MOLDURAS+DE+EPS+(ISOPOR)&shem=epsd1,esd2e,ltae,rimspwouoe,sdpie&shndl=30&source=sh/x/loc/osrp/m5/1&kgs=ff1b3324cb3efaff&utm_source=epsd1,esd2e,ltae,rimspwouoe,sdpie,sh/x/loc/osrp/m5/1";

const processSteps = [
  ["01", "Primeiro contato", "Você envia projeto, fotos, referências ou medidas pelo WhatsApp.", FileText],
  ["02", "Análise inicial", "Analisamos o material e preparamos o orçamento.", ScanLine],
  ["03", "Medição e definição", "Conferimos medidas e ajudamos a definir as peças do projeto.", Ruler],
  ["04", "Plano de corte", "Detalhamos peças e medidas para a última conferência.", FileText],
  ["05", "Aprovação", "Após sua aprovação, liberamos as peças para o corte.", CheckCircle2],
  ["06", "Produção", "Fabricamos as molduras personalizadas conforme o projeto aprovado.", Package],
  ["07", "Aplicação e suporte", "A instalação é feita separadamente. Indicamos parceiros e oferecemos acompanhamento técnico adicional.", Wrench],
] as const;

const googleReviews = [
  ["“Atendimento maravilhoso, molduras de qualidade excelentes.”", "Karen Bragagnolo"],
  ["“Trabalho impecável e atendimento e acompanhamento ao cliente do começo ao fim.”", "Yslene Duarte"],
  ["“Atendimento, suporte e materiais excelentes! Melhor de CG e região.”", "Rodrigo Goudard Viana"],
] as const;

const projectInterests = ["Molduras externas", "Filetes e boiseries", "Guarnições para janelas", "Projeto sob medida"];
const otherProjectInterest = "Outro / Quero explicar melhor";
const projectContexts = ["Sim, já tenho", "Ainda não"];
const exitIntentStorageKey = "decorat-exit-popup-seen";

function formatBrazilianPhone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function ExitIntentPopup({ onConversion }: { onConversion: () => void }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [formActive, setFormActive] = useState(false);
  const lastFocusedElement = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLElement>(null);
  const activityTimer = useRef<number | null>(null);
  const pageStartedAt = useRef<number | null>(null);
  const lastMouseY = useRef(0);

  const suppress = () => {
    window.sessionStorage.setItem(exitIntentStorageKey, "true");
    setOpen(false);
  };

  const show = useCallback(() => {
    if (window.sessionStorage.getItem(exitIntentStorageKey) || pageStartedAt.current === null || Date.now() - pageStartedAt.current < 12000 || formActive) return;
    lastFocusedElement.current = document.activeElement as HTMLElement;
    window.sessionStorage.setItem(exitIntentStorageKey, "true");
    setOpen(true);
  }, [formActive]);

  useEffect(() => {
    if (window.sessionStorage.getItem(exitIntentStorageKey)) return;
    pageStartedAt.current = Date.now();
    const startedAt = pageStartedAt.current;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const markActivity = () => {
      if (activityTimer.current !== null) window.clearTimeout(activityTimer.current);
      activityTimer.current = window.setTimeout(() => {
        if (Date.now() - startedAt >= 55000) show();
      }, isMobile ? 55000 : 50000);
    };
    const handleMouseMove = (event: MouseEvent) => {
      if (!isMobile && lastMouseY.current > 80 && event.clientY <= 12) show();
      lastMouseY.current = event.clientY;
      markActivity();
    };
    const handlePotentialConversion = (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest("a[href*='whatsapp'], .whatsapp")) {
        onConversion();
        suppress();
      }
    };
    const events: Array<keyof DocumentEventMap> = ["scroll", "click", "input", "focusin"];
    events.forEach((event) => document.addEventListener(event, markActivity, { passive: true }));
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("click", handlePotentialConversion);
    markActivity();
    return () => {
      if (activityTimer.current !== null) window.clearTimeout(activityTimer.current);
      events.forEach((event) => document.removeEventListener(event, markActivity));
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handlePotentialConversion);
    };
  }, [formActive, onConversion, show]);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") suppress();
      if (event.key !== "Tab" || !modalRef.current) return;
      const focusable = Array.from(modalRef.current.querySelectorAll<HTMLElement>("button, input, a[href]")).filter((element) => !element.hasAttribute("disabled"));
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
    document.addEventListener("keydown", closeOnEscape);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => modalRef.current?.querySelector<HTMLElement>("button, input")?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = previousOverflow;
      lastFocusedElement.current?.focus?.();
    };
  }, [open]);

  const close = () => {
    suppress();
    lastFocusedElement.current?.focus?.();
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || phone.replace(/\D/g, "").length < 10) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    onConversion();
    const message = `Olá, meu nome é ${name.trim()}. Gostaria de receber um orçamento. Meu WhatsApp: ${phone}.`;
    const whatsappUrl = `${WHATSAPP_URL}&text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappUrl, "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;
    else window.open(whatsappUrl, "_self");
    setStatus("success");
  };

  if (!open) return null;
  return <div className="exit-popup-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
    <section className="exit-popup" ref={modalRef} role="dialog" aria-modal="true" aria-labelledby="exit-popup-title">
      <div className="exit-popup-content">
        <button className="exit-popup-close" type="button" onClick={close} aria-label="Fechar popup"><X /></button>
        {status === "success" ? <div className="exit-popup-success"><p className="exit-popup-eyebrow">CONTINUE NO WHATSAPP</p><h2>O WhatsApp foi aberto.</h2><p>Envie a mensagem por lá para nossa equipe analisar o seu projeto.</p><button className="exit-popup-link" type="button" onClick={close}>Continuar no site <b>→</b></button></div> : <><p className="exit-popup-eyebrow">ÚLTIMA CHANCE</p><h2 id="exit-popup-title">Antes de sair, quer receber um <em>orçamento?</em></h2><p className="exit-popup-intro">Leva menos de 1 minuto e é sem compromisso.</p><form onSubmit={submit} onFocus={() => setFormActive(true)}><label htmlFor="exit-name">Nome<input id="exit-name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Como podemos te chamar?" required aria-invalid={status === "error"} /></label><label htmlFor="exit-phone">WhatsApp<input id="exit-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(event) => setPhone(formatBrazilianPhone(event.target.value))} placeholder="(67) 99999-9999" required aria-invalid={status === "error"} /></label>{status === "error" && <p className="exit-popup-error" role="alert">Informe seu nome e um WhatsApp válido.</p>}<button className="exit-popup-submit" type="submit" disabled={status === "loading"}>{status === "loading" ? "Abrindo WhatsApp..." : "Quero receber meu orçamento"} <b>→</b></button></form><button className="exit-popup-link" type="button" onClick={close}>Continuar navegando</button></>}
      </div>
      <div className="exit-popup-image" aria-hidden="true"><Image src={heroImage} alt="" fill sizes="320px" /></div>
    </section>
  </div>;
}

function GoogleIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.27c0-.79-.07-1.55-.2-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.91-4.18 2.91-7.41Z" /><path fill="#34A853" d="M12 21.75c2.63 0 4.83-.87 6.44-2.36l-3.14-2.44c-.87.58-1.98.92-3.3.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.73 9.73 0 0 0 12 21.75Z" /><path fill="#FBBC05" d="M6.54 13.84A5.84 5.84 0 0 1 6.24 12c0-.64.11-1.26.3-1.84V7.64H3.3A9.76 9.76 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.36l3.24-2.52Z" /><path fill="#EA4335" d="M12 6.13c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.82 3.13 14.63 2.25 12 2.25a9.73 9.73 0 0 0-8.7 5.39l3.24 2.52C7.31 7.85 9.46 6.13 12 6.13Z" /></svg>;
}

export default function Home() {
  const [compare, setCompare] = useState(53);
  const [categoryStart, setCategoryStart] = useState(0);
  const [preAttendanceOpen, setPreAttendanceOpen] = useState(false);
  const [attendanceStep, setAttendanceStep] = useState(0);
  const [visitorName, setVisitorName] = useState("");
  const [projectInterest, setProjectInterest] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [projectContext, setProjectContext] = useState("");
  const [whatsappCountdown, setWhatsappCountdown] = useState<number | null>(null);
  const attendancePanelRef = useRef<HTMLElement>(null);
  const attendanceLastFocusedElement = useRef<HTMLElement | null>(null);
  const visibleCategories = Array.from({ length: 4 }, (_, index) => categories[(categoryStart + index) % categories.length]);
  const markExitConversion = useCallback(() => window.sessionStorage.setItem(exitIntentStorageKey, "true"), []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const categoryTimer = window.setInterval(() => {
      setCategoryStart((current) => (current + 1) % categories.length);
    }, 5000);

    return () => window.clearInterval(categoryTimer);
  }, [categoryStart]);

  useEffect(() => {
    if (!preAttendanceOpen) return;
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreAttendanceOpen(false);
        return;
      }
      if (event.key !== "Tab" || !attendancePanelRef.current) return;
      const focusable = Array.from(attendancePanelRef.current.querySelectorAll<HTMLElement>("button:not([disabled]), input:not([disabled]), a[href]"));
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
    document.addEventListener("keydown", handleDialogKeys);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => attendancePanelRef.current?.querySelector<HTMLElement>("input, button, a[href]")?.focus(), 0);
    return () => {
      document.removeEventListener("keydown", handleDialogKeys);
      document.body.style.overflow = previousOverflow;
      attendanceLastFocusedElement.current?.focus?.();
    };
  }, [preAttendanceOpen]);

  const openPreAttendance = () => {
    markExitConversion();
    attendanceLastFocusedElement.current = document.activeElement as HTMLElement;
    setAttendanceStep(0);
    setWhatsappCountdown(null);
    setPreAttendanceOpen(true);
  };

  const selectedInterest = projectInterest === otherProjectInterest ? customInterest : projectInterest;
  const whatsappMessage = `Olá, sou ${visitorName}. Estou buscando ${selectedInterest.toLowerCase()} para o meu projeto. ${projectContext}. Gostaria de falar com um especialista da Decorat.`;
  const whatsappPreAttendanceUrl = `${WHATSAPP_URL}&text=${encodeURIComponent(whatsappMessage)}`;

  useEffect(() => {
    if (attendanceStep !== 3 || whatsappCountdown === null) return;
    if (whatsappCountdown <= 1) {
      window.open(whatsappPreAttendanceUrl, "_self");
      return;
    }
    const countdownTimer = window.setTimeout(() => {
      setWhatsappCountdown((current) => current === null ? null : current - 1);
    }, 1000);
    return () => window.clearTimeout(countdownTimer);
  }, [attendanceStep, whatsappCountdown, whatsappPreAttendanceUrl]);

  return (
    <main id="conteudo" tabIndex={-1} onClick={(event) => {
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
      <SiteHeader active="home" onCtaClick={openPreAttendance} />

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p>MOLDURAS ARQUITETÔNICAS EM EPS</p>
          <h1>Acabamento que transforma a <em>arquitetura.</em></h1>
          <span>Molduras em EPS leves, resistentes e sob medida para fachadas e interiores. Mais beleza, valor e personalidade para o seu projeto.</span>
          <div className="hero-actions"><button className="button-primary" type="button" onClick={openPreAttendance}>Enviar projeto <b>→</b></button><a className="hero-secondary" href="#catalogo">Explorar catálogo <b>→</b></a></div>
          <div className="hero-benefits"><span><Ruler /> <b>Sob medida</b><small>para o seu projeto</small></span><span><Truck /> <b>Envio para</b><small>todo o Brasil</small></span><span><ShieldCheck /> <b>Pronto para</b><small>aplicação na obra</small></span></div>
        </div>
        <div className="hero-photo"><Image src={heroImage} alt="Fachada residencial com molduras Decorat" fill priority sizes="70vw" /><div className="hero-callout">Detalhes<br />que valorizam<br />o seu projeto.<i /></div></div>
      </section>

      <section className="catalog section" id="catalogo">
        <div className="catalog-heading"><p>CATÁLOGO</p><h2>Categorias para cada tipo de projeto.</h2><span>Cada linha resolve uma necessidade de obra, do beiral à peça exclusiva. Consulte modelos e medidas.</span></div>
        <div className="category-grid">{visibleCategories.map((category) => <article className={`category-card${category.name === "Filetes e boiseries" ? " category-card-boiserie" : ""}`} key={category.name}><div className="category-image"><Image src={category.image} alt={category.name} fill loading="eager" sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) 46vw, 24vw" /></div><div className="category-content"><h3>{category.name}</h3><p>{category.description}</p><a href="#contato" aria-label={`Consultar ${category.name}`}>→</a></div></article>)}</div>
        <div className="category-controls"><button type="button" onClick={() => setCategoryStart((current) => (current - 1 + categories.length) % categories.length)} aria-label="Categorias anteriores"><ChevronLeft /></button><button type="button" onClick={() => setCategoryStart((current) => (current + 1) % categories.length)} aria-label="Próximas categorias"><ChevronRight /></button></div>
      </section>

      <section className="products section">
        <div className="section-title-row"><div><p>PEÇAS PREMIUM</p><h2>Perfis selecionados<br />para o seu projeto.</h2></div><a href="#catalogo">Ver todo o catálogo <b>→</b></a></div>
        <div className="product-grid">{products.map((product) => <article className="product-card" key={product.code}><div className="product-visual"><small>{product.family}</small><Image src={product.image} alt={product.name} fill sizes="(max-width: 767px) 45vw, 25vw" /></div><h3>{product.name}</h3><p>{product.code}</p><a href="#contato">Ver detalhes <b>→</b></a></article>)}</div>
      </section>

      <section className="about section" id="quem-somos">
        <div className="about-label"><p>QUEM SOMOS</p><span>Desde 2019</span></div>
        <div className="about-copy"><h2>Mais do que fabricar molduras, <em>entendemos o projeto.</em></h2><p>A Decorat nasceu da experiência da arquiteta Andressa com molduras em EPS. Hoje unimos arquitetura, fabricação e acompanhamento técnico para desenvolver peças personalizadas de acordo com cada projeto.</p><strong>Arquitetura, precisão e fabricação personalizada.</strong><a className="about-link" href="/quem-somos">Conheça a nossa história <b>→</b></a></div>
      </section>

      <section className="comparison section">
        <div className="comparison-copy"><p>ANTES E DEPOIS</p><h2>Veja a <em>grande diferença</em> com as molduras DECORAT.</h2><span>Mais elegância, valorização e identidade para fachadas e interiores, com soluções sob medida em EPS.</span></div>
        <div className="compare-frame" style={{ "--compare": `${compare}%` } as CSSProperties}><Image src={afterImage} alt="Fachada depois das molduras" fill sizes="60vw" /><div className="before-layer"><Image src={beforeImage} alt="Fachada antes das molduras" fill sizes="60vw" /></div><span className="before-label">Antes</span><span className="after-label">Depois</span><div className="compare-line" style={{ left: `${compare}%` }}><b><ChevronLeft /><ChevronRight /></b></div><input aria-label="Comparar antes e depois" type="range" min="0" max="100" value={compare} onChange={(event) => setCompare(Number(event.target.value))} /></div>
      </section>

      <section className="process section" id="processo">
        <div className="process-intro"><p>COMO FUNCIONA</p><h2>Do desenho à obra,<br /><em>sem complicação.</em></h2></div><div className="process-area"><span className="process-lead">Do primeiro contato à produção, cada detalhe é analisado e conferido antes do corte. Somente após sua aprovação iniciamos a produção.</span><div className="process-grid">{processSteps.map(([number, title, text, Icon]) => <article key={number} tabIndex={0} aria-label={`${number} ${title}`}><b>{number}</b><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div><div className="project-help"><div><p>NÃO TEM PROJETO?</p><h3>A gente ajuda a definir.</h3><span>A partir de fotos, referências e ideias, podemos desenvolver esboços. Um projeto mais completo e profissional é contratado separadamente, com orçamento próprio.</span></div><div className="project-help-actions"><button className="button-primary" type="button" onClick={openPreAttendance}>Enviar projeto <b>→</b></button><button className="project-help-link" type="button" onClick={openPreAttendance}>Tenho apenas uma ideia <b>→</b></button></div></div></div>
      </section>
      <section className="technical"><div><ShieldCheck /><b>Leve e resistente</b><span>EPS revestido com argamassa para um acabamento durável.</span></div><div><Ruler /><b>Feito sob medida</b><span>Perfis e dimensões definidos conforme o seu projeto.</span></div><div><Wrench /><b>Pronto para aplicar</b><span>Peças para fachadas e interiores, com orientação de instalação.</span></div></section>

      <section className="reviews section" aria-labelledby="reviews-title">
        <div className="reviews-heading"><p>AVALIAÇÕES NO GOOGLE</p><h2>O que nossos <em>clientes dizem.</em></h2><a href={ADDRESS_URL} target="_blank" rel="noreferrer">Ver todas as avaliações <b>→</b></a></div>
        <div className="reviews-rating"><div className="google-mark" aria-hidden="true"><GoogleIcon /></div><div className="reviews-score"><strong>4,7</strong><span aria-label="Avaliação média de 4,7 de 5">★★★★★</span></div><small>4,724 avaliações no Google</small></div>
        <div className="reviews-list">{googleReviews.map(([text, author]) => <blockquote key={author}><p>{text}</p><cite>{author}</cite></blockquote>)}</div>
      </section>

      <section className="instagram-section section" id="instagram">
        <div className="instagram-copy">
          <p>DECORAT NO INSTAGRAM</p>
          <h2>Inspirações reais para o seu <em>projeto.</em></h2>
          <span>Acompanhe a Decorat no Instagram e veja projetos, aplicações, novidades e inspirações em acabamentos que transformam ambientes.</span>
          <div className="instagram-actions"><a className="button-primary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><InstagramBrandIcon /> Seguir no Instagram <b>→</b></a><a className="instagram-more" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Ver mais posts <b>→</b></a></div>
        </div>
        <div className="instagram-reels">{instagramReels.map((reel) => <article className="instagram-reel" key={reel.number}><Image className="reel-fallback" src={reel.image} alt={reel.title} fill sizes="(max-width: 767px) 82vw, 22vw" loading="lazy" /><iframe src={`${reel.url}embed/`} title={`${reel.title} no Instagram`} loading="lazy" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" /><a className="reel-open" href={reel.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${reel.title} no Instagram`}><span className="reel-overlay">Abrir no Instagram <b>→</b></span></a><strong>{reel.title}</strong></article>)}</div>
      </section>

      <section className="final-cta" id="contato"><div><h2>Seu projeto merece um acabamento <em>à altura.</em></h2><p>Envie suas referências e receba uma orientação personalizada.</p></div><button className="button-primary" type="button" onClick={openPreAttendance}>Enviar projeto <b>→</b></button></section>
      <SiteFooter />
      <button className="whatsapp" type="button" onClick={openPreAttendance} aria-label="Iniciar atendimento com a Decorat"><span>Entre em contato</span><b><WhatsAppBrandIcon /></b></button>
      <ExitIntentPopup onConversion={markExitConversion} />
      {preAttendanceOpen && <div className="attendance-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setPreAttendanceOpen(false); }}>
        <section className="attendance-panel" ref={attendancePanelRef} role="dialog" aria-modal="true" aria-labelledby="attendance-title" aria-describedby="attendance-description">
          <button className="attendance-close" type="button" onClick={() => setPreAttendanceOpen(false)} aria-label="Fechar pré-atendimento"><X /></button>
          <div className="attendance-heading">
            <p>ATENDIMENTO DECORAT</p>
            <h2 id="attendance-title">Vamos conversar sobre o seu projeto.</h2>
            <span id="attendance-description">Em poucos passos, entendemos o que você precisa e te direcionamos para a nossa equipe.</span>
          </div>
          <div className="attendance-chat" aria-live="polite">
            {attendanceStep === 0 && <div className="attendance-step chat-step"><div className="chat-message chat-bot"><p>Olá! Tudo bem? Vou te fazer só algumas perguntas rápidas pra entender melhor o que você precisa.</p></div><div className="chat-message chat-bot"><p>Pra começar, como podemos te chamar?</p></div><div className="chat-input-row"><input id="visitor-name" aria-label="Como podemos te chamar?" value={visitorName} onChange={(event) => setVisitorName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && visitorName.trim()) setAttendanceStep(1); }} placeholder="Digite seu nome" autoFocus /><button type="button" disabled={!visitorName.trim()} onClick={() => setAttendanceStep(1)} aria-label="Enviar nome">→</button></div><div className="chat-footer"><span>1 de 3</span><i style={{ "--progress": "33%" } as CSSProperties} /><small>Leva menos de 1 minuto</small></div></div>}
            {attendanceStep === 1 && <div className="attendance-step chat-step"><div className="chat-message chat-user"><p>{visitorName}</p></div><div className="chat-message chat-bot"><p>Prazer, {visitorName}!</p></div><div className="chat-message chat-bot"><p>O que você está buscando para o seu projeto?</p></div><div className="attendance-options">{projectInterests.map((interest) => <button className={projectInterest === interest ? "selected" : ""} key={interest} type="button" onClick={() => { setProjectInterest(interest); setAttendanceStep(2); }}>{interest}<b>→</b></button>)}<button className={projectInterest === otherProjectInterest ? "selected" : ""} type="button" onClick={() => { setProjectInterest(otherProjectInterest); setCustomInterest(""); }}>{otherProjectInterest}<b>→</b></button></div>{projectInterest === otherProjectInterest && <div className="chat-custom-interest"><div className="chat-message chat-bot"><p>Conta rapidinho o que você está buscando.</p></div><div className="chat-input-row"><input aria-label="O que você está buscando" value={customInterest} onChange={(event) => setCustomInterest(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && customInterest.trim()) setAttendanceStep(2); }} placeholder="Ex.: reforma, acabamento específico, dúvida sobre aplicação..." autoFocus /><button type="button" disabled={!customInterest.trim()} onClick={() => setAttendanceStep(2)} aria-label="Enviar explicação">→</button></div></div>}<div className="chat-footer"><span>2 de 3</span><i style={{ "--progress": "66%" } as CSSProperties} /><small>Leva menos de 1 minuto</small></div><button className="attendance-back" type="button" onClick={() => setAttendanceStep(0)}>Voltar</button></div>}
            {attendanceStep === 2 && <div className="attendance-step chat-step"><div className="chat-message chat-user"><p>{projectInterest === otherProjectInterest ? customInterest : projectInterest}</p></div><div className="chat-message chat-bot"><p>Perfeito, {visitorName}.</p></div><div className="chat-message chat-bot"><p>Você já tem alguma foto, planta ou referência do projeto?</p></div><div className="attendance-options">{projectContexts.map((context) => <button className={projectContext === context ? "selected" : ""} key={context} type="button" onClick={() => { setProjectContext(context); setWhatsappCountdown(3); setAttendanceStep(3); }}>{context}<b>→</b></button>)}</div><div className="chat-footer"><span>3 de 3</span><i style={{ "--progress": "100%" } as CSSProperties} /><small>Leva menos de 1 minuto</small></div><button className="attendance-back" type="button" onClick={() => setAttendanceStep(1)}>Voltar</button></div>}
            {attendanceStep === 3 && <div className="attendance-summary chat-summary"><div className="chat-message chat-user"><p>{projectContext}</p></div><div className="chat-message chat-bot"><p>Ótimo! Com isso já conseguimos entender melhor o que você precisa.</p><p>Vamos continuar pelo WhatsApp? Assim você fala direto com a nossa equipe e pode enviar as referências por lá.</p></div>{whatsappCountdown !== null && <div className="chat-countdown" role="status" aria-live="polite">Abrindo o WhatsApp em <b>{whatsappCountdown}</b>...</div>}<a className="attendance-next" href={whatsappPreAttendanceUrl}>Continuar no WhatsApp <b>→</b></a><div className="chat-footer"><span>3 de 3</span><i style={{ "--progress": "100%" } as CSSProperties} /><small>Leva menos de 1 minuto</small></div><button className="attendance-back" type="button" onClick={() => { setWhatsappCountdown(null); setAttendanceStep(2); }}>Revisar respostas</button></div>}
          </div>
        </section>
      </div>}
    </main>
  );
}
