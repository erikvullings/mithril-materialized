import m, { FactoryComponent, Attributes } from 'mithril';

export interface ICarouselItem extends Attributes {
  /** Relative page link, e.g. '#one' */
  href: string;
  /** Image source */
  src: string;
  /** Alternative name */
  alt?: string;
}

export interface ICarouselOptions {
  /** Duration of carousel item change animation */
  duration?: number;
  /** Perspective of carousel */
  dist?: number;
  /** Height of carousel */
  height?: number;
  /** Number of items visible */
  numVisible?: number;
  /** Perspective angle */
  shift?: number;
  /** Fullwidth carousel */
  fullWidth?: boolean;
  /** Enable indicators */
  indicators?: boolean;
  /** Auto slide */
  autoSlide?: boolean;
  /** Auto slide interval in ms */
  interval?: number;
}

export interface ICarousel extends ICarouselOptions, Attributes {
  /** The list of images */
  items: ICarouselItem[];
  /** Called when carousel item changes */
  onCycleTo?: (item: ICarouselItem, index: number) => void;
}

export const CarouselItem: FactoryComponent<ICarouselItem> = () => {
  return {
    view: ({ attrs: { href, src, alt, ...params } }) => {
      return m('a.carousel-item', { ...params, href }, m('img', { src, alt }));
    },
  };
};

/**
 * CSS-only Carousel component - no MaterializeCSS dependencies
 * Creates a responsive image carousel with navigation controls
 */
export const Carousel: FactoryComponent<ICarousel> = () => {
  const state = {
    currentIndex: 0,
    isTransitioning: false,
    autoSlideTimer: null as number | null,
    touchStartX: 0,
    touchEndX: 0,
  };

  const nextSlide = (attrs: ICarousel, loopCount = 0) => {
    if (state.isTransitioning || loopCount > attrs.items.length) return;
    
    state.isTransitioning = true;
    const nextIndex = (state.currentIndex + 1) % attrs.items.length;
    state.currentIndex = nextIndex;
    
    if (attrs.onCycleTo) {
      attrs.onCycleTo(attrs.items[nextIndex], nextIndex);
    }
    
    setTimeout(() => {
      state.isTransitioning = false;
    }, attrs.duration || 200);
    
    m.redraw();
  };

  const prevSlide = (attrs: ICarousel) => {
    if (state.isTransitioning) return;
    
    state.isTransitioning = true;
    const prevIndex = state.currentIndex === 0 ? attrs.items.length - 1 : state.currentIndex - 1;
    state.currentIndex = prevIndex;
    
    if (attrs.onCycleTo) {
      attrs.onCycleTo(attrs.items[prevIndex], prevIndex);
    }
    
    setTimeout(() => {
      state.isTransitioning = false;
    }, attrs.duration || 200);
    
    m.redraw();
  };

  const goToSlide = (index: number, attrs: ICarousel) => {
    if (state.isTransitioning || index === state.currentIndex) return;
    
    state.isTransitioning = true;
    state.currentIndex = index;
    
    if (attrs.onCycleTo) {
      attrs.onCycleTo(attrs.items[index], index);
    }
    
    setTimeout(() => {
      state.isTransitioning = false;
    }, attrs.duration || 200);
    
    m.redraw();
  };

  const startAutoSlide = (attrs: ICarousel) => {
    if (!attrs.autoSlide) return;
    
    const interval = attrs.interval || 6000;
    state.autoSlideTimer = window.setInterval(() => {
      nextSlide(attrs);
    }, interval);
  };

  const stopAutoSlide = () => {
    if (state.autoSlideTimer) {
      clearInterval(state.autoSlideTimer);
      state.autoSlideTimer = null;
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (!e.touches || e.touches.length === 0) return;
    state.touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent, attrs: ICarousel) => {
    if (!e.changedTouches || e.changedTouches.length === 0) return;
    
    state.touchEndX = e.changedTouches[0].clientX;
    const deltaX = state.touchStartX - state.touchEndX;
    const threshold = 50;
    
    if (Math.abs(deltaX) > threshold) {
      if (deltaX > 0) {
        nextSlide(attrs);
      } else {
        prevSlide(attrs);
      }
    }
  };

  return {
    oninit: ({ attrs }) => {
      startAutoSlide(attrs);
    },

    onremove: () => {
      stopAutoSlide();
    },

    view: ({ attrs }) => {
      const { 
        items, 
        fullWidth = false, 
        indicators = true, 
        height = 400,
        numVisible = 5,
      } = attrs;

      if (!items || items.length === 0) return undefined;

      const containerClasses = [
        'carousel',
        fullWidth ? 'carousel-fullwidth' : '',
      ].filter(Boolean).join(' ');

      return m('.carousel-container', {
        style: { height: `${height}px` },
        onmouseenter: () => stopAutoSlide(),
        onmouseleave: () => startAutoSlide(attrs),
        ontouchstart: handleTouchStart,
        ontouchend: (e: TouchEvent) => handleTouchEnd(e, attrs),
      }, [
        // Carousel wrapper
        m(`.${containerClasses}`, {
          style: {
            height: `${height}px`,
            overflow: 'hidden',
            position: 'relative',
          }
        }, [
          // Carousel track
          m('.carousel-track', {
            style: {
              display: 'flex',
              transform: `translateX(-${state.currentIndex * (100 / (fullWidth ? 1 : numVisible))}%)`,
              transition: state.isTransitioning ? `transform ${attrs.duration || 200}ms ease` : 'none',
              width: fullWidth ? `${items.length * 100}%` : `${items.length * (100 / numVisible)}%`,
            }
          }, items.map((item, index) => 
            m('a.carousel-item', {
              key: index,
              href: item.href,
              className: index === state.currentIndex ? 'active' : '',
              style: {
                width: fullWidth ? `${100 / items.length}%` : `${100 / numVisible}%`,
                flexShrink: 0,
                display: 'block',
                position: 'relative',
              }
            }, [
              m('img', { 
                src: item.src, 
                alt: item.alt || `Carousel item ${index + 1}`,
                style: {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }
              })
            ])
          )),

          // Navigation arrows
          !fullWidth && items.length > numVisible && [
            m('button.carousel-prev', {
              onclick: () => prevSlide(attrs),
              style: {
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '18px',
                zIndex: 2,
              }
            }, '‹'),
            
            m('button.carousel-next', {
              onclick: () => nextSlide(attrs),
              style: {
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: 'pointer',
                fontSize: '18px',
                zIndex: 2,
              }
            }, '›')
          ]
        ]),

        // Indicators
        indicators && items.length > 1 && m('.carousel-indicators', {
          style: {
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '16px',
          }
        }, items.map((_, index) => 
          m('button.carousel-indicator', {
            key: index,
            onclick: () => goToSlide(index, attrs),
            className: index === state.currentIndex ? 'active' : '',
            style: {
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              border: 'none',
              background: index === state.currentIndex ? 'var(--md-primary)' : 'var(--md-grey-400)',
              cursor: 'pointer',
              transition: 'background-color 200ms ease',
            }
          })
        ))
      ]);
    },
  };
};
