import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { createPreAttendanceHref } from "@/lib/preAtendimento";
import { Package, ShieldCheck, PaintBucket } from "lucide-react";
import fachadaImage from "../../../Assets/institucional/10-fachada-contemporanea-clean.jpg";
import janelasImage from "../../../Assets/3-Categoria-Guarnicoes-e-Janelas.jpg";
import interioresImage from "../../../Assets/2-Categora-Filete-e-Boiseries.jpeg";
import sobMedidaImage from "../../../Assets/institucional/03-sobre-nos-clean.webp";
import styles from "./page.module.css";
import SolutionGuide from "./SolutionGuide";

export const metadata: Metadata = {
  title: "Molduras em EPS",
  description: "Entenda o que são as molduras em EPS, vantagens, aplicações, e detalhes técnicos dos produtos Decorat.",
  alternates: { canonical: "/molduras-em-eps" },
};

const faqs = [
  { question: "Molduras em EPS podem ser usadas em áreas externas?", answer: "Sim, as molduras externas recebem um revestimento cimentício próprio para garantir resistência mecânica e às intempéries, sendo perfeitamente adequadas para fachadas." },
  { question: "Podem receber pintura ou textura?", answer: "Sim. Nossas peças já vão prontas para o acabamento da obra, podendo receber pintura, massa acrílica, textura ou outros revestimentos após a instalação." },
  { question: "É possível fazer peças personalizadas?", answer: "Sim, a grande vantagem do EPS é a liberdade de formas. Podemos adaptar modelos do catálogo ou fabricar peças exclusivas conforme o desenho do seu projeto." },
  { question: "Como são vendidas?", answer: "As molduras lineares são vendidas por metro linear, geralmente em barras de 2 metros. Peças especiais como pilares ou arcos são orçadas por unidade." },
  { question: "É possível reparar uma peça danificada?", answer: "Sim. Danos superficiais ocorridos na obra podem ser facilmente reparados pela equipe de pintura utilizando massa e os devidos cuidados de acabamento." },
  { question: "A Decorat faz instalação?", answer: "A Decorat é fabricante. Nós indicamos equipes parceiras experientes para executar a instalação ou oferecemos serviço de acompanhamento técnico à parte." },
  { question: "A Decorat envia para todo o Brasil?", answer: "Sim. Desenvolvemos embalagens seguras e trabalhamos com transportadoras para enviar nossos produtos para obras em todo o território nacional." },
  { question: "Preciso ter um projeto pronto?", answer: "Não necessariamente. Você pode nos enviar fotos e referências, e nós ajudamos a definir os perfis, oferecendo inclusive elaboração de projeto como serviço adicional se for preciso." }
];

const applicationPaths: Array<{
  index: string;
  title: string;
  description: string;
  image: StaticImageData;
  imageAlt: string;
  href: string;
  action: string;
}> = [
  {
    index: "01",
    title: "Fachadas",
    description: "Molduras, beirais, platibandas e volumes que organizam proporções e valorizam a leitura da arquitetura.",
    image: fachadaImage,
    imageAlt: "Fachada contemporânea executada com molduras arquitetônicas Decorat",
    href: createPreAttendanceHref({ application: "fachadas" }),
    action: "Falar sobre fachadas",
  },
  {
    index: "02",
    title: "Janelas e portas",
    description: "Guarnições e arremates para destacar aberturas e criar transições precisas entre os elementos da fachada.",
    image: janelasImage,
    imageAlt: "Guarnições Decorat aplicadas ao redor de janelas e portas",
    href: createPreAttendanceHref({ application: "janelas-e-portas" }),
    action: "Falar sobre guarnições",
  },
  {
    index: "03",
    title: "Ambientes internos",
    description: "Rodapés, filetes e detalhes lineares para compor paredes e acabamentos com leveza e continuidade visual.",
    image: interioresImage,
    imageAlt: "Aplicação real de filetes e boiseries Decorat em parede",
    href: createPreAttendanceHref({ application: "ambientes-internos" }),
    action: "Falar sobre interiores",
  },
  {
    index: "04",
    title: "Sob medida",
    description: "Perfis adaptados ou peças exclusivas desenvolvidas a partir das referências, medidas e necessidades do projeto.",
    image: sobMedidaImage,
    imageAlt: "Arquiteta Andressa com peças de molduras produzidas pela Decorat",
    href: createPreAttendanceHref({ application: "sob-medida" }),
    action: "Falar sobre sob medida",
  },
];

