import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const tl = gsap.timeline({ paused: true });

    tl.to(overlayRef.current, {
      autoAlpha: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
    .to(panelRef.current, {
      x: 0,
      duration: 0.5,
      ease: 'power3.out',
    }, '<0.1');

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) {
      tlRef.current.play();
      // Animate items in
      if (itemsRef.current) {
        const cartItems = itemsRef.current.querySelectorAll('.cart-item');
        gsap.fromTo(cartItems,
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out', delay: 0.2 }
        );
      }
    } else {
      tlRef.current.reverse();
    }
  }, [isOpen]);

  // Animate new item when items change
  useEffect(() => {
    if (!isOpen || !itemsRef.current) return;
    const cartItems = itemsRef.current.querySelectorAll('.cart-item');
    if (cartItems.length > 0) {
      const lastItem = cartItems[cartItems.length - 1];
      gsap.fromTo(lastItem,
        { scale: 1.03, backgroundColor: 'rgba(19, 19, 19, 0.05)' },
        { scale: 1, backgroundColor: 'rgba(19, 19, 19, 0)', duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [items.length, isOpen]);

  const handleRemove = (id: number, e: React.MouseEvent) => {
    const target = (e.currentTarget as HTMLElement).closest('.cart-item');
    if (target) {
      gsap.to(target, {
        opacity: 0,
        x: 60,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => removeItem(id),
      });
    } else {
      removeItem(id);
    }
  };

  return (
    <>
      <div
        ref={overlayRef}
        className="cart-overlay"
        onClick={closeCart}
      />
      <div ref={panelRef} className="cart-panel">
        <div className="cart-panel__header">
          <h3 className="cart-panel__title">Tu Carrito ({totalItems})</h3>
          <button className="cart-panel__close" onClick={closeCart}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1.5" />
              <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <div className="cart-panel__items" ref={itemsRef}>
          {items.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
              <span>Agrega cigarros premium para comenzar.</span>
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item__img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item__details">
                  <div className="cart-item__top">
                    <div>
                      <h4 className="cart-item__name">{item.name}</h4>
                      <span className="cart-item__category">{item.category}</span>
                    </div>
                    <button
                      className="cart-item__remove"
                      onClick={(e) => handleRemove(item.id, e)}
                    >
                      Eliminar
                    </button>
                  </div>
                  <div className="cart-item__bottom">
                    <div className="cart-item__qty">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        −
                      </button>
                      <span className="cart-item__qty-val">{item.quantity}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <span className="cart-item__price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-panel__footer">
            <div className="cart-panel__total">
              <span>Total</span>
              <span className="cart-panel__total-price">${totalPrice.toFixed(2)}</span>
            </div>
            <button className="cart-panel__checkout">Pagar</button>
          </div>
        )}
      </div>
    </>
  );
}
