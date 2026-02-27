import React, { useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';

const products = [
  {
    id: 1,
    name: 'Reserva Privada',
    category: 'Hoja Corojo',
    price: 89,
    priceLabel: '$89.00',
    pricePerSqft: 'Vitola: Robusto',
    image: '/images/1.jpeg',
  },
  {
    id: 2,
    name: 'Gran Distinción',
    category: 'Hoja Maduro',
    price: 124,
    priceLabel: '$124.00',
    pricePerSqft: 'Vitola: Churchill',
    image: '/images/2.jpeg',
  },
  {
    id: 3,
    name: 'Noche Dorada',
    category: 'Hoja Connecticut',
    price: 67,
    priceLabel: '$67.00',
    pricePerSqft: 'Vitola: Corona',
    image: '/images/3.jpeg',
  },
  {
    id: 4,
    name: 'Alma Negra',
    category: 'Hoja Habano',
    price: 95,
    priceLabel: '$95.00',
    pricePerSqft: 'Vitola: Toro',
    image: '/images/4.jpeg',
  },
];

export default function Shop() {
  const { addItem } = useCart();
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleAddToCart = (product: typeof products[0], index: number) => {
    addItem({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      priceLabel: product.priceLabel,
      pricePerSqft: product.pricePerSqft,
      image: product.image,
    });

    // Button feedback animation
    const btn = btnRefs.current[index];
    if (btn) {
      const originalText = btn.textContent;
      btn.textContent = 'Agregado ✓';
      gsap.fromTo(btn,
        { scale: 0.92 },
        {
          scale: 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.4)',
          onComplete: () => {
            btn.textContent = originalText;
          },
        }
      );
    }
  };

  return (
    <section className="shop">
      <div className="shop-header">
        <div className="shop-header__label">
          <span className="shop-reveal">La Tienda</span>
        </div>
        <h2 className="shop-header__title">
          <span className="shop-title-line"><span className="shop-title-slide-right">Nuestra</span></span>
          <span className="shop-title-line"><span className="shop-title-slide shop-title-bold-italic">Selección</span></span>
        </h2>
        <p className="shop-header__descr">
          <span className="shop-reveal">
            Cigarros premium enrollados a mano con las mejores hojas.
          </span>
          <span className="shop-reveal">
            Un ritual de lujo para quienes aprecian lo extraordinario.
          </span>
        </p>
      </div>

      <div className="shop-grid">
        {products.map((product, index) => (
          <div className="shop-card" key={product.id}>
            <div className="shop-card__img-wrap">
              <div className="shop-card__img-inner">
                <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
              </div>
              <span className="shop-card__badge">{product.category}</span>
            </div>
            <div className="shop-card__info">
              <div className="shop-card__details">
                <h3 className="shop-card__name">{product.name}</h3>
                <p className="shop-card__sqft">{product.pricePerSqft}</p>
              </div>
              <div className="shop-card__actions">
                <span className="shop-card__price">{product.priceLabel}</span>
                <button
                  className="shop-card__btn"
                  ref={(el) => { btnRefs.current[index] = el; }}
                  onClick={() => handleAddToCart(product, index)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="shop-footer">
        <span className="shop-reveal">
          <a href="#" className="shop-footer__link">Ver Toda la Colección &rarr;</a>
        </span>
      </div>
    </section>
  );
}
