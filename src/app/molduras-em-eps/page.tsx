import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { CheckCircle2, Package, ShieldCheck, PaintBucket } from "lucide-react";

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

      {/* Aplicações */}
      <section className="section">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="section-heading" style={{ marginBottom: '36px' }}>
            <p>LIBERDADE DE FORMAS</p>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', color: 'var(--deep)', margin: 0 }}>Aplicações arquitetônicas</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
            {["Janelas", "Portas", "Rodapés", "Platibandas", "Beirais", "Colunas", "Pergolados", "Marquises", "Volumes", "Ripados", "Shafts", "Fachadas e interiores"].map(app => (
              <div key={app} style={{ padding: '16px 20px', backgroundColor: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 size={18} color="var(--orange)" />
                <span style={{ fontWeight: 650, color: 'var(--deep)', fontSize: '15px' }}>{app}</span>
              </div>
            ))}
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

