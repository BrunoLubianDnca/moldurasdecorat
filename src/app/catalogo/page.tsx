import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CatalogoDigital from "@/components/CatalogoDigital";

export const metadata: Metadata = {
  title: "Catálogo de Perfis",
  description: "Catálogo completo de molduras em EPS Decorat. Modelos, medidas e especificações técnicas.",
  alternates: { canonical: "/catalogo" },
};

export default function CatalogoPage() {
  return (
    <main id="conteudo" tabIndex={-1} className="catalogo-page">
      <SiteHeader active="catalogo" />
      <CatalogoDigital />
      <SiteFooter />
    </main>
  );
}

