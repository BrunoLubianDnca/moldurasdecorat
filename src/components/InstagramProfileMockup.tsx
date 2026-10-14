import Image, { type StaticImageData } from "next/image";
import {
  ChevronLeft,
  Clapperboard,
  Grid3X3,
  MoreHorizontal,
  SquareUserRound,
} from "lucide-react";

type InstagramProfileMockupProps = {
  posts: StaticImageData[];
  profileUrl: string;
};

/**
 * Representação editorial do perfil oficial — sem iframe e sem screenshot.
 * Textos, métricas, imagem da marca e temas dos destaques vêm do perfil público
 * da Decorat; as miniaturas usam exclusivamente fotos fornecidas no projeto.
 */
export default function InstagramProfileMockup({ posts, profileUrl }: InstagramProfileMockupProps) {
  return (
    <a
      className="instagram-phone"
      href={profileUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir o perfil oficial decorat.molduras no Instagram"
    >
      <span className="phone-island" aria-hidden="true" />
      <div className="phone-status" aria-hidden="true"><span>9:41</span><span>▮▮▮ ◔</span></div>
      <header className="phone-profile-heading">
        <ChevronLeft aria-hidden="true" />
        <strong>decorat.molduras</strong>
        <MoreHorizontal aria-hidden="true" />
      </header>

      <div className="phone-profile">
        <div className="phone-avatar">
          <Image src="/decorat-logo.png" alt="Logotipo Decorat" fill sizes="47px" />
        </div>
        <div className="phone-stat"><b>548</b><small>publicações</small></div>
        <div className="phone-stat"><b>8.027</b><small>seguidores</small></div>
        <div className="phone-stat"><b>3.516</b><small>seguindo</small></div>
      </div>

      <div className="phone-bio">
        <strong>Fábrica de Molduras em Isopor</strong>
        <span>Fabricação e instalação de Molduras em EPS Internas e Externas personalizadas 🧡</span>
        <span>🚚 Enviamos para todo Brasil!</span>
        <em>linktr.ee/decoratmolduras</em>
      </div>

      <nav className="phone-tabs" aria-label="Abas do perfil">
        <Grid3X3 aria-hidden="true" /><Clapperboard aria-hidden="true" /><SquareUserRound aria-hidden="true" />
      </nav>
      <div className="phone-grid" aria-label="Publicações recentes da Decorat">
        {posts.map((image, index) => <span key={index}><Image src={image} alt={`Publicação ${index + 1} da Decorat`} fill sizes="92px" /></span>)}
      </div>
    </a>
  );
}