export default function MoldurasEpsPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <SiteHeader active="molduras-em-eps" />
      
      {/* Hero Header */}
      <section className="section" style={{ backgroundColor: 'var(--paper)', borderBottom: '1px solid var(--line)' }}>
        <div className="catalog-heading" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p>MOLDURAS EM EPS</p>
          <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 56px)', lineHeight: 1.05, fontWeight: 700, color: 'var(--deep)', margin: '0 0 20px' }}>O que são molduras em EPS?</h1>
          <div style={{ fontSize: '17px', lineHeight: 1.6, color: 'var(--ink)', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'center' }}>
            <p>As molduras em EPS são soluções construtivas utilizadas para criar elementos arquitetônicos com leveza, resistência e liberdade de formas.</p>
            <p>Podem substituir soluções tradicionais feitas em pedra, madeira, cimento ou gesso em diferentes aplicações arquitetônicas.</p>
          </div>
        </div>
      </section>

      {/* Descoberta por aplicação */}
      <section className={styles.discovery} id="aplicacoes" aria-labelledby="application-paths-title">
        <div className={styles.discoveryInner}>
          <header className={styles.discoveryHeader}>
            <div>
              <p>DESCUBRA POR APLICAÇÃO</p>
              <h2 id="application-paths-title">Onde as molduras transformam o projeto.</h2>
            </div>
            <p>Escolha o contexto mais próximo da sua necessidade. A equipe Decorat orienta a definição dos perfis e medidas antes da produção.</p>
          </header>

          <SolutionGuide />

          <div className={styles.applicationList}>
            {applicationPaths.map((application, position) => (
              <article className={`${styles.applicationPath} ${position % 2 === 1 ? styles.reverse : ""}`} key={application.title}>
                <div className={styles.applicationImage}>
                  <Image
                    src={application.image}
                    alt={application.imageAlt}
                    fill
                    sizes="(max-width: 760px) 100vw, 58vw"
                  />
                </div>
                <div className={styles.applicationCopy}>
                  <span>{application.index} · APLICAÇÃO</span>
                  <h3>{application.title}</h3>
                  <p>{application.description}</p>
                  <Link href={application.href}>{application.action} <b aria-hidden="true">→</b></Link>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.catalogConnection}>
            <p>Os perfis ainda não estão classificados individualmente por aplicação. Consulte o catálogo completo e confirme a escolha com a equipe técnica.</p>
            <Link href="/catalogo">Consultar os 114 perfis <b aria-hidden="true">→</b></Link>
          </div>
        </div>
      </section>

      {/* Vantagens */}
      <section className="section" style={{ backgroundColor: 'var(--paper)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-heading" style={{ marginBottom: '48px', textAlign: 'center' }}>
            <p>DESEMPENHO E PRATICIDADE</p>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', color: 'var(--deep)', margin: '0 auto' }}>Vantagens e Diferenciais</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            <div style={{ backgroundColor: '#fff', padding: '36px 32px', border: '1px solid var(--line)' }}>
              <Package size={30} color="var(--orange)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--deep)', marginBottom: '12px' }}>Leveza e praticidade</h3>
              <p style={{ lineHeight: 1.6, color: 'var(--muted)', fontSize: '15px', margin: 0 }}>O baixo peso das peças facilita transporte, manuseio e aplicação, tornando o processo mais ágil e reduzindo a necessidade de equipamentos pesados no canteiro.</p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '36px 32px', border: '1px solid var(--line)' }}>
              <PaintBucket size={30} color="var(--orange)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--deep)', marginBottom: '12px' }}>Prontas para o acabamento</h3>
              <p style={{ lineHeight: 1.6, color: 'var(--muted)', fontSize: '15px', margin: 0 }}>As peças externas recebem revestimento cimentício desenvolvido para aplicação externa. Depois da instalação, podem receber pintura, massa acrílica ou textura, integrando-se ao acabamento final da obra.</p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '36px 32px', border: '1px solid var(--line)' }}>
              <ShieldCheck size={30} color="var(--orange)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--deep)', marginBottom: '12px' }}>Durabilidade técnica</h3>
              <p style={{ lineHeight: 1.6, color: 'var(--muted)', fontSize: '15px', margin: 0 }}>Quando aplicadas corretamente, recebendo as proteções de acabamento e manutenção padrão da construção civil, as molduras apresentam alta durabilidade ao longo da vida útil da edificação.</p>
            </div>
          </div>

          <div style={{ marginTop: '48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
             {["Agilidade na construção", "Sustentabilidade ambiental", "Economia de materiais", "Flexibilidade arquitetônica", "Execução precisa de detalhes", "Durabilidade e beleza estética"].map(v => (
              <div key={v} style={{ padding: '14px 18px', borderLeft: '3px solid var(--orange)', backgroundColor: '#fff', fontWeight: 600, fontSize: '15px', color: 'var(--deep)' }}>{v}</div>
             ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div style={{ maxWidth: '840px', margin: '0 auto' }}>
          <div className="section-heading" style={{ marginBottom: '48px', textAlign: 'center' }}>
            <p>TIRA-DÚVIDAS</p>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', color: 'var(--deep)', margin: '0 auto' }}>Perguntas Frequentes (FAQ)</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {faqs.map((faq, index) => (
              <div key={index} style={{ paddingBottom: '24px', borderBottom: '1px solid var(--line)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px', color: 'var(--deep)' }}>{faq.question}</h3>
                <p style={{ color: 'var(--muted)', lineHeight: 1.6, fontSize: '15px', margin: 0 }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="final-cta">
        <div>
          <h2>Tem dúvidas sobre o uso de EPS no seu projeto?</h2>
          <p>Fale com nossa equipe técnica e encontre a melhor solução para sua obra.</p>
        </div>
        <Link className="button-primary" href="/contato">Falar com especialista <b>→</b></Link>
      </section>

      <SiteFooter />
    </main>
  );
}

