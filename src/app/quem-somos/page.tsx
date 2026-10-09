import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import aboutHeroImage from "../../../Assets/institucional/03-sobre-nos-clean.webp";
import aboutProfileImage from "../../../Assets/institucional/05-andressa-moldura-clean.webp";

export const metadata: Metadata = {
  title: "Quem somos",
  description: "Conheça a Decorat e o trabalho que une arquitetura, precisão e fabricação personalizada de molduras em EPS.",
  alternates: { canonical: "/quem-somos" },
};

export default function AboutPage() {
  return (
    <main id="conteudo" tabIndex={-1} className="about-page">
      <SiteHeader active="about" />

      {/* HERO SECTION */}
      <section className="about-hero">
        <div className="about-hero-content">
          <div className="about-label">
            <p>QUEM SOMOS</p>
            <span>Desde 2019</span>
          </div>
          <div className="about-copy">
            <h1>
              Molduras começam<br />
              no projeto, <em>não na produção.</em>
            </h1>
            <p>
              Desde 2019, transformamos referências e projetos em molduras arquitetônicas para fachadas e interiores.
            </p>
            <p>
              Nossa fábrica fica em Campo Grande, Mato Grosso do Sul, e atende projetos em todo o território nacional.
            </p>
            <p>
              Cada peça nasce com atenção às proporções, medidas e detalhes que fazem o projeto funcionar na obra.
            </p>
            <Link className="button-primary" href="/contato">
              Enviar projeto <b>→</b>
            </Link>
          </div>
        </div>
        <div className="about-hero-visual">
          <Image src={aboutHeroImage} alt="Andressa Lubian na fábrica da Decorat com perfis de molduras em EPS" fill sizes="(max-width: 767px) 100vw, 45vw" priority />
        </div>
      </section>

      {/* STORY SECTION */}
      <section className="about-story section">
        <div className="about-story-grid">
          <div className="about-story-heading">
            <p className="about-kicker">NOSSA HISTÓRIA</p>
            <h2>Uma história construída entre <em>arquitetura e produção.</em></h2>
            <div className="about-facts">
              <span>
                <b>Desde 2019</b>
                <small>Campo Grande — MS</small>
              </span>
              <span>
                <b>Atendimento nacional</b>
                <small>Envio para todo o Brasil</small>
              </span>
            </div>
          </div>
          <div className="about-story-text">
            <p>
              A Decorat fabrica molduras externas e internas em EPS e desenvolve soluções personalizadas conforme o projeto e a necessidade de cada cliente.
            </p>
            <p>
              Durante os últimos anos da faculdade de Arquitetura, Andressa Lubian teve seu primeiro contato com esse universo por meio de um estágio. Depois da formação, antigos clientes continuaram procurando por esse tipo de solução.
            </p>
            <p>
              Foi dessa oportunidade, junto com Thiago, que nasceu a Decorat. O que começou com experiência técnica e alguns projetos foi se transformando em uma fábrica especializada em molduras arquitetônicas personalizadas.
            </p>
          </div>
        </div>
      </section>

      <section className="about-profile section" aria-labelledby="about-profile-title">
        <div className="about-profile-visual">
          <Image src={aboutProfileImage} alt="Andressa Lubian segurando uma moldura arquitetônica Decorat" fill sizes="(max-width: 767px) 100vw, 44vw" />
        </div>
        <div className="about-profile-copy">
          <p className="about-kicker">ARQUITETURA PRÓXIMA DA FABRICAÇÃO</p>
          <h2 id="about-profile-title">Decisões técnicas com olhar para o resultado final.</h2>
          <p>
            A presença da arquitetura dentro da fábrica aproxima intenção e execução. Antes da produção, referências, proporções e medidas são analisadas para que a solução faça sentido no conjunto da obra.
          </p>
          <p>
            Esse acompanhamento orienta o desenvolvimento de perfis personalizados e deixa o processo mais claro para clientes, arquitetos e profissionais da construção.
          </p>
        </div>
      </section>

      {/* DIFFERENTIAL SECTION */}
      <section className="about-differential section">
        <div className="about-differential-grid">
          <div className="about-diff-main">
            <p className="about-kicker">NOSSO DIFERENCIAL</p>
            <h2>O olhar de uma arquiteta dentro da fábrica.</h2>
            <p>
              Na Decorat, o projeto não chega simplesmente para ser produzido. Cada trabalho passa por análise de medidas, proporções, referências e detalhes antes de chegar à fabricação.
            </p>
            <p>
              Andressa acompanha de perto essa etapa, conectando o olhar arquitetônico ao processo produtivo para que cada peça faça sentido dentro do projeto.
            </p>
            <blockquote className="about-quote-box">
              <p>“O objetivo não é simplesmente produzir uma moldura. É fazer com que aquilo que foi pensado no projeto funcione na obra.”</p>
              <cite>Andressa Lubian · Arquitetura e direção de projetos</cite>
            </blockquote>
          </div>
          <div className="about-pillars-column">
            <div className="about-pillar-item">
              <b>01</b>
              <strong>Projeto</strong>
              <span>Entendemos o que foi planejado.</span>
            </div>
            <div className="about-pillar-item">
              <b>02</b>
              <strong>Precisão</strong>
              <span>Conferimos medidas e detalhes antes da produção.</span>
            </div>
            <div className="about-pillar-item">
              <b>03</b>
              <strong>Fabricação</strong>
              <span>Transformamos o projeto em peças prontas.</span>
            </div>
          </div>
        </div>
      </section>

      {/* PERSONALIZATION & PRODUCTION SECTION */}
      <section className="about-production-block section">
        <div className="about-production-grid">
          <div className="about-prod-col">
            <p className="about-kicker">CADA PROJETO PEDE UMA SOLUÇÃO DIFERENTE</p>
            <h2>Personalização para fazer sentido no conjunto.</h2>
            <p>
              Não trabalhamos apenas com modelos prontos. Muitos projetos exigem ajustes de dimensões, proporções ou até o desenvolvimento de peças específicas.
            </p>
            <p>
              Por isso, nossa produção permite trabalhar de forma personalizada, respeitando as necessidades de cada fachada, ambiente ou projeto arquitetônico.
            </p>
          </div>
          <div className="about-prod-col">
            <p className="about-kicker">ONDE PROJETO E FABRICAÇÃO SE ENCONTRAM</p>
            <h2>Precisão antes do corte.</h2>
            <p>
              Por trás de cada peça existe um processo de conferência, preparação e produção. Antes do corte, medidas e detalhes são definidos e validados para reduzir erros e garantir mais segurança na fabricação.
            </p>
            <p>
              Esse cuidado acompanha a Decorat desde o início: evoluir processos, melhorar a produção e entregar peças cada vez mais precisas.
            </p>
          </div>
        </div>
      </section>

      {/* ROLE SECTION */}
      <section className="about-role section">
        <div className="about-role-container">
          <p className="about-kicker">NOSSO PAPEL VAI ALÉM DE FABRICAR</p>
          <h2>Orientação para o projeto seguir bem até a obra.</h2>
          <div className="about-role-text">
            <p>
              Sabemos que o resultado final depende de diferentes etapas da obra. Por isso, mesmo sendo especialistas na fabricação das molduras, também orientamos nossos clientes durante o processo e, quando necessário, indicamos profissionais parceiros para instalação.
            </p>
            <p>
              Para projetos que precisam de uma atenção adicional, também disponibilizamos acompanhamento técnico como serviço complementar.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="about-cta">
        <div className="about-cta-content">
          <p className="about-kicker">UM BOM RESULTADO COMEÇA ANTES DO CORTE</p>
          <h2>Já tem um projeto, uma referência ou apenas uma ideia?</h2>
          <span>Nossa equipe pode analisar e orientar sobre as possibilidades.</span>
        </div>
        <Link className="button-primary" href="/contato">
          Enviar projeto <b>→</b>
        </Link>
      </section>

      <SiteFooter />
    </main>
  );
}
