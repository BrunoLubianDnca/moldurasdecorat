import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Saiba como a Decorat trata informações enviadas pelos visitantes do site.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPage() {
  return (
    <main id="conteudo" tabIndex={-1} className="legal-page">
      <SiteHeader />
      <article className="legal-content">
        <header>
          <p>PRIVACIDADE E TRANSPARÊNCIA</p>
          <h1>Política de privacidade</h1>
          <span>Última atualização: 9 de outubro de 2026</span>
        </header>

        <section>
          <h2>1. Quem somos</h2>
          <p>A Decorat fabrica molduras arquitetônicas em EPS em Campo Grande, Mato Grosso do Sul, e atende projetos em todo o Brasil.</p>
        </section>

        <section>
          <h2>2. Informações enviadas por você</h2>
          <p>Quando você inicia um atendimento pelo site, pode informar nome, telefone, interesse, referências e detalhes do projeto. O site prepara essas informações para envio pelo WhatsApp; o envio só acontece quando você confirma a conversa no próprio aplicativo.</p>
        </section>

        <section>
          <h2>3. Como usamos essas informações</h2>
          <p>Utilizamos os dados para responder ao contato, analisar solicitações, preparar orçamentos, orientar o projeto e manter o histórico necessário ao atendimento comercial. Não comercializamos dados pessoais.</p>
        </section>

        <section>
          <h2>4. Serviços de terceiros</h2>
          <p>O site pode exibir ou direcionar para serviços como WhatsApp, Instagram, Facebook e Google Maps. Esses serviços possuem políticas próprias e podem processar dados técnicos, cookies ou informações da sua conta quando são acessados.</p>
        </section>

        <section>
          <h2>5. Segurança e conservação</h2>
          <p>Adotamos medidas razoáveis para proteger as informações usadas no atendimento e as conservamos apenas pelo período necessário às finalidades comerciais, legais e de defesa de direitos.</p>
        </section>

        <section>
          <h2>6. Seus direitos</h2>
          <p>Você pode solicitar confirmação de tratamento, acesso, correção ou eliminação de dados, quando aplicável. Para exercer seus direitos ou tirar dúvidas, escreva para <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> ou fale pelo <a href={`https://wa.me/${siteConfig.whatsappNumber}`}>WhatsApp</a>.</p>
        </section>
      </article>
      <SiteFooter />
    </main>
  );
}
