import { MapPin } from "lucide-react";
import Link from "next/link";
import { DecoratLogo, FacebookBrandIcon, InstagramBrandIcon, WhatsAppBrandIcon } from "./BrandIcons";

const WHATSAPP_URL = "https://api.whatsapp.com/send/?1=pt_BR&phone=5567999257861";
const INSTAGRAM_URL = "https://www.instagram.com/decorat.molduras/";
const FACEBOOK_URL = "https://www.facebook.com/people/Decorat-Molduras-em-EPS/100043995587381/?mibextid=LQQJ4d";
const ADDRESS_URL = "https://www.google.com.br/search?kgmid=/g/11j0j5f7xp&hl=pt-BR&q=DECORAT+FABRICA+DE+MOLDURAS+DE+EPS+(ISOPOR)&shem=epsd1,esd2e,ltae,rimspwouoe,sdpie";

export default function SiteFooter() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand"><DecoratLogo /><p>Molduras arquitetônicas em EPS</p></div>
        <nav aria-label="Navegação do rodapé"><Link href="/">Home</Link><Link href="/quem-somos">Quem somos</Link><Link href="/#catalogo">Catálogo</Link><Link href="/contato">Contato</Link></nav>
        <div className="footer-contact">
          <strong>Fale com a Decorat</strong><span>Envie suas dúvidas ou seu projeto.</span>
          <div className="footer-contact-links">
            <a className="footer-whatsapp" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><WhatsAppBrandIcon /> WhatsApp</a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer"><InstagramBrandIcon /> @decorat.molduras</a>
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer"><FacebookBrandIcon /> Facebook</a>
          </div>
          <a className="footer-address" href={ADDRESS_URL} target="_blank" rel="noreferrer"><MapPin /> Rua Pintassilgo, 232 · Campo Grande - MS</a>
        </div>
      </div>
      <div className="footer-bottom"><span>© 2026 Decorat. Todos os direitos reservados.</span><span>Campo Grande - MS · Envio para todo o Brasil<br /><a className="footer-credit" href="https://www.instagram.com/dinamicasolucoesdigitais" target="_blank" rel="noreferrer">Desenvolvido por Dinâmica Soluções Digitais</a></span></div>
    </footer>
  );
}
