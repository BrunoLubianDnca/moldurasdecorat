import { MapPin } from "lucide-react";
import Link from "next/link";
import { createWhatsAppUrl, siteConfig } from "@/config/site";
import { DecoratLogo, FacebookBrandIcon, InstagramBrandIcon, WhatsAppBrandIcon } from "./BrandIcons";

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand"><DecoratLogo /><p>Molduras arquitetônicas em EPS</p></div>
        <nav aria-label="Navegação do rodapé"><Link href="/">Home</Link><Link href="/quem-somos">Quem somos</Link><Link href="/#catalogo-digital">Catálogo</Link><Link href="/contato">Contato</Link></nav>
        <div className="footer-contact">
          <strong>Fale com a Decorat</strong><span>Envie suas dúvidas ou seu projeto.</span>
          <div className="footer-contact-links">
            <a className="footer-whatsapp" href={createWhatsAppUrl()} target="_blank" rel="noreferrer"><WhatsAppBrandIcon /> WhatsApp</a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer"><InstagramBrandIcon /> @decorat.molduras</a>
            <a href={siteConfig.facebookUrl} target="_blank" rel="noreferrer"><FacebookBrandIcon /> Facebook</a>
          </div>
          <a className="footer-address" href={siteConfig.addressUrl} target="_blank" rel="noreferrer"><MapPin /> Rua Pintassilgo, 232 · Campo Grande - MS</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Decorat. Todos os direitos reservados.<br /><Link className="footer-credit" href="/politica-de-privacidade">Política de privacidade</Link></span><span>Campo Grande - MS · Envio para todo o Brasil<br /><a className="footer-credit" href="https://www.instagram.com/dinamicasolucoesdigitais" target="_blank" rel="noreferrer">Desenvolvido por Dinâmica Soluções Digitais</a></span></div>
    </footer>
  );
}
