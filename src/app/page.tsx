"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { ChevronLeft, ChevronRight, X, Ruler, Truck, ShieldCheck, FileText, ScanLine, CheckCircle2, Package, Wrench, Lightbulb, MessageSquare, ImageIcon, Pencil, FileCheck, ArrowRight } from "lucide-react";
import { InstagramBrandIcon, WhatsAppBrandIcon } from "@/components/BrandIcons";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { createWhatsAppUrl, siteConfig } from "@/config/site";
import {
  applicationContexts,
  buildPreAttendanceMessage,
  hasPreAttendanceContext,
  projectStageContexts,
  readPreAttendanceContext,
  type PreAttendanceContext,
} from "@/lib/preAtendimento";
import heroImage from "../../Assets/imagens/layout.png";
import categoryExternal from "../../Assets/Fotos empresa oficial/WhatsApp Image 2026-10-05 at 17.48.53 (2).jpeg";
import categoryBoiserie from "../../Assets/Fotos empresa oficial/WhatsApp Image 2026-10-05 at 17.49.09.jpeg";
import categoryWindow from "../../Assets/Fotos empresa oficial/WhatsApp Image 2026-10-05 at 17.48.54.jpeg";
import categoryPillar from "../../Assets/imagens/imagem_008.jpg";
import beforeImage from "../../Assets/imagens_isoframe/Vista-2.jpg";
import afterImage from "../../Assets/imagens_isoframe/Vista-1.jpg";

const InstagramEmbed = dynamic(
  () => import("react-social-media-embed").then((module) => module.InstagramEmbed),
  { ssr: false, loading: () => <div className="instagram-embed-loading" aria-hidden="true" /> },
);

const instagramReels = [
  { number: "01", url: "https://www.instagram.com/reel/DbD5LU4uIbR/" },
  { number: "02", url: "https://www.instagram.com/reel/DeR411EBfWa/" },
  { number: "03", url: "https://www.instagram.com/reel/DeIPml_uRYS/" },
];

const WHATSAPP_URL = createWhatsAppUrl();
const INSTAGRAM_URL = siteConfig.instagramUrl;
const ADDRESS_URL = siteConfig.addressUrl;

