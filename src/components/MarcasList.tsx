import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const marcas = [
  { name: 'Reserva Privada', image: '/images/1.jpeg' },
  { name: 'Gran Distinción', image: '/images/2.jpeg' },
  { name: 'Noche Dorada', image: '/images/3.jpeg' },
  { name: 'Alma Negra', image: '/images/4.jpeg' },
  { name: 'Casa Imperial', image: '/images/1.jpeg' },
];

export default function MarcasList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentImgRef = useRef<HTMLImageElement>(null);
  const prevImgRef = useRef<HTMLImageElement>(null);
  const prevIndexRef = useRef<number | null>(null);
  const isFirstRef = useRef(true);
  const activeIndexRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => {
        activeIndexRef.current = 0;
        isFirstRef.current = false;
      },
      onEnterBack: () => {
        activeIndexRef.current = 0;
        isFirstRef.current = false;
        const container = containerRef.current;
        const currentImg = currentImgRef.current;
        if (container) gsap.set(container, { opacity: 1 });
        if (currentImg) {
          gsap.fromTo(currentImg,
            { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.3 },
            { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.7, ease: 'power2.out' }
          );
        }
      },
      onLeave: () => resetState(),
      onLeaveBack: () => resetState(),
    });

    function resetState() {
      const container = containerRef.current;
      const currentImg = currentImgRef.current;
      const prevImg = prevImgRef.current;
      if (container) gsap.set(container, { opacity: 0 });
      if (currentImg) {
        gsap.killTweensOf(currentImg);
        gsap.set(currentImg, { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.3 });
      }
      if (prevImg) {
        gsap.killTweensOf(prevImg);
        gsap.set(prevImg, { opacity: 0 });
      }
      isFirstRef.current = true;
      activeIndexRef.current = null;
    }

    return () => st.kill();
  }, []);

  const handleEnter = (index: number) => {
    if (index === activeIndexRef.current) return;

    const prev = activeIndexRef.current;
    prevIndexRef.current = prev;
    activeIndexRef.current = index;
    setActiveIndex(index);

    const container = containerRef.current;
    const currentImg = currentImgRef.current;
    const prevImg = prevImgRef.current;

    if (!container || !currentImg || !prevImg) return;

    gsap.killTweensOf([currentImg, prevImg]);

    if (prev !== null) {
      prevImg.src = marcas[prev].image;
    }
    currentImg.src = marcas[index].image;

    if (isFirstRef.current) {
      isFirstRef.current = false;
      gsap.set(container, { opacity: 1 });
      gsap.set(prevImg, { opacity: 0, zIndex: 1 });
      gsap.set(currentImg, { 
        clipPath: 'inset(0% 0% 100% 0%)', 
        scale: 1.3, 
        zIndex: 2,
        y: 0,
      });

      const tl = gsap.timeline();
      tl.to(currentImg, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.45,
        ease: 'power2.out',
      })
      .to(currentImg, {
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
      }, 0);
    } else {
      gsap.set(prevImg, { 
        clipPath: 'inset(0% 0% 0% 0%)', 
        scale: 1, 
        opacity: 1, 
        zIndex: 1,
        y: 0,
      });
      gsap.set(currentImg, { 
        clipPath: 'inset(0% 0% 100% 0%)', 
        scale: 1.3, 
        zIndex: 2,
        y: 0,
      });

      const tl = gsap.timeline();
      tl.to(currentImg, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.45,
        ease: 'power2.out',
      })
      .to(currentImg, {
        scale: 1,
        duration: 0.7,
        ease: 'power2.out',
      }, 0);
    }
  };

  const handleLeave = () => {
    const currentImg = currentImgRef.current;
    const prevImg = prevImgRef.current;
    const container = containerRef.current;

    if (!currentImg || !prevImg || !container) return;

    gsap.killTweensOf([currentImg, prevImg]);

    setActiveIndex(null);

    gsap.to(currentImg, {
      clipPath: 'inset(0% 0% 100% 0%)',
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => {
        isFirstRef.current = true;
        gsap.set(container, { opacity: 0 });
      },
    });
  };

  return (
    <section className="marcas-list" ref={sectionRef}>
      <div className="marcas-list__content">
        <div className="marcas-list__items">
          {marcas.map((marca, index) => (
            <div
              className="marcas-list__item marcas-list-reveal"
              key={index}
              onMouseEnter={() => handleEnter(index)}
            >
              <span className="marcas-list__name">{marca.name}</span>
            </div>
          ))}
        </div>

        <div className="marcas-list__image" ref={containerRef}>
          <img
            ref={prevImgRef}
            className="marcas-img marcas-img--prev"
            src={marcas[0].image}
            alt=""
          />
          <img
            ref={currentImgRef}
            className="marcas-img marcas-img--current"
            src={marcas[0].image}
            alt=""
          />
        </div>
      </div>
    </section>
  );
}
