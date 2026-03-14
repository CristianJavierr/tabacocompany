import React, { useState } from 'react';
import { usePage } from '../context/PageContext';

const presets = [
  {
    name: 'Verde & Dorado',
    bg: '#1a2e1a',
    accent: '#c8a84e',
    text: '#f5f0e8',
    inputBg: '#243524',
    inputBorder: '#c8a84e',
  },
  {
    name: 'Negro & Oro',
    bg: '#111111',
    accent: '#d4a843',
    text: '#f5f0e8',
    inputBg: '#1a1a1a',
    inputBorder: '#d4a843',
  },
  {
    name: 'Borgoña & Crema',
    bg: '#2e1118',
    accent: '#d4a25c',
    text: '#f5ece3',
    inputBg: '#3a1a22',
    inputBorder: '#d4a25c',
  },
  {
    name: 'Azul Noche & Plata',
    bg: '#0f1a2e',
    accent: '#c0c0c0',
    text: '#e8edf5',
    inputBg: '#162240',
    inputBorder: '#c0c0c0',
  },
  {
    name: 'Original',
    bg: '',
    accent: '',
    text: '',
    inputBg: '',
    inputBorder: '',
  },
];

export default function Contacto() {
  const { navigateTo } = usePage();
  const [themeOpen, setThemeOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState('Original');

  function applyTheme(preset: typeof presets[0]) {
    setActiveTheme(preset.name);
    const section = document.querySelector('.contacto') as HTMLElement;
    if (!section) return;

    if (preset.name === 'Original') {
      section.style.removeProperty('--theme-bg');
      section.style.removeProperty('--theme-accent');
      section.style.removeProperty('--theme-text');
      section.style.removeProperty('--theme-input-bg');
      section.style.removeProperty('--theme-input-border');
      section.classList.remove('theme-active');
      return;
    }

    section.style.setProperty('--theme-bg', preset.bg);
    section.style.setProperty('--theme-accent', preset.accent);
    section.style.setProperty('--theme-text', preset.text);
    section.style.setProperty('--theme-input-bg', preset.inputBg);
    section.style.setProperty('--theme-input-border', preset.inputBorder);
    section.classList.add('theme-active');
  }

  return (
    <section className="contacto">
      {/* Hero — full dark split */}
      <div className="contacto-hero">
        <div className="contacto-hero__left">
          <div className="contacto-hero__label">
            <span className="contacto-reveal">Contacto</span>
          </div>
          <h1 className="contacto-hero__title">
            <span className="contacto-title-line"><span className="contacto-reveal">Conéctate</span></span>
            <span className="contacto-title-line"><span className="contacto-reveal contacto-title-italic">con nosotros</span></span>
          </h1>
          <p className="contacto-hero__descr">
            <span className="contacto-reveal">
              Estamos aquí para ayudarte a encontrar el cigarro perfecto para cada ocasión.
            </span>
          </p>
        </div>
        <div className="contacto-hero__right">
          <div className="contacto-hero__img contacto-reveal-up">
            <img src="/images/1.jpeg" alt="The Tobacco Collection" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="contacto-body">
        {/* Left: Info cards */}
        <div className="contacto-info">
          <div className="contacto-info__block contacto-reveal-up">
            <h3 className="contacto-info__heading">Visítanos</h3>
            <p>Av. Winston Churchill #45</p>
            <p>Santo Domingo, República Dominicana</p>
          </div>
          <div className="contacto-info__block contacto-reveal-up">
            <h3 className="contacto-info__heading">Escríbenos</h3>
            <p>info@thetobacco.com</p>
            <p>+1 (809) 555-0187</p>
          </div>
          <div className="contacto-info__block contacto-reveal-up">
            <h3 className="contacto-info__heading">Horario</h3>
            <p>Lunes – Viernes: 10:00 – 20:00</p>
            <p>Sábado: 11:00 – 18:00</p>
          </div>
        </div>

        {/* Right: Form */}
        <form className="contacto-form" onSubmit={(e) => e.preventDefault()}>
          <h2 className="contacto-form__title contacto-reveal-up">Envíanos un mensaje</h2>
          <div className="contacto-form__row">
            <div className="contacto-form__group contacto-reveal-up">
              <label className="contacto-form__label">Nombre</label>
              <input type="text" className="contacto-form__input" placeholder="Tu nombre" />
            </div>
            <div className="contacto-form__group contacto-reveal-up">
              <label className="contacto-form__label">Apellido</label>
              <input type="text" className="contacto-form__input" placeholder="Tu apellido" />
            </div>
          </div>
          <div className="contacto-form__group contacto-reveal-up">
            <label className="contacto-form__label">Email</label>
            <input type="email" className="contacto-form__input" placeholder="tu@email.com" />
          </div>
          <div className="contacto-form__group contacto-reveal-up">
            <label className="contacto-form__label">Teléfono</label>
            <input type="tel" className="contacto-form__input" placeholder="+1 (000) 000-0000" />
          </div>
          <div className="contacto-form__group contacto-reveal-up">
            <label className="contacto-form__label">Mensaje</label>
            <textarea className="contacto-form__textarea" rows={4} placeholder="¿En qué podemos ayudarte?" />
          </div>
          <button type="submit" className="contacto-form__submit contacto-reveal-up">
            Enviar Mensaje
          </button>
        </form>
      </div>

      <div className="contacto-footer">
        <button className="contacto-back contacto-reveal-up" onClick={() => navigateTo('home')}>
          &larr; Volver al Inicio
        </button>
      </div>

      {/* Theme tester widget */}
      <div className={`theme-tester ${themeOpen ? 'theme-tester--open' : ''}`}>
        <button className="theme-tester__toggle" onClick={() => setThemeOpen(!themeOpen)}>
          🎨
        </button>
        {themeOpen && (
          <div className="theme-tester__panel">
            <p className="theme-tester__title">Probar Colores</p>
            {presets.map((p) => (
              <button
                key={p.name}
                className={`theme-tester__btn ${activeTheme === p.name ? 'theme-tester__btn--active' : ''}`}
                onClick={() => applyTheme(p)}
              >
                {p.name !== 'Original' && (
                  <span className="theme-tester__swatch" style={{ background: p.bg, borderColor: p.accent }} />
                )}
                {p.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
