import m, { FactoryComponent, Attributes } from 'mithril';

export interface IParallaxOptions {
  /** Parallax speed ratio (0 = no movement, 1 = normal movement) */
  speed?: number;
  /** Enable responsive parallax (disable on mobile for performance) */
  responsiveThreshold?: number;
}

export interface IParallax extends IParallaxOptions, Attributes {
  /** Image source */
  src: string;
  /** Alt text for the image */
  alt?: string;
  /** Height of the parallax container */
  height?: string;
}

/**
 * CSS-only Parallax component - no MaterializeCSS dependencies
 * Parallax is an effect where the background content or image in this case,
 * is moved at a different speed than the foreground content while scrolling.
 */
export const Parallax: FactoryComponent<IParallax> = () => {
  let container: HTMLElement | null = null;
  let img: HTMLElement | null = null;
  let animationId: number | null = null;

  const updateParallax = (speed: number = 0.5) => {
    if (!container || !img) return;

    const rect = container.getBoundingClientRect();
    const containerTop = rect.top;
    const containerHeight = rect.height;
    const windowHeight = window.innerHeight;

    // Check if container is in viewport
    if (containerTop < windowHeight && containerTop + containerHeight > 0) {
      // Calculate parallax offset
      const scrollRatio = (windowHeight - containerTop) / (windowHeight + containerHeight);
      const parallaxOffset = (scrollRatio * containerHeight * speed) - (containerHeight * speed * 0.5);
      
      // Apply transform
      img.style.transform = `translate3d(0, ${parallaxOffset}px, 0)`;
    }
  };

  const handleScroll = (speed: number) => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
    
    animationId = requestAnimationFrame(() => {
      updateParallax(speed);
    });
  };

  const setupParallax = (containerEl: HTMLElement, speed: number, responsiveThreshold: number) => {
    container = containerEl;
    img = container.querySelector('.parallax img') as HTMLElement;
    
    if (!img) return;

    // Check if we should enable parallax based on screen size
    const shouldEnableParallax = window.innerWidth >= responsiveThreshold;
    
    if (shouldEnableParallax) {
      const scrollHandler = () => handleScroll(speed);
      
      // Initial parallax calculation
      updateParallax(speed);
      
      // Add scroll listener
      window.addEventListener('scroll', scrollHandler, { passive: true });
      window.addEventListener('resize', scrollHandler, { passive: true });
      
      // Store cleanup function
      container.setAttribute('data-parallax-cleanup', 'true');
      (container as any)._parallaxCleanup = () => {
        window.removeEventListener('scroll', scrollHandler);
        window.removeEventListener('resize', scrollHandler);
        if (animationId) {
          cancelAnimationFrame(animationId);
          animationId = null;
        }
      };
    }
  };

  const cleanup = () => {
    if (container && (container as any)._parallaxCleanup) {
      (container as any)._parallaxCleanup();
    }
    container = null;
    img = null;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  };

  return {
    oncreate: ({ dom, attrs }) => {
      const { speed = 0.5, responsiveThreshold = 768 } = attrs;
      setupParallax(dom as HTMLElement, speed, responsiveThreshold);
    },

    onremove: () => {
      cleanup();
    },

    view: ({ attrs }) => {
      const { src, alt = '', height = '500px' } = attrs;
      
      if (!src) return undefined;

      return m('.parallax-container', {
        style: { 
          height,
          position: 'relative',
          overflow: 'hidden',
          display: 'block'
        }
      }, [
        m('.parallax', {
          style: {
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            height: '120%' // Slightly larger for parallax effect
          }
        }, [
          m('img', {
            src,
            alt,
            style: {
              display: 'block',
              position: 'absolute',
              left: '50%',
              top: '50%',
              minWidth: '100%',
              minHeight: '100%',
              width: 'auto',
              height: 'auto',
              transform: 'translate3d(-50%, -50%, 0)',
              objectFit: 'cover',
              zIndex: '1',
              backgroundColor: '#f0f0f0' // Fallback background
            },
            onerror: (e: Event) => {
              console.warn('Parallax image failed to load:', src);
              const img = e.target as HTMLImageElement;
              img.style.backgroundColor = '#ddd';
              img.alt = 'Image failed to load';
            }
          })
        ])
      ]);
    },
  };
};
