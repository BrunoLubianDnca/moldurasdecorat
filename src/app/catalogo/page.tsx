import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CatalogoDigital from "@/components/CatalogoDigital";
import { readPreAttendanceContext } from "@/lib/preAtendimento";

export const metadata: Metadata = {
  title: "Catálogo de Perfis",
  description: "Catálogo completo de molduras em EPS Decorat. Modelos, medidas e especificações técnicas.",
  alternates: { canonical: "/catalogo" },
};

export default async function CatalogoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const contextParams = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === "string") contextParams.set(key, value);
  }
  const initialContext = readPreAttendanceContext(contextParams);

  return (
    <main id="conteudo" tabIndex={-1} className="catalogo-page">
      <SiteHeader active="catalogo" />
      <CatalogoDigital initialContext={initialContext} />
      <SiteFooter />
    </main>
  );
}

