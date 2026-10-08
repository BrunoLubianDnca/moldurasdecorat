import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "./premium.css";
import "./catalogo-digital.css";

export const metadata: Metadata = {
  title: {
    default: "Decorat | Molduras arquitetônicas em EPS",
    template: "%s | Decorat",
  },
  description: "Molduras arquitetônicas em EPS, sob medida, para fachadas e interiores. Projetos com precisão, fabricação especializada e atendimento próximo.",
  applicationName: "Decorat",
  icons: {
    icon: "/decorat-logo.png",
    apple: "/decorat-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Decorat",
    title: "Decorat | Molduras arquitetônicas em EPS",
    description: "Molduras arquitetônicas em EPS, sob medida, para fachadas e interiores.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body><a className="skip-link" href="#conteudo">Pular para o conteúdo</a>{children}</body>
    </html>
  );
}
