import React from 'react';

export default function Experience() {
  return (
    <section className="experience">
      {/* Row 1 — same as shop-header but with image between title and description */}
      <div className="exp-header exp-header--1">
        <div className="exp-header__label">
          <span className="exp-reveal">El Origen</span>
        </div>
        <h2 className="exp-header__title">
          <span className="exp-title-line"><span className="exp-title-slide-right">Las mejores</span></span>
          <span className="exp-title-line"><span className="exp-title-slide exp-title-bold-italic">hojas del caribe</span></span>
        </h2>
        <div className="exp-header__img">
          <img src="/images/hoja.png" alt="Hojas de tabaco" loading="eager" decoding="async" />
        </div>
        <p className="exp-header__descr">
          <span className="exp-reveal">
            Cultivadas en los valles más fértiles del Caribe.
          </span>
          <span className="exp-reveal">
            Un legado de sabor y tradición incomparable.
          </span>
        </p>
      </div>

      {/* Row 2 — frame image (grows) */}
      <div className="experience-frame">
        <div className="experience-img-wrap">
          <img
            src="/images/hs.png"
            alt="La Experiencia D'Tabaco"
            className="experience-img"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Row 2 — inverted: description | (frame gap) | title | label */}
      <div className="exp-header exp-header--2">
        <p className="exp-header__descr">
          <span className="exp-reveal">
            Protagonista de cada instante inolvidable.
          </span>
          <span className="exp-reveal">
            Un cigarro que define tu estilo.
          </span>
        </p>
        <h2 className="exp-header__title">
          <span className="exp-title-line"><span className="exp-title-slide-right">Tus momentos</span></span>
          <span className="exp-title-line"><span className="exp-title-slide exp-title-bold-italic">más auténticos</span></span>
        </h2>
        <div className="exp-header__label">
          <span className="exp-reveal">La Experiencia</span>
        </div>
      </div>
    </section>
  );
}