const processSteps = [
  ["01", "Envie seu projeto", "Referências, fotos e medidas pelo WhatsApp.", FileText],
  ["02", "Análise e medição", "Análise inicial e conferência em obra quando necessária.", ScanLine],
  ["03", "Definição das molduras", "Ajustes e esboço técnico conforme o projeto.", Ruler],
  ["04", "Plano de corte e aprovação", "Você revisa as peças e medidas antes da produção.", CheckCircle2],
  ["05", "Produção", "A fabricação começa após a aprovação final.", Package],
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
  const [preAttendanceOpen, setPreAttendanceOpen] = useState(false);
  const [attendanceStep, setAttendanceStep] = useState(0);
  const [visitorName, setVisitorName] = useState("");
  const [projectInterest, setProjectInterest] = useState("");
  const [customInterest, setCustomInterest] = useState("");
  const [projectContext, setProjectContext] = useState("");
  const [attendanceContext, setAttendanceContext] = useState<PreAttendanceContext>({});
  const [whatsappCountdown, setWhatsappCountdown] = useState<number | null>(null);
  const [activeInstagramReel, setActiveInstagramReel] = useState(0);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const reviewsRailRef = useRef<HTMLDivElement>(null);
  const [catalogLeadName, setCatalogLeadName] = useState("");
  const [catalogLeadEmail, setCatalogLeadEmail] = useState("");
  const [catalogLeadStatus, setCatalogLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const attendancePanelRef = useRef<HTMLElement>(null);
  const attendanceLastFocusedElement = useRef<HTMLElement | null>(null);
  const attendanceContextInitialized = useRef(false);
  const markExitConversion = useCallback(() => window.sessionStorage.setItem(exitIntentStorageKey, "true"), []);

  useEffect(() => {
    if (attendanceContextInitialized.current) return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("atendimento") !== "1") return;

    const incomingContext = readPreAttendanceContext(params);
    const initializationTimer = window.setTimeout(() => {
      if (attendanceContextInitialized.current) return;
      attendanceContextInitialized.current = true;
      setAttendanceContext(incomingContext);
      if (incomingContext.application) {
        setProjectInterest(applicationContexts[incomingContext.application].interest);
      }
      attendanceLastFocusedElement.current = document.activeElement as HTMLElement;
      setAttendanceStep(0);
      setWhatsappCountdown(null);
      setPreAttendanceOpen(true);
      markExitConversion();
    }, 0);

    return () => window.clearTimeout(initializationTimer);
  }, [markExitConversion]);

  const scrollToReview = (index: number) => {
    const rail = reviewsRailRef.current;
    if (!rail) return;
    const card = rail.firstElementChild as HTMLElement | null;
    if (!card) return;
    const gap = Number.parseFloat(window.getComputedStyle(rail).gap) || 16;
    rail.scrollTo({ left: index * (card.offsetWidth + gap), behavior: "smooth" });
    setActiveReviewIndex(index);
  };

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

  const openPreAttendanceWithContext = (context: PreAttendanceContext = {}) => {
    markExitConversion();
    attendanceLastFocusedElement.current = document.activeElement as HTMLElement;
    setAttendanceStep(0);
    setWhatsappCountdown(null);
    setAttendanceContext(context);
    setProjectInterest(context.application ? applicationContexts[context.application].interest : "");
    setCustomInterest("");
    setProjectContext("");
    setPreAttendanceOpen(true);
  };

  const openPreAttendance = () => openPreAttendanceWithContext();

  const selectedInterest = projectInterest === otherProjectInterest ? customInterest : projectInterest;
  const contextSummary = [
    attendanceContext.application ? `Aplicação: ${applicationContexts[attendanceContext.application].label}` : "",
    attendanceContext.projectStage ? `Etapa: ${projectStageContexts[attendanceContext.projectStage]}` : "",
    attendanceContext.profileCode ? `Perfil: ${attendanceContext.profileCode}` : "",
  ].filter(Boolean).join(" · ");
  const continueAfterName = () => setAttendanceStep(projectInterest ? 2 : 1);
  const whatsappMessage = buildPreAttendanceMessage({
    visitorName,
    selectedInterest,
    referencesContext: projectContext,
    context: attendanceContext,
  });
  const whatsappPreAttendanceUrl = `${WHATSAPP_URL}&text=${encodeURIComponent(whatsappMessage)}`;

  const submitCatalogLead = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = catalogLeadName.trim();
    const email = catalogLeadEmail.trim().toLowerCase();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (name.length < 2 || !validEmail) {
      setCatalogLeadStatus("error");
      return;
    }

    setCatalogLeadStatus("loading");
    const leadMessage = `Olá! Meu nome é ${name} e baixei o catálogo digital da Decorat. Meu e-mail é ${email}. Gostaria de receber mais informações.`;
    const whatsappWindow = window.open(createWhatsAppUrl(leadMessage), "_blank");
    if (whatsappWindow) whatsappWindow.opener = null;

    const downloadLink = document.createElement("a");
    downloadLink.href = "/catalogo-decorat.pdf";
    downloadLink.download = "Catalogo-Decorat.pdf";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    setCatalogLeadStatus("success");
  };

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
          <span>Molduras arquitetônicas em EPS sob medida para fachadas e interiores — com fabricação especializada e envio para todo o Brasil.</span>
          <div className="hero-actions"><button className="button-primary" type="button" onClick={openPreAttendance}>Solicitar orçamento <b>→</b></button><a className="hero-secondary" href="/catalogo">Explorar catálogo <b>→</b></a></div>
          <div className="hero-benefits"><span><Ruler /> <b>Sob medida</b><small>para o seu projeto</small></span><span><Truck /> <b>Envio para</b><small>todo o Brasil</small></span><span><ShieldCheck /> <b>Pronto para</b><small>aplicação na obra</small></span></div>
        </div>
        <div className="hero-photo"><Image src={heroImage} alt="Fachada residencial com molduras Decorat" fill priority sizes="70vw" /><div className="hero-callout">Detalhes<br />que valorizam<br />o seu projeto.<i /></div></div>
      </section>

      <section className="eps-benefits section home-service" id="molduras-em-eps">
        <div className="eps-benefits-inner">
          <div className="eps-benefits-heading">
            <p>MOLDURAS EM EPS</p>
            <h2>Leveza, resistência e liberdade para criar.</h2>
          </div>
          <div className="eps-benefits-content">
            <div className="eps-benefits-copy">
              <p>As molduras em EPS permitem criar detalhes arquitetônicos com leveza, resistência e liberdade de formas.</p>
              <p>Podem ser aplicadas em fachadas e interiores, valorizando elementos como janelas, portas, platibandas, beirais, colunas, marquises, volumes, ripados e outros detalhes do projeto.</p>
            </div>
            <ul className="eps-benefits-list">
              {["Agilidade na construção", "Sustentabilidade ambiental", "Economia de materiais", "Flexibilidade arquitetônica", "Execução precisa de detalhes", "Durabilidade e estética"].map(benefit => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="technical home-service-proof"><div><ShieldCheck /><b>Leve e resistente</b><span>EPS revestido com argamassa para um acabamento durável.</span></div><div><Ruler /><b>Feito sob medida</b><span>Perfis e dimensões definidos conforme o seu projeto.</span></div><div><Wrench /><b>Pronto para aplicar</b><span>Peças para fachadas e interiores, com orientação de instalação.</span></div></div>

          <div className="reviews home-reviews" aria-labelledby="reviews-title">
            <div className="reviews-heading"><p>AVALIAÇÕES NO GOOGLE</p><h2 id="reviews-title">O que nossos <em>clientes dizem.</em></h2><a href={ADDRESS_URL} target="_blank" rel="noreferrer">Ver todas as avaliações <b>→</b></a></div>
            <div className="reviews-rating"><div className="google-mark" aria-hidden="true"><GoogleIcon /></div><div className="reviews-score"><strong>4,7</strong><span aria-label="Avaliação média de 4,7 de 5">★★★★★</span></div><small>24 avaliações no Google</small></div>
            <div className="reviews-carousel-track">
              <div className="reviews-list" ref={reviewsRailRef} onScroll={(event) => {
                const rail = event.currentTarget;
                const card = rail.firstElementChild as HTMLElement | null;
                if (!card) return;
                const gap = Number.parseFloat(window.getComputedStyle(rail).gap) || 16;
                const index = Math.round(rail.scrollLeft / (card.offsetWidth + gap));
                const clamped = Math.max(0, Math.min(googleReviews.length - 1, index));
                setActiveReviewIndex((current) => current === clamped ? current : clamped);
              }}>
                {googleReviews.map(([text, author]) => <blockquote key={author}><p>{text}</p><cite>{author}</cite></blockquote>)}
              </div>
              <div className="reviews-mobile-indicators" role="tablist" aria-label="Navegação das avaliações">
                {googleReviews.map((_, index) => <button key={index} type="button" role="tab" aria-selected={activeReviewIndex === index} aria-label={`Ver avaliação ${index + 1}`} className={`reviews-mobile-dot ${activeReviewIndex === index ? "is-active" : ""}`} onClick={() => scrollToReview(index)} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="projects-editorial section" id="projetos">
        <div className="projects-heading"><p>PROJETOS E APLICAÇÕES</p><h2>O detalhe certo muda a leitura de toda a arquitetura.</h2><span>Mais elegância, valorização e identidade para fachadas e interiores, com soluções sob medida em EPS.</span></div>
        <div className="projects-layout">
          <div className="compare-frame" style={{ "--compare": `${compare}%` } as CSSProperties}><Image src={afterImage} alt="Fachada depois das molduras" fill sizes="(max-width: 767px) 100vw, 64vw" /><div className="before-layer"><Image src={beforeImage} alt="Fachada antes das molduras" fill sizes="(max-width: 767px) 100vw, 64vw" /></div><span className="before-label">Antes</span><span className="after-label">Depois</span><div className="compare-line" style={{ left: `${compare}%` }}><b><ChevronLeft /><ChevronRight /></b></div><input aria-label="Comparar fachada antes e depois" type="range" min="0" max="100" value={compare} onChange={(event) => setCompare(Number(event.target.value))} /></div>
          <div className="projects-gallery">
            <figure><Image src={categoryExternal} alt="Aplicação de molduras externas Decorat em fachada residencial" fill sizes="(max-width: 767px) 80vw, 24vw" /><figcaption>Molduras externas</figcaption></figure>
            <figure><Image src={categoryWindow} alt="Guarnição Decorat aplicada em janela de fachada" fill sizes="(max-width: 767px) 80vw, 24vw" /><figcaption>Guarnições para janelas</figcaption></figure>
            <figure><Image src={categoryBoiserie} alt="Aplicação de filetes e boiseries Decorat" fill sizes="(max-width: 767px) 80vw, 24vw" /><figcaption>Filetes e boiseries</figcaption></figure>
          </div>
        </div>
      </section>

      <section className="solutions-editorial section" id="solucoes">
        <div className="solutions-heading"><p>SOLUÇÕES DECORAT</p><h2>Da escolha do perfil à produção sob medida.</h2><span>Encontre o caminho certo para a etapa atual do seu projeto.</span></div>
        <div className="solutions-composition">
          <a className="solution-feature" href="/molduras-em-eps"><Image src={categoryPillar} alt="Molduras arquitetônicas em EPS aplicadas em projeto" fill sizes="(max-width: 767px) 100vw, 58vw" /><span><small>01 · MOLDURAS EM EPS</small><strong>Leveza e precisão para fachadas e interiores.</strong><b>Conhecer a solução →</b></span></a>
          <div className="solution-list">
            <a href="/catalogo#pecas-premium"><span>02</span><div><small>PEÇAS PREMIUM</small><strong>Perfis, medidas e modelos para especificação.</strong></div><b>→</b></a>
            <a href="#sob-medida"><span>03</span><div><small>SOB MEDIDA</small><strong>Soluções definidas conforme cada projeto.</strong></div><b>→</b></a>
            <a href="#processo"><span>04</span><div><small>COMO FUNCIONA</small><strong>Do envio das referências à produção.</strong></div><b>→</b></a>
          </div>
        </div>
      </section>

      <section className="process section home-process" id="processo">
        <div className="process-intro"><p>COMO FUNCIONA</p><h2>Do primeiro contato à produção</h2></div><div className="process-area"><span className="process-lead"><strong>A produção só começa após a aprovação final do plano de corte.</strong></span><div className="process-grid">{processSteps.map(([number, title, text, Icon]) => <article key={number} tabIndex={0} aria-label={`${number} ${title}`}><b>{number}</b><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div><div className="project-help" id="sob-medida">
            <div className="project-help-info">
              <div className="project-help-kicker-row">
                <span className="project-help-kicker-line" aria-hidden="true" />
                <span className="project-help-kicker">NÃO TEM PROJETO?</span>
              </div>
              <h3 className="project-help-title">
                Não tem projeto?<br />
                <em>A gente ajuda.</em>
              </h3>
              <p className="project-help-lead">
                A partir das suas ideias, referências e fotos, desenvolvemos soluções personalizadas para a definição das molduras.
              </p>

              <div className="project-help-flow" aria-label="Etapas de desenvolvimento sem projeto">
                <div className="project-help-flow-step">
                  <div className="project-help-flow-icon"><MessageSquare aria-hidden="true" /></div>
                  <span>Entendemos<br />sua ideia</span>
                </div>
                <div className="project-help-flow-step">
                  <div className="project-help-flow-icon"><ImageIcon aria-hidden="true" /></div>
                  <span>Analisamos<br />referências</span>
                </div>
                <div className="project-help-flow-step">
                  <div className="project-help-flow-icon"><Pencil aria-hidden="true" /></div>
                  <span>Desenvolvemos<br />a proposta</span>
                </div>
                <div className="project-help-flow-step">
                  <div className="project-help-flow-icon"><FileCheck aria-hidden="true" /></div>
                  <span>Projeto aprovado<br />e produção</span>
                </div>
              </div>

              <p className="project-help-disclaimer">
                Quando necessário, também oferecemos projeto completo como serviço separado, que passa por aprovação e pagamento antes da elaboração do orçamento das molduras.
              </p>
            </div>

            <div className="project-help-cards">
              <article className="project-help-card is-primary">
                <div className="project-help-card-icon" aria-hidden="true">
                  <FileText />
                </div>
                <h4 className="project-help-card-title">Já tenho meu projeto</h4>
                <p className="project-help-card-desc">
                  Envie seu projeto, planta, referências ou fotos para receber o orçamento das molduras.
                </p>
                <button 
                  type="button" 
                  className="project-help-card-btn btn-primary"
                  onClick={() => openPreAttendanceWithContext({ projectStage: "projeto-pronto" })}
                >
                  <span>Enviar meu projeto</span>
                  <span className="project-help-btn-arrow"><ArrowRight aria-hidden="true" /></span>
                </button>
              </article>

              <article className="project-help-card is-secondary">
                <div className="project-help-card-icon" aria-hidden="true">
                  <Lightbulb />
                </div>
                <h4 className="project-help-card-title">Tenho apenas uma ideia</h4>
                <p className="project-help-card-desc">
                  Conte sua ideia e podemos te ajudar a desenvolver o projeto com as melhores soluções.
                </p>
                <button 
                  type="button" 
                  className="project-help-card-btn btn-outline"
                  onClick={() => openPreAttendanceWithContext({ projectStage: "ideia-inicial" })}
                >
                  <span>Quero ajuda da Decorat</span>
                  <ArrowRight aria-hidden="true" />
                </button>
              </article>
            </div>
          </div></div>
      </section>
      <section className="instagram-section instagram-compact section" id="instagram">
        <div className="instagram-copy">
          <p>DECORAT NO INSTAGRAM</p>
          <h2>Inspirações reais para o seu <em>projeto.</em></h2>
          <span>Acompanhe projetos, aplicações e novidades diretamente no Instagram da Decorat.</span>
          <div className="instagram-actions"><a className="button-primary" href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><InstagramBrandIcon /> Seguir no Instagram <b>→</b></a><a className="instagram-more" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Explorar conteúdos <b>→</b></a></div>
        </div>
        <div className="mobile-reels-heading" aria-label={`Últimos Reels: ${activeInstagramReel + 1} de ${instagramReels.length}`}>
          <span>ÚLTIMOS REELS</span>
          <b>{String(activeInstagramReel + 1).padStart(2, "0")} / {String(instagramReels.length).padStart(2, "0")}</b>
        </div>
        <div className="instagram-showcase">
          <div className="instagram-reels" aria-label="Três Reels oficiais da Decorat" onScroll={(event) => {
            const rail = event.currentTarget;
            const firstReel = rail.firstElementChild as HTMLElement | null;
            if (!firstReel) return;
            const gap = Number.parseFloat(window.getComputedStyle(rail).gap) || 0;
            const index = Math.max(0, Math.min(instagramReels.length - 1, Math.round(rail.scrollLeft / (firstReel.offsetWidth + gap))));
            setActiveInstagramReel((current) => current === index ? current : index);
          }}>{instagramReels.map((reel) => <article className="instagram-reel" key={reel.number} aria-label={`Reel oficial da Decorat ${reel.number}`}><InstagramEmbed url={reel.url} width="100%" captioned={false} placeholderDisabled /><a className="reel-external-link" href={reel.url} target="_blank" rel="noreferrer">Abrir Reel oficial {reel.number} no Instagram</a></article>)}</div>
        </div>
      </section>

      <section className="home-budget-cta" id="contato" aria-labelledby="budget-cta-title">
        <div><p>SEU PROJETO, NOSSA ESPECIALIDADE</p><h2 id="budget-cta-title">Vamos transformar seu projeto em realidade?</h2><span>Envie seu projeto, referências ou medidas para uma análise inicial.</span></div>
        <button className="button-primary" type="button" onClick={openPreAttendance}>Solicitar orçamento <b>→</b></button>
      </section>

      <section className="catalog-footer-cta catalog-download-strip" id="catalogo-download" aria-labelledby="catalog-footer-title">
        <div className="catalog-footer-copy">
          <p className="catalog-footer-kicker">CATÁLOGO DIGITAL DECORAT</p>
          <h2 id="catalog-footer-title">Baixe o catálogo oficial Decorat.</h2>
          <span>Consulte modelos, medidas e aplicações para o seu projeto.</span>
          <form className="catalog-lead-form" onSubmit={submitCatalogLead} noValidate>
            <div className="catalog-lead-fields">
              <label htmlFor="catalog-lead-name"><span>Nome</span><input id="catalog-lead-name" name="name" autoComplete="name" value={catalogLeadName} onChange={(event) => { setCatalogLeadName(event.target.value); if (catalogLeadStatus !== "idle") setCatalogLeadStatus("idle"); }} placeholder="Seu nome" required aria-invalid={catalogLeadStatus === "error"} /></label>
              <label htmlFor="catalog-lead-email"><span>E-mail</span><input id="catalog-lead-email" name="email" type="email" inputMode="email" autoComplete="email" value={catalogLeadEmail} onChange={(event) => { setCatalogLeadEmail(event.target.value); if (catalogLeadStatus !== "idle") setCatalogLeadStatus("idle"); }} placeholder="seu@email.com" required aria-invalid={catalogLeadStatus === "error"} /></label>
            </div>
            <button className="button-primary catalog-download-button" type="submit" disabled={catalogLeadStatus === "loading"}>{catalogLeadStatus === "loading" ? "Preparando catálogo..." : "Baixar catálogo"} <b>↓</b></button>
            <p className="catalog-lead-privacy">Ao continuar, o catálogo será baixado e seus dados serão preparados para envio à Decorat pelo WhatsApp.</p>
            {catalogLeadStatus === "error" && <p className="catalog-lead-message is-error" role="alert">Informe um nome e um e-mail válidos.</p>}
            {catalogLeadStatus === "success" && <p className="catalog-lead-message is-success" role="status">Download iniciado. Para registrar seu contato, envie a mensagem aberta no WhatsApp.</p>}
          </form>
          <div className="catalog-footer-actions">
            <a className="catalog-footer-catalog-link" href="/catalogo">Ver catálogo online <b>→</b></a>
          </div>
        </div>
        <div className="catalog-footer-preview" aria-label="Prévia do catálogo digital Decorat">
          <Image className="catalog-mockup-photo" src="/catalogo.png" alt="Catálogo Decorat aberto com aplicações de molduras arquitetônicas e uma edição fechada com a identidade oficial da marca" fill sizes="(max-width: 767px) 100vw, 52vw" priority />
        </div>
      </section>
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
            {attendanceStep === 0 && <div className="attendance-step chat-step"><div className="chat-message chat-bot"><p>Olá! Tudo bem? Vou te fazer só algumas perguntas rápidas pra entender melhor o que você precisa.</p></div>{hasPreAttendanceContext(attendanceContext) && <div className="chat-message chat-bot"><p>Já recebemos este contexto: {contextSummary}.</p></div>}<div className="chat-message chat-bot"><p>Pra começar, como podemos te chamar?</p></div><div className="chat-input-row"><input id="visitor-name" aria-label="Como podemos te chamar?" value={visitorName} onChange={(event) => setVisitorName(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && visitorName.trim()) continueAfterName(); }} placeholder="Digite seu nome" autoFocus /><button type="button" disabled={!visitorName.trim()} onClick={continueAfterName} aria-label="Enviar nome">→</button></div><div className="chat-footer"><span>1 de 3</span><i style={{ "--progress": "33%" } as CSSProperties} /><small>Leva menos de 1 minuto</small></div></div>}
            {attendanceStep === 1 && <div className="attendance-step chat-step"><div className="chat-message chat-user"><p>{visitorName}</p></div><div className="chat-message chat-bot"><p>Prazer, {visitorName}!</p></div><div className="chat-message chat-bot"><p>O que você está buscando para o seu projeto?</p></div><div className="attendance-options">{projectInterests.map((interest) => <button className={projectInterest === interest ? "selected" : ""} key={interest} type="button" onClick={() => { setAttendanceContext((current) => ({ ...current, application: undefined })); setProjectInterest(interest); setAttendanceStep(2); }}>{interest}<b>→</b></button>)}<button className={projectInterest === otherProjectInterest ? "selected" : ""} type="button" onClick={() => { setAttendanceContext((current) => ({ ...current, application: undefined })); setProjectInterest(otherProjectInterest); setCustomInterest(""); }}>{otherProjectInterest}<b>→</b></button></div>{projectInterest === otherProjectInterest && <div className="chat-custom-interest"><div className="chat-message chat-bot"><p>Conta rapidinho o que você está buscando.</p></div><div className="chat-input-row"><input aria-label="O que você está buscando" value={customInterest} onChange={(event) => setCustomInterest(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && customInterest.trim()) setAttendanceStep(2); }} placeholder="Ex.: reforma, acabamento específico, dúvida sobre aplicação..." autoFocus /><button type="button" disabled={!customInterest.trim()} onClick={() => setAttendanceStep(2)} aria-label="Enviar explicação">→</button></div></div>}<div className="chat-footer"><span>2 de 3</span><i style={{ "--progress": "66%" } as CSSProperties} /><small>Leva menos de 1 minuto</small></div><button className="attendance-back" type="button" onClick={() => setAttendanceStep(0)}>Voltar</button></div>}
            {attendanceStep === 2 && <div className="attendance-step chat-step"><div className="chat-message chat-user"><p>{projectInterest === otherProjectInterest ? customInterest : projectInterest}</p></div><div className="chat-message chat-bot"><p>Perfeito, {visitorName}.</p></div><div className="chat-message chat-bot"><p>Você já tem alguma foto, planta ou referência do projeto?</p></div><div className="attendance-options">{projectContexts.map((context) => <button className={projectContext === context ? "selected" : ""} key={context} type="button" onClick={() => { setProjectContext(context); setWhatsappCountdown(3); setAttendanceStep(3); }}>{context}<b>→</b></button>)}</div><div className="chat-footer"><span>3 de 3</span><i style={{ "--progress": "100%" } as CSSProperties} /><small>Leva menos de 1 minuto</small></div><button className="attendance-back" type="button" onClick={() => setAttendanceStep(1)}>Voltar</button></div>}
            {attendanceStep === 3 && <div className="attendance-summary chat-summary"><div className="chat-message chat-user"><p>{projectContext}</p></div><div className="chat-message chat-bot"><p>Ótimo! Com isso já conseguimos entender melhor o que você precisa.</p><p>Vamos continuar pelo WhatsApp? Assim você fala direto com a nossa equipe e pode enviar as referências por lá.</p></div>{whatsappCountdown !== null && <div className="chat-countdown" role="status" aria-live="polite">Abrindo o WhatsApp em <b>{whatsappCountdown}</b>...</div>}<a className="attendance-next" href={whatsappPreAttendanceUrl}>Continuar no WhatsApp <b>→</b></a><div className="chat-footer"><span>3 de 3</span><i style={{ "--progress": "100%" } as CSSProperties} /><small>Leva menos de 1 minuto</small></div><button className="attendance-back" type="button" onClick={() => { setWhatsappCountdown(null); setAttendanceStep(2); }}>Revisar respostas</button></div>}
          </div>
        </section>
      </div>}
    </main>
  );
}
