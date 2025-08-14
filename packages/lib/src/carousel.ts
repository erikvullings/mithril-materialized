import m, { FactoryComponent, Attributes } from 'mithril';

export interface CarouselItem extends Attributes {
  /** Relative page link, e.g. '#one' */
  href: string;
  /** Image source */
  src: string;
  /** Alternative name */
  alt?: string;
}

export interface CarouselOptions {
  /** Duration of carousel item change animation in ms */
  duration?: number;
  /** Zoom scale (perspective distance) */
  dist?: number;
  /** Spacing for center image */
  shift?: number;
  /** Padding between non-center items */
  padding?: number;
  /** Number of visible items in carousel */
  numVisible?: number;
  /** Change to full width styles */
  fullWidth?: boolean;
  /** Toggle indicators */
  indicators?: boolean;
  /** Don't wrap around and cycle through items */
  noWrap?: boolean;
}

export interface CarouselAttributes extends CarouselOptions, Attributes {
  /** The list of images */
  items: CarouselItem[];
  /** Called when carousel item changes */
  onCycleTo?: (item: CarouselItem, index: number, dragged: boolean) => void;
}

/**
 * Materialize CSS Carousel component with dynamic positioning
 * Port of the original MaterializeCSS carousel logic
 */
export const Carousel: FactoryComponent<CarouselAttributes> = () => {
  // Default options based on original Materialize CSS
  const defaults = {
    duration: 200, // ms
    dist: -100, // zoom scale
    shift: 0, // spacing for center image
    padding: 0, // Padding between non center items
    numVisible: 5, // Number of visible items in carousel
    fullWidth: false, // Change to full width styles
    indicators: false, // Toggle indicators
    noWrap: false, // Don't wrap around and cycle through items
  };

  const state = {
    // Carousel state
    hasMultipleSlides: false,
    showIndicators: false,
    noWrap: false,
    pressed: false,
    dragged: false,
    verticalDragged: false,
    offset: 0,
    target: 0,
    center: 0,

    // Touch/drag state
    reference: 0,
    referenceY: 0,
    velocity: 0,
    amplitude: 0,
    frame: 0,
    timestamp: 0,

    // Item measurements
    itemWidth: 0,
    itemHeight: 0,
    dim: 1, // Make sure dim is non zero for divisions

    // Animation
    ticker: null as number | null,
    scrollingTimeout: null as number | null,

    // Callbacks
    oneTimeCallback: null as ((item: HTMLElement, dragged: boolean) => void) | null,
  };

  // Utility functions
  const xpos = (e: MouseEvent | TouchEvent): number => {
    // Touch event
    if ('targetTouches' in e && e.targetTouches && e.targetTouches.length >= 1) {
      return e.targetTouches[0].clientX;
    }
    // Mouse event
    return (e as MouseEvent).clientX;
  };

  const ypos = (e: MouseEvent | TouchEvent): number => {
    // Touch event
    if ('targetTouches' in e && e.targetTouches && e.targetTouches.length >= 1) {
      return e.targetTouches[0].clientY;
    }
    // Mouse event
    return (e as MouseEvent).clientY;
  };

  const wrap = (x: number, count: number): number => {
    return x >= count ? x % count : x < 0 ? wrap(count + (x % count), count) : x;
  };

  const track = () => {
    const now = Date.now();
    const elapsed = now - state.timestamp;
    state.timestamp = now;
    const delta = state.offset - state.frame;
    state.frame = state.offset;

    const v = (1000 * delta) / (1 + elapsed);
    state.velocity = 0.8 * v + 0.2 * state.velocity;
  };

  const autoScroll = () => {
    if (state.amplitude) {
      const elapsed = Date.now() - state.timestamp;
      const delta = state.amplitude * Math.exp(-elapsed / defaults.duration);
      if (delta > 2 || delta < -2) {
        scroll(state.target - delta);
        requestAnimationFrame(autoScroll);
      } else {
        scroll(state.target);
      }
    }
  };

  const updateItemStyle = (el: HTMLElement, opacity: number, zIndex: number, transform: string) => {
    el.style.transform = transform;
    el.style.zIndex = zIndex.toString();
    el.style.opacity = opacity.toString();
    el.style.visibility = 'visible';
  };

  const scroll = (x?: number, attrs?: CarouselAttributes) => {
    const carouselEl = document.querySelector('.carousel') as HTMLElement;
    if (!carouselEl) return;

    // Track scrolling state
    if (!carouselEl.classList.contains('scrolling')) {
      carouselEl.classList.add('scrolling');
    }
    if (state.scrollingTimeout != null) {
      window.clearTimeout(state.scrollingTimeout);
    }
    state.scrollingTimeout = window.setTimeout(() => {
      carouselEl.classList.remove('scrolling');
    }, defaults.duration);

    // Start actual scroll
    const items = Array.from(carouselEl.querySelectorAll('.carousel-item')) as HTMLElement[];
    const count = items.length;
    if (count === 0) return;

    const lastCenter = state.center;
    const numVisibleOffset = 1 / defaults.numVisible;

    state.offset = typeof x === 'number' ? x : state.offset;
    state.center = Math.floor((state.offset + state.dim / 2) / state.dim);
    const delta = state.offset - state.center * state.dim;
    const dir = delta < 0 ? 1 : -1;
    const tween = (-dir * delta * 2) / state.dim;
    const half = count >> 1;

    let alignment: string;
    let centerTweenedOpacity: number;

    if (defaults.fullWidth) {
      alignment = 'translateX(0)';
      centerTweenedOpacity = 1;
    } else {
      alignment = `translateX(${(carouselEl.clientWidth - state.itemWidth) / 2}px) `;
      alignment += `translateY(${(carouselEl.clientHeight - state.itemHeight) / 2}px)`;
      centerTweenedOpacity = 1 - numVisibleOffset * tween;
    }

    // Set indicator active
    if (state.showIndicators) {
      const diff = state.center % count;
      const indicators = carouselEl.querySelectorAll('.indicator-item');
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === diff);
      });
    }

    // Center item
    if (!state.noWrap || (state.center >= 0 && state.center < count)) {
      const el = items[wrap(state.center, count)];

      // Add active class to center item
      items.forEach((item) => item.classList.remove('active'));
      el.classList.add('active');

      const transformString = `${alignment} translateX(${-delta / 2}px) translateX(${
        dir * defaults.shift * tween
      }px) translateZ(${defaults.dist * tween}px)`;
      updateItemStyle(el, centerTweenedOpacity, 0, transformString);
    }

    // Side items
    for (let i = 1; i <= half; ++i) {
      let zTranslation: number;
      let tweenedOpacity: number;

      // Right side
      if (defaults.fullWidth) {
        zTranslation = defaults.dist;
        tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
      } else {
        zTranslation = defaults.dist * (i * 2 + tween * dir);
        tweenedOpacity = 1 - numVisibleOffset * (i * 2 + tween * dir);
      }

      if (!state.noWrap || state.center + i < count) {
        const el = items[wrap(state.center + i, count)];
        const transformString = `${alignment} translateX(${
          defaults.shift + (state.dim * i - delta) / 2
        }px) translateZ(${zTranslation}px)`;
        updateItemStyle(el, tweenedOpacity, -i, transformString);
      }

      // Left side
      if (defaults.fullWidth) {
        zTranslation = defaults.dist;
        tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
      } else {
        zTranslation = defaults.dist * (i * 2 - tween * dir);
        tweenedOpacity = 1 - numVisibleOffset * (i * 2 - tween * dir);
      }

      if (!state.noWrap || state.center - i >= 0) {
        const el = items[wrap(state.center - i, count)];
        const transformString = `${alignment} translateX(${
          -defaults.shift + (-state.dim * i - delta) / 2
        }px) translateZ(${zTranslation}px)`;
        updateItemStyle(el, tweenedOpacity, -i, transformString);
      }
    }

    // onCycleTo callback
    if (lastCenter !== state.center && attrs && attrs.onCycleTo) {
      const currItem = items[wrap(state.center, count)];
      if (currItem) {
        const itemIndex = Array.from(items).indexOf(currItem);
        attrs.onCycleTo(attrs.items[itemIndex], itemIndex, state.dragged);
      }
    }

    // One time callback
    if (state.oneTimeCallback) {
      const currItem = items[wrap(state.center, count)];
      state.oneTimeCallback(currItem, state.dragged);
      state.oneTimeCallback = null;
    }
  };

  const cycleTo = (
    n: number,
    callback?: (item: HTMLElement, dragged: boolean) => void,
    _attrs?: CarouselAttributes
  ) => {
    const items = document.querySelectorAll('.carousel-item');
    const count = items.length;
    if (count === 0) return;

    let diff = (state.center % count) - n;

    // Account for wraparound
    if (!state.noWrap) {
      if (diff < 0) {
        if (Math.abs(diff + count) < Math.abs(diff)) {
          diff += count;
        }
      } else if (diff > 0) {
        if (Math.abs(diff - count) < diff) {
          diff -= count;
        }
      }
    }

    state.target = state.dim * Math.round(state.offset / state.dim);

    if (diff < 0) {
      state.target += state.dim * Math.abs(diff);
    } else if (diff > 0) {
      state.target -= state.dim * diff;
    }

    // Set one time callback
    if (callback) {
      state.oneTimeCallback = callback;
    }

    // Scroll
    if (state.offset !== state.target) {
      state.amplitude = state.target - state.offset;
      state.timestamp = Date.now();
      requestAnimationFrame(autoScroll);
    }
  };

  // Event handlers
  const handleCarouselTap = (e: MouseEvent | TouchEvent) => {
    // Fixes firefox draggable image bug
    if (e.type === 'mousedown' && (e.target as HTMLElement).tagName === 'IMG') {
      e.preventDefault();
    }
    state.pressed = true;
    state.dragged = false;
    state.verticalDragged = false;
    state.reference = xpos(e);
    state.referenceY = ypos(e);

    state.velocity = state.amplitude = 0;
    state.frame = state.offset;
    state.timestamp = Date.now();

    if (state.ticker) clearInterval(state.ticker);
    state.ticker = setInterval(track, 100);
  };

  const handleCarouselDrag = (e: MouseEvent | TouchEvent, attrs: CarouselAttributes) => {
    if (state.pressed) {
      const x = xpos(e);
      const y = ypos(e);
      const delta = state.reference - x;
      const deltaY = Math.abs(state.referenceY - y);

      if (deltaY < 30 && !state.verticalDragged) {
        if (delta > 2 || delta < -2) {
          state.dragged = true;
          state.reference = x;
          scroll(state.offset + delta, attrs);
        }
      } else if (state.dragged) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      } else {
        state.verticalDragged = true;
      }
    }

    if (state.dragged) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    return true;
  };

  const handleCarouselRelease = (e: MouseEvent | TouchEvent, _attrs: CarouselAttributes) => {
    if (state.pressed) {
      state.pressed = false;
    } else {
      return;
    }

    if (state.ticker) clearInterval(state.ticker);
    state.target = state.offset;

    if (state.velocity > 10 || state.velocity < -10) {
      state.amplitude = 0.9 * state.velocity;
      state.target = state.offset + state.amplitude;
    }

    state.target = Math.round(state.target / state.dim) * state.dim;

    // No wrap of items
    if (state.noWrap) {
      const items = document.querySelectorAll('.carousel-item');
      if (state.target >= state.dim * (items.length - 1)) {
        state.target = state.dim * (items.length - 1);
      } else if (state.target < 0) {
        state.target = 0;
      }
    }

    state.amplitude = state.target - state.offset;
    state.timestamp = Date.now();
    requestAnimationFrame(autoScroll);

    if (state.dragged) {
      e.preventDefault();
      e.stopPropagation();
    }
    return false;
  };

  const handleCarouselClick = (e: MouseEvent, attrs: CarouselAttributes) => {
    if (state.dragged) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    } else if (!defaults.fullWidth) {
      const target = (e.target as HTMLElement).closest('.carousel-item') as HTMLElement;
      if (target) {
        const items = Array.from(document.querySelectorAll('.carousel-item'));
        const clickedIndex = items.indexOf(target);
        const diff = wrap(state.center, items.length) - clickedIndex;

        if (diff !== 0) {
          e.preventDefault();
          e.stopPropagation();
        }
        cycleTo(clickedIndex, undefined, attrs);
      }
    }
    return true;
  };

  const handleIndicatorClick = (e: MouseEvent, attrs: CarouselAttributes) => {
    e.stopPropagation();
    const indicator = (e.target as HTMLElement).closest('.indicator-item') as HTMLElement;
    if (indicator) {
      const indicators = Array.from(document.querySelectorAll('.indicator-item'));
      const index = indicators.indexOf(indicator);
      cycleTo(index, undefined, attrs);
    }
  };

  return {
    view: ({ attrs }) => {
      const { items, indicators = false } = attrs;

      if (!items || items.length === 0) return undefined;

      // Merge options
      Object.assign(defaults, attrs);

      const supportTouch = typeof window.ontouchstart !== 'undefined';

      return m(
        '.carousel',
        {
          oncreate: ({ attrs, dom }) => {
            const carouselEl = dom as HTMLElement;
            const items = carouselEl.querySelectorAll('.carousel-item');

            state.hasMultipleSlides = items.length > 1;
            state.showIndicators = defaults.indicators && state.hasMultipleSlides;
            state.noWrap = defaults.noWrap || !state.hasMultipleSlides;

            if (items.length > 0) {
              const firstItem = items[0] as HTMLElement;
              state.itemWidth = firstItem.offsetWidth;
              state.itemHeight = firstItem.offsetHeight;
              state.dim = state.itemWidth * 2 + defaults.padding || 1;
            }

            // Cap numVisible at count
            defaults.numVisible = Math.min(items.length, defaults.numVisible);

            // Initial scroll
            scroll(state.offset, attrs);
          },
          onmousedown: (e: MouseEvent) => handleCarouselTap(e),
          onmousemove: (e: MouseEvent) => handleCarouselDrag(e, attrs),
          onmouseup: (e: MouseEvent) => handleCarouselRelease(e, attrs),
          onmouseleave: (e: MouseEvent) => handleCarouselRelease(e, attrs),
          onclick: (e: MouseEvent) => handleCarouselClick(e, attrs),
          ontouchstart: supportTouch ? (e: TouchEvent) => handleCarouselTap(e) : undefined,
          ontouchmove: supportTouch ? (e: TouchEvent) => handleCarouselDrag(e, attrs) : undefined,
          ontouchend: supportTouch ? (e: TouchEvent) => handleCarouselRelease(e, attrs) : undefined,
        },
        [
          // Carousel items
          ...items.map((item) =>
            m(
              'a.carousel-item',
              {
                // key: index,
                href: item.href,
                style: 'visibility: hidden;', // Initially hidden, will be shown by scroll
              },
              m('img', { src: item.src, alt: item.alt })
            )
          ),

          // Indicators
          indicators &&
            items.length > 1 &&
            m(
              'ul.indicators',
              items.map((_, index) =>
                m('li.indicator-item', {
                  key: `indicator-${index}`,
                  className: index === 0 ? 'active' : '',
                  onclick: (e: MouseEvent) => handleIndicatorClick(e, attrs),
                })
              )
            ),
        ]
      );
    },
  };
};
