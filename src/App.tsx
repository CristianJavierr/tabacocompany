import React, { useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Observer } from 'gsap/Observer';
import { CustomEase } from 'gsap/CustomEase';
import Lenis from 'lenis';

import Preloader from './components/Preloader';
import Header from './components/Header';
import Banner, { SplitTextWrapper } from './components/Banner';
import Collection from './components/Collection';
import Shop from './components/Shop';
import Submarcas from './components/Submarcas';
import MarcasList from './components/MarcasList';
import Historia from './components/Historia';
import Experience from './components/Experience';
import Cart from './components/Cart';
import Footer from './components/Footer';
import Contacto from './components/Contacto';
import { PageContext, type Page } from './context/PageContext';

gsap.registerPlugin(ScrollTrigger, Observer, CustomEase);

CustomEase.create('preloaderEase', '0.48,0.00,0.83,0.83');
CustomEase.create('headerEase', '0.17,0.17,0.52,1.00');
CustomEase.create('titleEase', '0.17,0.17,0.49,1.00');
CustomEase.create('titleEaseHide', '0.55,0.00,0.83,0.83');
const customTitleEase = CustomEase.create('customTitleEase', '0.52,0.00,0.48,1.00');

export default function App() {
  const mainRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const replayHomeRef = useRef<(() => void) | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentPageRef = useRef<Page>('home');
  const isTransitioningRef = useRef(false);
  const contactoSTRef = useRef<globalThis.ScrollTrigger | null>(null);

  const navigateTo = useCallback((page: Page) => {
    if (page === currentPageRef.current || isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setIsTransitioning(true);

    const transitionEl = document.querySelector('.page-transition');
    if (!transitionEl) return;

    // Phase 1: Cover the current page
    gsap.set(transitionEl, { display: 'block' });
    gsap.fromTo(transitionEl,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.9,
        ease: 'power3.inOut',
        onComplete: () => {
          const leavingHome = currentPageRef.current === 'home';
          const goingHome = page === 'home';

          // Destroy Lenis when leaving home to restore native scroll
          if (leavingHome && lenisRef.current) {
            lenisRef.current.destroy();
            lenisRef.current = null;
          }

          // Swap content
          currentPageRef.current = page;
          setCurrentPage(page);

          // Kill contacto ScrollTrigger when leaving contacto
          if (contactoSTRef.current) {
            contactoSTRef.current.kill();
            contactoSTRef.current = null;
          }

          // Toggle body classes
          if (page === 'home') {
            document.body.classList.add('page-home');
            document.body.classList.remove('page-contacto');
            document.body.classList.remove('page-contacto-scrolled');
          } else {
            document.body.classList.remove('page-home');
            document.body.classList.add('page-contacto');
          }

          // Scroll reset
          window.scrollTo(0, 0);
          if (goingHome && lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
          }

          // Small delay for React to render
          requestAnimationFrame(() => {
            // Phase 2: Reveal the new page
            gsap.fromTo(transitionEl,
              { clipPath: 'inset(0% 0% 0% 0%)' },
              {
                clipPath: 'inset(0% 0% 100% 0%)',
                duration: 0.9,
                ease: 'power3.inOut',
                delay: 0.15,
                onStart: () => {
                  // Animate contacto elements in + header color ScrollTrigger
                  if (!goingHome) {
                    gsap.fromTo('.contacto-reveal',
                      { y: '110%' },
                      { y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 0.1 }
                    );
                    gsap.fromTo('.contacto-reveal-up',
                      { y: 40, opacity: 0 },
                      { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: 'power2.out', delay: 0.3 }
                    );
                    // Toggle header color when scrolling past the hero
                    contactoSTRef.current = ScrollTrigger.create({
                      trigger: '.contacto-hero',
                      start: 'bottom top+=60',
                      onEnter: () => document.body.classList.add('page-contacto-scrolled'),
                      onLeaveBack: () => document.body.classList.remove('page-contacto-scrolled'),
                    });
                  }
                  // Recreate Lenis (desktop only) & replay home animations when returning home
                  if (goingHome) {
                    if (window.innerWidth > 768) {
                      const newLenis = new Lenis({
                        duration: 1.5,
                        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                        orientation: 'vertical',
                        gestureOrientation: 'vertical',
                        smoothWheel: true,
                      });
                      lenisRef.current = newLenis;
                      newLenis.on('scroll', ScrollTrigger.update);
                    }
                    ScrollTrigger.refresh();
                    if (replayHomeRef.current) {
                      replayHomeRef.current();
                    }
                  }
                },
                onComplete: () => {
                  gsap.set(transitionEl, { display: 'none' });
                  isTransitioningRef.current = false;
                  setIsTransitioning(false);
                },
              }
            );
          });
        },
      }
    );
  }, []);

  useLayoutEffect(() => {
    document.body.classList.add('page-home');

    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      const lenis = new Lenis({
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);
    }

    function update(time: number) {
      lenisRef.current?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {

      let activeIndexSlider = document.querySelectorAll('.slider-img').length - 1;
      let playAnimation = false;

      // Initial Setup — only runs after all assets are ready
      function initPage() {
        if (lenisRef.current) {
          lenisRef.current.stop();
          lenisRef.current.scrollTo(0, { immediate: true });
        }

        // Reset slider state
        document.querySelectorAll('.slider-img').forEach((element, index) => {
          element.classList.remove('hide');
          element.classList.remove('active');
          if (index === activeIndexSlider) {
            element.classList.add('active');
          }
        });

        gsap.set('.slider-title__item', { y: 0 });
        gsap.set('.slider-numeric__item', { y: 0 });

        // Intro Animation
        const tl = gsap.timeline({
          onComplete: () => {
            if (lenisRef.current) lenisRef.current.start();
          }
        });

        // Page intro: dark overlay reveals page from bottom to top
        tl.fromTo('.page-intro',
          { clipPath: 'inset(0% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 100% 0%)',
            duration: 1.2,
            ease: 'power2.inOut',
          },
          0.4
        )
          .set('.page-intro', { display: 'none' })
          .to('.preloader-wrapp', {
            y: '100%',
            duration: 0.7,
            ease: 'preloaderEase',
          }, '>0.6')
          .set('.preloader', { display: 'none' })
          .fromTo('.header-wrapp',
            { y: '-1rem' },
            { y: 0, duration: 0.85, ease: 'headerEase' }
          )
          // Stagger text reveals
          .fromTo('.banner-text .fade-el',
            { y: '100%' },
            { y: 0, duration: 0.5, stagger: 0.2, ease: 'headerEase' },
            '<'
          )
          // Title chunks — horizontal sliding like Reforma/Fossil reference
          .fromTo('#chunk-mas span', { x: '2rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<')
          .fromTo('#chunk-que span', { x: '-1.5rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.06')
          .fromTo('#chunk-un span', { x: '1.8rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.04')
          .fromTo('#chunk-cigarro span', { x: '3rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.06')
          .fromTo('#chunk-un2 span', { x: '-2rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.04')
          .fromTo('#chunk-estilo span', { x: '-2.5rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.06')
          .fromTo('#chunk-de span', { x: '1.5rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.04')
          .fromTo('#chunk-vida span', { x: '-2rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.04')
          .fromTo('.banner-descr .fade-el',
            { y: '100%' },
            { y: 0, duration: 1, stagger: 0.1, ease: 'headerEase' },
            '<'
          )
          .fromTo('.slider',
            { y: '50%' },
            { y: 0, duration: 1.05, ease: 'headerEase' },
            '<'
          )
          .fromTo('.slider-img img',
            { scale: 1.7 },
            { scale: 1.3, duration: 1 },
            '<'
          );
      }

      // ---- Wait for ALL assets before starting ----
      function waitForAssets(): Promise<void> {
        // Only wait for eager/critical images — lazy images load on demand
        const images = Array.from(document.querySelectorAll<HTMLImageElement>('img:not([loading="lazy"])'));
        const imagePromises = images.map((img) => {
          const loaded = img.complete && img.naturalHeight > 0
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            });
          return loaded.then(() => {
            if (typeof img.decode === 'function') {
              return img.decode().catch(() => { });
            }
          });
        });

        // 2. Wait for fonts
        const fontPromise = document.fonts.ready;

        // 3. Minimum time so preloader animation cycles at least once
        const minTime = new Promise<void>((resolve) => setTimeout(resolve, 1200));

        // 4. Safety timeout so the page always loads even if something hangs
        const safetyTimeout = new Promise<void>((resolve) => setTimeout(resolve, 6000));

        return Promise.race([
          Promise.all([...imagePromises, fontPromise, minTime]).then(() => { }),
          safetyTimeout,
        ]);
      }

      waitForAssets().then(() => {
        initPage();
      });

      // Replay home animations (called when navigating back to home)
      function replayHome() {
        if (lenisRef.current) {
          lenisRef.current.stop();
          lenisRef.current.scrollTo(0, { immediate: true });
        }

        // Reset slider state
        let replayActiveIndex = document.querySelectorAll('.slider-img').length - 1;
        activeIndexSlider = replayActiveIndex;
        playAnimation = false;

        document.querySelectorAll('.slider-img').forEach((element, index) => {
          element.classList.remove('hide');
          element.classList.remove('active');
          if (index === replayActiveIndex) {
            element.classList.add('active');
          }
        });

        // Reset all animated elements to their initial state
        gsap.set('.slider-title__item', { y: 0 });
        gsap.set('.slider-numeric__item', { y: 0 });
        gsap.set('.banner-text .fade-el', { y: '100%' });
        gsap.set('.banner-descr .fade-el', { y: '100%' });
        gsap.set('#chunk-mas span', { x: '2rem' });
        gsap.set('#chunk-que span', { x: '-1.5rem' });
        gsap.set('#chunk-un span', { x: '1.8rem' });
        gsap.set('#chunk-cigarro span', { x: '3rem' });
        gsap.set('#chunk-un2 span', { x: '-2rem' });
        gsap.set('#chunk-estilo span', { x: '-2.5rem' });
        gsap.set('#chunk-de span', { x: '1.5rem' });
        gsap.set('#chunk-vida span', { x: '-2rem' });
        gsap.set('.slider', { y: '50%' });
        gsap.set('.slider-img img', { scale: 1.7 });
        gsap.set('.banner-mask', { autoAlpha: 0 });
        gsap.set('.collection-mask', { autoAlpha: 0 });
        gsap.set('.shop-reveal', { y: '100%' });
        gsap.set('.shop-title-slide', { x: '-110%' });
        gsap.set('.shop-title-slide-right', { x: '110%' });
        gsap.set('.shop-card', { opacity: 0, y: 40 });
        gsap.set('.shop-footer .shop-reveal', { y: '100%' });
        gsap.set('.submarcas-reveal', { y: '110%' });
        gsap.set('.submarcas-line', { scaleX: 0 });
        gsap.set('.marcas-list-reveal', { y: '100%', opacity: 0 });
        gsap.set('.marcas-list__image', { opacity: 0 });
        gsap.set('.marcas-img--current', { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.3 });
        gsap.set('.marcas-img--prev', { opacity: 0 });
        gsap.set('.historia-fill', { clipPath: 'inset(0% 100% 0% 0%)' });
        gsap.set('.exp-reveal', { y: '110%' });
        gsap.set('.exp-title-slide', { x: '-110%' });
        gsap.set('.exp-title-slide-right', { x: '110%' });
        gsap.set('.exp-header--1', { opacity: 1 });
        gsap.set('.exp-header--2', { clearProps: 'top,left,right,bottom,opacity' });
        gsap.set('.exp-header--2', { opacity: 1 });
        gsap.set('.exp-header--2 .exp-header__title', { color: 'var(--dark)' });
        gsap.set('.exp-header--2 .exp-header__label', { color: 'var(--dark)', opacity: 0.6 });
        gsap.set('.exp-header--2 .exp-header__descr', { color: 'var(--dark)', opacity: 0.7 });
        gsap.set('.experience-frame', { clearProps: 'top,left,width,height' });
        gsap.set('.experience-img', { scale: 1.2, x: 0 });
        gsap.set('.footer-reveal', { y: '100%', opacity: 0 });
        gsap.set('.footer-line-anim', { scaleX: 0 });

        // Reset header to dark
        gsap.set('.header', { color: 'var(--dark)' });
        gsap.set('.header-link', { color: 'var(--dark)' });
        gsap.set('.header-logo', { color: 'var(--dark)' });
        gsap.set('.header-tagline', { color: 'var(--dark)' });

        // Replay intro timeline (without preloader/page-intro)
        const tl = gsap.timeline({
          onComplete: () => {
            if (lenisRef.current) lenisRef.current.start();
            ScrollTrigger.refresh();
          }
        });

        tl.fromTo('.header-wrapp',
          { y: '-1rem' },
          { y: 0, duration: 0.85, ease: 'headerEase' }
        )
          .fromTo('.banner-text .fade-el',
            { y: '100%' },
            { y: 0, duration: 0.5, stagger: 0.2, ease: 'headerEase' },
            '<'
          )
          .fromTo('#chunk-mas span', { x: '2rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<')
          .fromTo('#chunk-que span', { x: '-1.5rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.06')
          .fromTo('#chunk-un span', { x: '1.8rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.04')
          .fromTo('#chunk-cigarro span', { x: '3rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.06')
          .fromTo('#chunk-un2 span', { x: '-2rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.04')
          .fromTo('#chunk-estilo span', { x: '-2.5rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.06')
          .fromTo('#chunk-de span', { x: '1.5rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.04')
          .fromTo('#chunk-vida span', { x: '-2rem' }, { x: 0, duration: 1.5, ease: customTitleEase }, '<0.04')
          .fromTo('.banner-descr .fade-el',
            { y: '100%' },
            { y: 0, duration: 1, stagger: 0.1, ease: 'headerEase' },
            '<'
          )
          .fromTo('.slider',
            { y: '50%' },
            { y: 0, duration: 1.05, ease: 'headerEase' },
            '<'
          )
          .fromTo('.slider-img img',
            { scale: 1.7 },
            { scale: 1.3, duration: 1 },
            '<'
          );
      }

      replayHomeRef.current = replayHome;

      // Slider Logic
      function nextSlide() {
        if (activeIndexSlider > 0) {
          playAnimation = true;

          const slides = document.querySelectorAll('.slider-img');
          const currentTop = slides[activeIndexSlider];
          const nextBottom = slides[activeIndexSlider - 1];

          if (currentTop) currentTop.classList.add('hide');
          if (nextBottom) nextBottom.classList.add('active');

          gsap.to('.slider-numeric__item', {
            y: '-=100%',
            duration: 1.4,
            ease: 'titleEase',
          });

          const tl = gsap.timeline({
            onComplete: () => {
              playAnimation = false;
            }
          });

          tl.to('.slider-title__item', {
            y: '+=100%',
            duration: 0.7,
            ease: 'titleEaseHide',
          })
            .to('.slider-title__item', {
              y: '+=100%',
              duration: 0.7,
              ease: 'titleEase',
            });

          activeIndexSlider--;
        }
      }

      function prevSlide() {
        const slides = document.querySelectorAll('.slider-img');
        if (activeIndexSlider < slides.length - 1) {
          playAnimation = true;

          const slideToRestore = slides[activeIndexSlider + 1];
          if (slideToRestore) {
            slideToRestore.classList.remove('hide');
          }

          gsap.to('.slider-numeric__item', {
            y: '+=100%',
            duration: 1.4,
            ease: 'titleEase',
          });

          const tl = gsap.timeline({
            onComplete: () => {
              playAnimation = false;
            }
          });

          tl.to('.slider-title__item', {
            y: '-=100%',
            duration: 0.7,
            ease: 'titleEaseHide',
          })
            .to('.slider-title__item', {
              y: '-=100%',
              duration: 0.7,
              ease: 'titleEase',
            });

          activeIndexSlider++;
        }
      }

      // Observer for Slider
      const sliderObserver = Observer.create({
        target: '.collection',
        type: 'wheel,touch,scroll,pointer',
        wheelSpeed: 1,
        onDown: () => {
          if (playAnimation) return;
          if (activeIndexSlider > 0) {
            nextSlide();
          } else {
            sliderObserver.disable();
            if (lenisRef.current) lenisRef.current.start();
          }
        },
        onUp: () => {
          if (playAnimation) return;
          if (activeIndexSlider < document.querySelectorAll('.slider-img').length - 1) {
            prevSlide();
          } else {
            sliderObserver.disable();
            if (lenisRef.current) lenisRef.current.start();
          }
        },
        tolerance: 5,
        preventDefault: true,
      });

      sliderObserver.disable();

      // Banner Scroll Animation
      gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '.banner',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onEnter: () => sliderObserver.disable(),
          onLeave: () => {
            // Banner fully scrolled out → collection fills viewport → enable slider
            sliderObserver.enable();
            if (lenisRef.current) lenisRef.current.stop();
          },
          onEnterBack: () => {
            // Scrolling back up into banner → disable slider
            sliderObserver.disable();
            if (lenisRef.current) lenisRef.current.start();
          },
        },
      })
        .to('.collection', { padding: 0, duration: 1 })
        .to('.slider', { borderRadius: 0, duration: 1 }, '<')
        .to('.banner-mask', { autoAlpha: 1, duration: 1 }, '<') // autoAlpha handles opacity + visibility
        .to('.collection-mask', { autoAlpha: 1, duration: 1 }, '<')
        .fromTo('.slider-img img', { scale: 1.3 }, { scale: 1, duration: 1 }, '<')
        .to('.header', { color: '#ffffff', duration: 0.3 }, '<0.3')
        .to('.header-link', { color: '#ffffff', duration: 0.3 }, '<')
        .to('.header-logo', { color: '#ffffff', duration: 0.3 }, '<')
        .to('.header-tagline', { color: '#ffffff', duration: 0.3 }, '<');

      // Re-enable slider observer when scrolling back from shop into collection
      ScrollTrigger.create({
        trigger: '.shop',
        start: 'top bottom-=10px',
        onEnter: () => {
          // Scrolling down into shop → make sure observer is off and Lenis is on
          sliderObserver.disable();
          if (lenisRef.current) lenisRef.current.start();
        },
        onLeaveBack: () => {
          // Scrolling back up from shop into collection → re-enable observer
          sliderObserver.enable();
          if (lenisRef.current) lenisRef.current.stop();
        },
      });

      // ========== SHOP SECTION ANIMATIONS ==========

      // Reveal header text elements
      gsap.to('.shop-reveal', {
        y: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'headerEase',
        scrollTrigger: {
          trigger: '.shop-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Sideways reveal for Selección (from left)
      gsap.to('.shop-title-slide', {
        x: 0,
        duration: 1.4,
        ease: customTitleEase,
        scrollTrigger: {
          trigger: '.shop-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Sideways reveal for Nuestra (from right)
      gsap.to('.shop-title-slide-right', {
        x: 0,
        duration: 1.4,
        ease: customTitleEase,
        scrollTrigger: {
          trigger: '.shop-header',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Stagger product cards
      gsap.to('.shop-card', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.15,
        ease: 'headerEase',
        scrollTrigger: {
          trigger: '.shop-grid',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      // Footer CTA reveal
      gsap.to('.shop-footer .shop-reveal', {
        y: 0,
        duration: 0.8,
        ease: 'headerEase',
        scrollTrigger: {
          trigger: '.shop-footer',
          start: 'top 90%',
          toggleActions: 'play none none reverse',
        },
      });

      // Color transition: header back to dark when entering shop
      ScrollTrigger.create({
        trigger: '.shop',
        start: 'top 50%',
        onEnter: () => {
          gsap.to('.header', { color: 'var(--dark)', duration: 0.3 });
          gsap.to('.header-link', { color: 'var(--dark)', duration: 0.3 });
          gsap.to('.header-logo', { color: 'var(--dark)', duration: 0.3 });
          gsap.to('.header-tagline', { color: 'var(--dark)', duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to('.header', { color: '#ffffff', duration: 0.3 });
          gsap.to('.header-link', { color: '#ffffff', duration: 0.3 });
          gsap.to('.header-logo', { color: '#ffffff', duration: 0.3 });
          gsap.to('.header-tagline', { color: '#ffffff', duration: 0.3 });
        },
      });

      // ========== SUBMARCAS SECTION ANIMATIONS ==========
      gsap.to('.submarcas-reveal', {
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'headerEase',
        scrollTrigger: {
          trigger: '.submarcas',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.submarcas-line', {
        scaleX: 1,
        duration: 1.2,
        ease: customTitleEase,
        scrollTrigger: {
          trigger: '.submarcas',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // ========== MARCAS LIST ANIMATIONS ==========
      gsap.to('.marcas-list-reveal', {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: 'headerEase',
        scrollTrigger: {
          trigger: '.marcas-list',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
          onEnter: () => {
            gsap.set('.marcas-list__image', { opacity: 1 });
            gsap.fromTo('.marcas-img--current',
              { clipPath: 'inset(0% 0% 100% 0%)', scale: 1.3 },
              { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 0.7, ease: 'power2.out', delay: 0.5 }
            );
          },
        },
      });

      // ========== HISTORIA SECTION — STROKE TO FILL LINE BY LINE ==========

      const historiaLines = gsap.utils.toArray('.historia-fill');
      const historiaTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.historia',
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1,
        },
      });

      historiaLines.forEach((line) => {
        historiaTl.to(line as HTMLElement, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1,
          ease: 'power1.inOut',
        });
      });

      // ========== EXPERIENCE SECTION ANIMATIONS ==========

      // Entrance: reveal labels and descriptions
      gsap.to('.exp-reveal', {
        y: 0,
        duration: 1.2,
        stagger: 0.08,
        ease: customTitleEase,
        scrollTrigger: {
          trigger: '.experience',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // Entrance: slide in titles
      gsap.to('.exp-title-slide', {
        x: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: customTitleEase,
        scrollTrigger: {
          trigger: '.experience',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.exp-title-slide-right', {
        x: 0,
        duration: 1.4,
        stagger: 0.1,
        ease: customTitleEase,
        scrollTrigger: {
          trigger: '.experience',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      const experienceTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.experience',
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 0.5,
          invalidateOnRefresh: true,
        }
      });

      // Header color tied to experience section — all 4 directions
      ScrollTrigger.create({
        trigger: '.experience',
        start: 'top 50%',
        end: '+=200%',
        onEnter: () => {
          gsap.to(['.header', '.header-link', '.header-logo', '.header-tagline'], { color: '#ffffff', duration: 0.3 });
        },
        onLeave: () => {
          gsap.to(['.header', '.header-link', '.header-logo', '.header-tagline'], { color: 'var(--dark)', duration: 0.3 });
        },
        onEnterBack: () => {
          gsap.to(['.header', '.header-link', '.header-logo', '.header-tagline'], { color: '#ffffff', duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to(['.header', '.header-link', '.header-logo', '.header-tagline'], { color: 'var(--dark)', duration: 0.3 });
        },
      });

      // Phase 1: Fade out rows 1 and 3
      experienceTl.to('.exp-header--1', {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, 0);

      // Phase 1: Reposition row 2 header to bottom-center + white
      experienceTl.to('.exp-header--2', {
        top: '82%',
        left: '0.5rem',
        right: '0.5rem',
        duration: 1,
        ease: 'power2.inOut',
      }, 0);

      experienceTl.to('.exp-header--2 .exp-header__title', {
        color: '#ffffff',
        duration: 0.6,
        ease: 'none',
      }, 0.3);

      experienceTl.to('.exp-header--2 .exp-header__label', {
        color: '#ffffff',
        opacity: 1,
        duration: 0.6,
        ease: 'none',
      }, 0.3);

      experienceTl.to('.exp-header--2 .exp-header__descr', {
        color: '#ffffff',
        opacity: 1,
        duration: 0.6,
        ease: 'none',
      }, 0.3);

      // Phase 1: Grow frame to fullscreen (slight overshoot to kill sub-pixel gaps)
      experienceTl.to('.experience-frame', {
        top: -2,
        left: -2,
        width: 'calc(100vw + 4px)',
        height: 'calc(100vh + 4px)',
        duration: 1,
        ease: 'power2.inOut',
      }, 0);

      function getExperiencePanDistance() {
        const img = document.querySelector('.experience-img') as HTMLImageElement;
        if (!img || !img.naturalWidth) return 0;
        const finalImgW = (window.innerHeight * img.naturalWidth) / img.naturalHeight;
        return -(finalImgW - window.innerWidth);
      }

      // Phase 1: De-zoom + start drifting right
      experienceTl.to('.experience-img', {
        scale: 1,
        x: () => getExperiencePanDistance() * 0.15,
        duration: 1,
        ease: 'power2.inOut',
      }, 0);

      // Phase 2: Continue horizontal pan to the end
      experienceTl.to('.experience-img', {
        x: () => getExperiencePanDistance(),
        duration: 1.2,
        ease: 'none',
      });

      // ========== FOOTER ANIMATIONS ==========

      gsap.to('.footer-reveal', {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: 'headerEase',
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to('.footer-line-anim', {
        scaleX: 1,
        duration: 1.2,
        ease: customTitleEase,
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

    }, mainRef);

    return () => {
      ctx.revert();
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      gsap.ticker.remove(update);
    };
  }, []);

  return (
    <PageContext.Provider value={{ currentPage, navigateTo, isTransitioning }}>
      <div ref={mainRef}>
        <div className="page-intro"></div>
        <div className="page-transition"></div>
        <Preloader />
        <Header />
        <Cart />
        <main>
          <div id="smooth-wrapper" style={{ display: currentPage === 'home' ? 'block' : 'none' }}>
            <div id="smooth-content">
              <Banner />
              <Collection />
              <Shop />
              <Submarcas />
              <MarcasList />
              <Historia />
              <Experience />
              <Footer />
            </div>
          </div>
          {currentPage === 'contacto' && <Contacto />}
        </main>
      </div>
    </PageContext.Provider>
  );
}
