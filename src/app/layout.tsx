import type { Metadata } from "next";
import "@fontsource-variable/archivo";
import { siteConfig } from "@/config/site";
import "./premium.css";
import "./catalogo-digital.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Decorat | Molduras arquitetônicas em EPS",
    template: "%s | Decorat",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/decorat-logo.png",
    apple: "/decorat-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Decorat",
    title: "Decorat | Molduras arquitetônicas em EPS",
    description: siteConfig.description,
    url: "/",
    images: [
      {
        url: "/og-decorat.jpg",
        width: 1465,
        height: 1155,
        alt: "Decorat — fábrica de molduras arquitetônicas em EPS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Decorat | Molduras arquitetônicas em EPS",
    description: siteConfig.description,
    images: ["/og-decorat.jpg"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.legalName,
    url: siteConfig.url,
    image: `${siteConfig.url}/og-decorat.jpg`,
    telephone: `+${siteConfig.whatsappNumber}`,
    description: siteConfig.description,
    foundingDate: "2019",
    areaServed: "Brasil",
    sameAs: [siteConfig.instagramUrl, siteConfig.facebookUrl],
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
  };

  return (
    <html lang="pt-BR">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
        {children}
      </body>
    </html>
  );
}
