import React from 'react';
import { usePage } from '../context/PageContext';

export default function Contacto() {
  const { navigateTo } = usePage();

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
            <img src="/images/1.jpeg" alt="D'Tabaco Collection" loading="lazy" decoding="async" />
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
            <p>info@dtabacocompany.com</p>
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
    </section>
  );
}
