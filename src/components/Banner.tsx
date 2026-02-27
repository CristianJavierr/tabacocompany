import React from 'react';

export const SplitTextWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`fade-overflow ${className}`}>
      <div className="fade-el">
        {children}
      </div>
    </div>
  );
};

export default function Banner() {
  return (
    <section className="banner">
      <div className="banner-mask"></div>
      <div className="banner-text split">
        <SplitTextWrapper>Lujo Enrollado a Mano Desde 1987</SplitTextWrapper>
      </div>
      <div className="banner-title">
        <div className="title-row title-row-1">
          <div className="title-chunk" id="chunk-mas"><span>Más</span></div>
          <div className="title-chunk" id="chunk-que"><span>&nbsp;que</span></div>
          <div className="title-chunk" id="chunk-un"><span>&nbsp;un</span></div>
          <div className="title-chunk" id="chunk-cigarro"><span>&nbsp;cigarro,</span></div>
        </div>
        <div className="title-row title-row-2">
          <div className="title-chunk" id="chunk-un2"><span>un</span></div>
          <div className="title-chunk title-chunk-semibold-italic" id="chunk-estilo"><span>&nbsp;estilo</span></div>
          <div className="title-chunk" id="chunk-de"><span>&nbsp;de</span></div>
          <div className="title-chunk title-chunk-italic" id="chunk-vida"><span>&nbsp;vida.</span></div>
        </div>
      </div>
      <div className="banner-descr split">
        <SplitTextWrapper>D'Tabaco Company elabora cigarros premium para el paladar exigente.</SplitTextWrapper>
        <SplitTextWrapper>Tabaco añejado, mezclas magistrales y una experiencia inolvidable.</SplitTextWrapper>
        <SplitTextWrapper>Eleva tus momentos. Descubre el arte de lo extraordinario.</SplitTextWrapper>
      </div>
    </section>
  );
}
