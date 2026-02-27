import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { usePage } from '../context/PageContext';

export default function Header() {
  const { totalItems, toggleCart } = useCart();
  const { currentPage, navigateTo, isTransitioning } = usePage();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (e: React.MouseEvent, page: 'home' | 'contacto') => {
    e.preventDefault();
    if (!isTransitioning) {
      setMenuOpen(false);
      navigateTo(page);
    }
  };

  return (
    <header className="header">
      <div className="header-wrapp">
        <div className="header-logo" style={{ cursor: 'pointer' }} onClick={(e) => handleNav(e, 'home')}>
          The Tabaco®
        </div>
        <div className="header-tagline">cigarros premium</div>
        <div className={`header-menu${menuOpen ? ' open' : ''}`}>
          <a href="#" className={`header-menu__item header-link${currentPage === 'home' ? ' active' : ''}`} onClick={(e) => handleNav(e, 'home')}>cigarros</a>
          <a href="#" className="header-menu__item header-link" onClick={(e) => e.preventDefault()}>colección</a>
          <a href="#" className={`header-menu__item header-link${currentPage === 'contacto' ? ' active' : ''}`} onClick={(e) => handleNav(e, 'contacto')}>contacto</a>
          <button className="header-cart header-link header-cart--mobile" onClick={() => { toggleCart(); setMenuOpen(false); }}>
            carrito ({totalItems})
          </button>
        </div>
        <button className="header-cart header-link header-cart--desktop" onClick={toggleCart}>
          carrito ({totalItems})
        </button>
        <button
          className={`header-burger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
