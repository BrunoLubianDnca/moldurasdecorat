import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import heroFacadeImage from "../../../Assets/institucional/10-fachada-contemporanea-clean.jpg";
import architectImage from "../../../Assets/institucional/03-sobre-nos-clean.webp";
import detailFacadeImage from "../../../Assets/institucional/09-detalhe-molduras-clean.jpg";

export const metadata: Metadata = {
  title: "Quem somos",
  description: "Conheça a Decorat e o trabalho que une arquitetura, precisão e fabricação personalizada de molduras em EPS.",
  alternates: { canonical: "/quem-somos" },
};

export default function AboutPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <SiteHeader active="about" />

      {/* 1. Hero Quem Somos */}
      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p>QUEM SOMOS · DESDE 2019</p>
          <h1>Molduras começam<br />no projeto, <em>não na produção.</em></h1>
          <span>Desde 2019, a Decorat atua em Campo Grande, Mato Grosso do Sul, fabricando molduras externas e internas em EPS e atendendo projetos em todo o Brasil.<br/><br/>Produzimos soluções personalizadas de acordo com cada projeto, unindo arquitetura, fabricação e experiência para transformar referências e ideias em peças feitas sob medida.</span>
          <div className="hero-actions">
            <Link className="button-primary" href="/contato">Enviar projeto <b>→</b></Link>
          </div>
        </div>
        <div className="hero-photo">
          <Image src={heroFacadeImage} alt="Fachada contemporânea com molduras arquitetônicas Decorat" fill priority sizes="70vw" />
        </div>
      </section>

      {/* 2. Nossa história */}
      <section className="section" style={{ backgroundColor: 'var(--paper)' }}>
        <div className="catalog-heading" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p>NOSSA HISTÓRIA</p>
          <h2 style={{ margin: '0 auto 24px' }}>Uma história construída<br />entre arquitetura e produção.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px', lineHeight: 1.6, color: 'var(--ink)' }}>
            <p>Nos últimos anos da faculdade de Arquitetura, Andressa Lubian teve seu primeiro contato com molduras em EPS durante um estágio.</p>
            <p>Após sua formação, a empresa onde trabalhava encerrou suas atividades, mas muitos clientes continuaram procurando por esse tipo de solução.</p>
            <p><strong>Em 2019, junto com Thiago, aquela experiência se transformou na Decorat.</strong> Desde então, a empresa une arquitetura, fabricação e experiência para desenvolver molduras personalizadas para cada projeto.</p>
          </div>
        </div>
      </section>

      {/* 3. Andressa */}
      <section className="section" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px, 5vw, 84px)', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 40%', minWidth: '300px', height: 'clamp(400px, 40vw, 600px)', overflow: 'hidden' }}>
           <Image src={architectImage} alt="Andressa Lubian apresentando molduras em EPS" fill style={{ objectFit: 'cover' }} sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
        <div className="process-intro" style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <p>ARQUITETURA DENTRO DA FÁBRICA</p>
          <h2>O olhar de uma arquiteta<br /><em>em cada projeto.</em></h2>
          <span className="process-lead" style={{ marginTop: '24px', display: 'block', fontSize: '15px', lineHeight: 1.6 }}>Andressa acompanha a análise dos projetos, medidas e detalhes antes da produção. Esse olhar aproxima intenção e execução e ajuda a garantir que cada peça faça sentido no conjunto da obra.</span>
          
          <blockquote style={{ marginTop: '34px', paddingLeft: '24px', borderLeft: '3px solid var(--orange)' }}>
            <p style={{ fontSize: 'clamp(16px, 1.5vw, 19px)', fontStyle: 'italic', lineHeight: 1.5, color: 'var(--deep)' }}>“O objetivo não é simplesmente produzir uma moldura. É fazer com que aquilo que foi pensado no projeto funcione na obra.”</p>
            <footer style={{ marginTop: '16px' }}>
              <strong style={{ fontSize: '14px', color: 'var(--deep)' }}>Andressa Lubian</strong><br/>
              <span style={{ fontSize: '12px', color: 'var(--muted)' }}>Arquiteta e sócia da Decorat</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 4. Diferencial */}
      <section className="section" style={{ borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '34px' }}>
          <div style={{ paddingRight: '24px', borderRight: '1px solid var(--line)' }}>
            <b style={{ display: 'block', color: 'var(--orange)', fontSize: '24px', marginBottom: '8px' }}>01</b>
            <h3 style={{ fontSize: '16px', color: 'var(--deep)', fontWeight: 800, marginBottom: '6px' }}>Projeto</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>Entendemos referências, proporções e intenção.</p>
          </div>
          <div style={{ paddingRight: '24px', borderRight: '1px solid var(--line)' }}>
            <b style={{ display: 'block', color: 'var(--orange)', fontSize: '24px', marginBottom: '8px' }}>02</b>
            <h3 style={{ fontSize: '16px', color: 'var(--deep)', fontWeight: 800, marginBottom: '6px' }}>Precisão</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>Conferimos medidas e detalhes antes da produção.</p>
          </div>
          <div>
            <b style={{ display: 'block', color: 'var(--orange)', fontSize: '24px', marginBottom: '8px' }}>03</b>
            <h3 style={{ fontSize: '16px', color: 'var(--deep)', fontWeight: 800, marginBottom: '6px' }}>Fabricação</h3>
            <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.5 }}>Transformamos o projeto em peças sob medida.</p>
          </div>
        </div>
      </section>

      {/* 5. Personalização */}
      <section className="section" style={{ backgroundColor: 'var(--deep)', color: '#fff', textAlign: 'center' }}>
        <div className="comparison-copy" style={{ padding: 0, margin: '0 auto', maxWidth: '800px' }}>
          <p>PERSONALIZAÇÃO</p>
          <h2 style={{ maxWidth: '100%', margin: '0 auto' }}>Personalização para fazer sentido no conjunto.</h2>
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '16px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)' }}>
            <p>Não trabalhamos apenas com modelos prontos.</p>
            <p>As molduras podem ser adaptadas ou desenvolvidas conforme as necessidades do projeto arquitetônico, respeitando proporções, medidas e detalhes da obra.</p>
            <p>Antes da produção, medidas e detalhes passam por conferência para reduzir erros e garantir segurança na fabricação.</p>
          </div>
        </div>
      </section>

      {/* 6. Instalação e Suporte */}
      <section className="section" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(40px, 5vw, 84px)', alignItems: 'center' }}>
        <div className="process-intro" style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <p>INSTALAÇÃO E SUPORTE</p>
          <h2>E depois que as molduras<br />ficam prontas?</h2>
          <div className="process-lead" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', lineHeight: 1.6 }}>
            <p>A Decorat é especializada na fabricação das molduras em EPS.</p>
            <p>A instalação é realizada separadamente e pode ser executada por uma equipe parceira indicada pela Decorat, que já conhece nossos produtos e os cuidados necessários para aplicação.</p>
            <p>Para projetos que precisam de acompanhamento adicional, também oferecemos acompanhamento técnico da instalação como serviço contratado à parte.</p>
          </div>
        </div>
        <div style={{ position: 'relative', flex: '1 1 40%', minWidth: '300px', height: 'clamp(300px, 30vw, 450px)', overflow: 'hidden' }}>
           <Image src={detailFacadeImage} alt="Detalhe de moldura arquitetônica Decorat aplicada em fachada" fill style={{ objectFit: 'cover' }} sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
      </section>

      {/* 7. CTA final */}
      <section className="final-cta">
        <div>
          <h2>Vamos transformar seu projeto em realidade?</h2>
          <p>Envie seu projeto, referências ou medidas para uma análise inicial.</p>
        </div>
        <Link className="button-primary" href="/contato">Enviar projeto <b>→</b></Link>
      </section>

      <SiteFooter />
    </main>
  );
}
