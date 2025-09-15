/*!
 * Waves Effect for Mithril Materialized
 * Based on Waves v0.6.4 by Alfiana E. Sibuea
 * Adapted for TypeScript and Mithril integration
 */

interface WavesOffset {
  top: number;
  left: number;
}

export class WavesEffect {
  private static duration = 750;

  private static offset(elem: Element): WavesOffset {
    const rect = elem.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  }

  private static createRipple(e: MouseEvent | TouchEvent, element: Element): void {
    // Disable right click
    if ((e as MouseEvent).button === 2) {
      return;
    }

    // Create ripple element
    const ripple = document.createElement('div');
    ripple.className = 'waves-ripple';

    // Get click position relative to element
    const pos = this.offset(element);
    const relativeY = (e as any).pageY - pos.top;
    const relativeX = (e as any).pageX - pos.left;

    // Calculate scale based on element size
    const scale = (element.clientWidth / 100) * 10;

    // Set initial ripple position and style
    ripple.style.cssText = `
      top: ${relativeY}px;
      left: ${relativeX}px;
      transform: scale(0);
      opacity: 1;
    `;

    // Add ripple to element
    element.appendChild(ripple);

    // Force reflow and animate
    ripple.offsetHeight;
    ripple.style.transform = `scale(${scale})`;
    ripple.style.opacity = '1';

    // Store reference for cleanup
    ripple.setAttribute('data-created', Date.now().toString());
  }

  private static removeRipples(element: Element): void {
    const ripples = element.querySelectorAll('.waves-ripple');
    ripples.forEach((ripple: Element) => {
      const created = parseInt(ripple.getAttribute('data-created') || '0');
      const age = Date.now() - created;

      const fadeOut = () => {
        (ripple as HTMLElement).style.opacity = '0';
        setTimeout(() => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }, this.duration);
      };

      if (age >= 350) {
        fadeOut();
      } else {
        setTimeout(fadeOut, 350 - age);
      }
    });
  }

  static onMouseDown = (e: MouseEvent) => {
    const element = e.currentTarget as Element;
    if (element && element.classList.contains('waves-effect')) {
      WavesEffect.createRipple(e, element);
    }
  };

  static onMouseUp = (e: MouseEvent) => {
    const element = e.currentTarget as Element;
    if (element && element.classList.contains('waves-effect')) {
      WavesEffect.removeRipples(element);
    }
  };

  static onMouseLeave = (e: MouseEvent) => {
    const element = e.currentTarget as Element;
    if (element && element.classList.contains('waves-effect')) {
      WavesEffect.removeRipples(element);
    }
  };

  static onTouchStart = (e: TouchEvent) => {
    const element = e.currentTarget as Element;
    if (element && element.classList.contains('waves-effect')) {
      WavesEffect.createRipple(e, element);
    }
  };

  static onTouchEnd = (e: TouchEvent) => {
    const element = e.currentTarget as Element;
    if (element && element.classList.contains('waves-effect')) {
      WavesEffect.removeRipples(element);
    }
  };
}