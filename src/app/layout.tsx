import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import "./premium.css";

export const metadata: Metadata = {
  title: "Decorat | Molduras e Acabamentos",
  description: "Molduras em EPS para fachadas e interiores.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
