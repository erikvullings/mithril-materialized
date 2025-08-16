import { FactoryComponent, Attributes } from 'mithril';

export interface PushpinOptions {
  /** Distance from top of page where element becomes fixed */
  top?: number;
  /** Distance from bottom of page where element stops being fixed */
  bottom?: number;
  /** Offset for calculations */
  offset?: number;
  /** Called when pushpin position changes */
  onPositionChange?: (position: 'pin-top' | 'pinned' | 'pin-bottom') => void;
}

interface PushpinState {
  originalOffset: number;
}

export class Pushpin {
  public el: HTMLElement;
  public options: Required<PushpinOptions>;
  private state: PushpinState;

  private static defaults: PushpinOptions = {
    top: 0,
    bottom: Infinity,
    offset: 0,
    onPositionChange: undefined,
  };

  // Bound event handler
  private _updateElementPositionBound!: () => void;

  constructor(el: HTMLElement, options: PushpinOptions = {}) {
    this.el = el;
    this.options = { ...Pushpin.defaults, ...options } as Required<PushpinOptions>;

    this.state = {
      originalOffset: this.el.getBoundingClientRect().top + window.pageYOffset,
    };

    (this.el as any).M_Pushpin = this;
    this._setupEventHandlers();
    this._updateElementPosition();
  }

  static getInstance(el: HTMLElement): Pushpin | undefined {
    return (el as any).M_Pushpin;
  }

  destroy(): void {
    this.el.style.position = '';
    this.el.style.top = '';
    this.el.style.left = '';
    this._removeEventHandlers();
    (this.el as any).M_Pushpin = undefined;
  }

  _setupEventHandlers(): void {
    this._updateElementPositionBound = this._updateElementPosition.bind(this);
    window.addEventListener('scroll', this._updateElementPositionBound);
    window.addEventListener('resize', this._updateElementPositionBound);
  }

  _removeEventHandlers(): void {
    window.removeEventListener('scroll', this._updateElementPositionBound);
    window.removeEventListener('resize', this._updateElementPositionBound);
  }

  _updateElementPosition(): void {
    const scrolled = window.pageYOffset;
    const elementTop = this.state.originalOffset - this.options.offset;
    // const elementBottom = elementTop + this.el.offsetHeight;

    // Check if element should be pinned
    if (scrolled > elementTop) {
      // Check if element is past bottom
      if (this.options.bottom !== Infinity && scrolled > this.options.bottom) {
        this._removePinClasses();
        this.el.classList.add('pin-bottom');
        this.el.style.position = 'absolute';
        this.el.style.top = this.options.bottom - this.el.offsetHeight + 'px';
        this.el.style.left = '';

        if (this.options.onPositionChange) {
          this.options.onPositionChange('pin-bottom');
        }
      } else {
        // Pin element
        this._removePinClasses();
        this.el.classList.add('pinned');
        this.el.style.position = 'fixed';
        this.el.style.top = this.options.top + 'px';
        this.el.style.left = this.el.getBoundingClientRect().left + 'px';

        if (this.options.onPositionChange) {
          this.options.onPositionChange('pinned');
        }
      }
    } else {
      // Unpin element
      this._removePinClasses();
      this.el.classList.add('pin-top');
      this.el.style.position = '';
      this.el.style.top = '';
      this.el.style.left = '';

      if (this.options.onPositionChange) {
        this.options.onPositionChange('pin-top');
      }
    }
  }

  _removePinClasses(): void {
    this.el.classList.remove('pin-top');
    this.el.classList.remove('pinned');
    this.el.classList.remove('pin-bottom');
  }

  _updatePosition(): void {
    // Recalculate original offset in case element moved
    this.state.originalOffset = this.el.getBoundingClientRect().top + window.pageYOffset;
    this._updateElementPosition();
  }
}

// Mithril component for declarative usage
export interface PushpinAttrs extends Attributes, PushpinOptions {
  /** Element selector or reference to attach pushpin to */
  targetSelector?: string;
}

export const PushpinComponent: FactoryComponent<PushpinAttrs> = () => {
  let pushpinInstance: Pushpin | null = null;

  return {
    oncreate: ({ attrs }) => {
      if (attrs.targetSelector) {
        const targetEl = document.querySelector(attrs.targetSelector) as HTMLElement;
        if (targetEl) {
          pushpinInstance = new Pushpin(targetEl, attrs);
        }
      }
    },

    onupdate: ({ attrs }) => {
      if (pushpinInstance) {
        // Update options and recalculate position
        pushpinInstance.options = { ...pushpinInstance.options, ...attrs };
        pushpinInstance._updatePosition();
      }
    },

    onremove: () => {
      if (pushpinInstance) {
        pushpinInstance.destroy();
        pushpinInstance = null;
      }
    },

    view: () => null, // This component doesn't render anything itself
  };
};

// Helper function to initialize pushpins on elements
export const initPushpins = (selector: string = '.pushpin', options: PushpinOptions = {}): Pushpin[] => {
  const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  const pushpins: Pushpin[] = [];

  elements.forEach((el) => {
    if (!(el as any).M_Pushpin) {
      pushpins.push(new Pushpin(el, options));
    }
  });

  return pushpins;
};
