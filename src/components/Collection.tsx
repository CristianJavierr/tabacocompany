import React from 'react';

function getSliderImages(): [string, string] {
  try {
    const saved = localStorage.getItem('theme');
    if (saved && JSON.parse(saved).dark) return ['/images/b.jpg', '/images/a.jpg'];
  } catch {}
  return ['/images/image3.png', '/images/ia.png'];
}

export default function Collection() {
  const [img1, img2] = getSliderImages();

  return (
    <section className="collection">
      <div className="collection-mask"></div>
      <div className="slider">
        <div className="slider-wrapp">
          <div className="slider-img">
            <img src={img1} alt="" loading="eager" decoding="async" fetchPriority="high" />
            <div className="slider-gradient"></div>
          </div>
          <div className="slider-img active">
            <img src={img2} alt="" loading="eager" decoding="async" fetchPriority="high" />
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
