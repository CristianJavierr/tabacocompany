import React from 'react';
import { usePage } from '../context/PageContext';

export default function Footer() {
  const { navigateTo, isTransitioning } = usePage();

  const handleNav = (e: React.MouseEvent, page: 'home' | 'contacto') => {
    e.preventDefault();
    if (!isTransitioning) navigateTo(page);
  };

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo footer-reveal">The Tabaco®</div>
          <p className="footer-tagline footer-reveal">Cigarros Premium</p>
        </div>
        <nav className="footer-nav">
          <a href="#" className="footer-nav__link footer-reveal" onClick={(e) => handleNav(e, 'home')}>Cigarros</a>
          <a href="#" className="footer-nav__link footer-reveal" onClick={(e) => handleNav(e, 'home')}>Colección</a>
          <a href="#" className="footer-nav__link footer-reveal" onClick={(e) => handleNav(e, 'contacto')}>Contacto</a>
        </nav>
        <div className="footer-info">
          <p className="footer-info__text footer-reveal">Santo Domingo, República Dominicana</p>
          <p className="footer-info__text footer-reveal">info@thetabaco.com</p>
        </div>
      </div>
      <div className="footer-line footer-line-anim"></div>
      <div className="footer-bottom">
        <p className="footer-copy footer-reveal">© 2026 The Tabaco Company. Todos los derechos reservados.</p>
        <p className="footer-legal footer-reveal">El consumo de tabaco es perjudicial para la salud.</p>
      </div>
    </footer>
  );
}
