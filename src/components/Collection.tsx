import React from 'react';

export default function Collection() {
  return (
    <section className="collection">
      <div className="collection-mask"></div>
      <div className="slider">
        <div className="slider-wrapp">
          <div className="slider-img">
            <img className="slider-img-light" src="/images/image3.png" alt="" loading="eager" decoding="async" fetchPriority="high" />
            <img className="slider-img-dark" src="/images/a.jpg" alt="" loading="eager" decoding="async" />
            <div className="slider-gradient"></div>
          </div>
          <div className="slider-img active">
            <img className="slider-img-light" src="/images/ia.png" alt="" loading="eager" decoding="async" fetchPriority="high" />
            <img className="slider-img-dark" src="/images/b.jpg" alt="" loading="eager" decoding="async" />
            <div className="slider-gradient"></div>
          </div>
        </div>
        
        <div className="slider-descr">La Experiencia The Tobacco Company</div>
        <div className="slider-title">
          <div className="slider-title__item">El Arte de Vivir</div>
          <div className="slider-title__item"></div>
          <div className="slider-title__item">Gran Distinción</div>
        </div>
        <div className="slider-numeric">
          <div className="slider-numeric__active">
            <div className="slider-numeric__item">01</div>
            <div className="slider-numeric__item">02</div>
          </div>
          -
          <div className="slider-numeric__total">02</div>
        </div>
      </div>
    </section>
  );
}
