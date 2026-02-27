import React from 'react';
import { useCart } from '../context/CartContext';
import { usePage } from '../context/PageContext';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const { currentPage, navigateTo, isTransitioning } = usePage();

  const handleNav = (e: React.MouseEvent, page: 'home' | 'contacto') => {
    e.preventDefault();
    if (!isTransitioning) navigateTo(page);
  };

  return (
    <header className="header">
      <div className="header-wrapp">
        <div className="header-logo" style={{ cursor: 'pointer' }} onClick={(e) => handleNav(e, 'home')}>
          D'Tabaco®
        </div>
        <div className="header-tagline">cigarros premium</div>
        <div className="header-menu">
          <a href="#" className={`header-menu__item header-link${currentPage === 'home' ? ' active' : ''}`} onClick={(e) => handleNav(e, 'home')}>cigarros</a>
          <a href="#" className="header-menu__item header-link" onClick={(e) => e.preventDefault()}>colección</a>
          <a href="#" className={`header-menu__item header-link${currentPage === 'contacto' ? ' active' : ''}`} onClick={(e) => handleNav(e, 'contacto')}>contacto</a>
        </div>
        <button className="header-cart header-link" onClick={toggleCart}>
          carrito ({totalItems})
        </button>
      </div>
    </header>
  );
}
