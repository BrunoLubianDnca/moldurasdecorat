const whatsappNumber = "5567999257861";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const siteUrl = (configuredUrl || "http://localhost:3000").replace(/\/$/, "");

export const siteConfig = {
  name: "Decorat",
  legalName: "Decorat Fábrica de Molduras em EPS",
  description:
    "Molduras arquitetônicas em EPS, sob medida, para fachadas e interiores. Fabricação especializada em Campo Grande, MS, com envio para todo o Brasil.",
  url: siteUrl,
  whatsappNumber,
  phoneDisplay: "(67) 99925-7861",
  email: "decorat.molduras@gmail.com",
  instagramUrl: "https://www.instagram.com/decorat.molduras/",
  facebookUrl:
    "https://www.facebook.com/people/Decorat-Molduras-em-EPS/100043995587381/?mibextid=LQQJ4d",
  addressUrl:
    "https://www.google.com.br/search?kgmid=/g/11j0j5f7xp&hl=pt-BR&q=DECORAT+FABRICA+DE+MOLDURAS+DE+EPS+(ISOPOR)&shem=epsd1,esd2e,ltae,rimspwouoe,sdpie",
  address: {
    street: "Rua Pintassilgo, 232",
    neighborhood: "Morada Verde",
    city: "Campo Grande",
    region: "MS",
    country: "BR",
  },
} as const;

export function createWhatsAppUrl(message?: string) {
  const baseUrl = `https://api.whatsapp.com/send/?1=pt_BR&phone=${siteConfig.whatsappNumber}`;
  return message ? `${baseUrl}&text=${encodeURIComponent(message)}` : baseUrl;
}
