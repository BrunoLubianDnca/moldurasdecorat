import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato e orçamento",
  description: "Envie seu projeto para a Decorat e solicite orientação para molduras arquitetônicas em EPS.",
  alternates: { canonical: "/contato" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
