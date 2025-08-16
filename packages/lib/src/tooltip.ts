import { FactoryComponent, Attributes } from 'mithril';

export interface TooltipOptions {
  /** Delay before tooltip appears on hover */
  enterDelay?: number;
  /** Delay before tooltip disappears after hover ends */
  exitDelay?: number;
  /** HTML content for the tooltip */
  html?: string | null;
  /** Margin from element */
  margin?: number;
  /** Animation in duration */
  inDuration?: number;
  /** Animation out duration */
  outDuration?: number;
  /** Position of tooltip */
  position?: 'top' | 'bottom' | 'left' | 'right';
  /** Movement during transition */
  transitionMovement?: number;
}

interface TooltipState {
  isOpen: boolean;
  isHovered: boolean;
  isFocused: boolean;
  xMovement: number;
  yMovement: number;
  enterDelayTimeout?: number;
  exitDelayTimeout?: number;
}

export class Tooltip {
  public el: HTMLElement;
  public tooltipEl!: HTMLElement;
  public options: Required<TooltipOptions>;
  private state: TooltipState;

  private static defaults: TooltipOptions = {
    exitDelay: 200,
    enterDelay: 0,
    html: null,
    margin: 5,
    inDuration: 250,
    outDuration: 200,
    position: 'bottom',
    transitionMovement: 10,
  };

  // Bound event handlers
  private _handleMouseEnterBound!: () => void;
  private _handleMouseLeaveBound!: () => void;
  private _handleFocusBound!: () => void;
  private _handleBlurBound!: () => void;

  constructor(el: HTMLElement, options: TooltipOptions = {}) {
    this.el = el;
    this.options = { ...Tooltip.defaults, ...options } as Required<TooltipOptions>;

    this.state = {
      isOpen: false,
      isHovered: false,
      isFocused: false,
      xMovement: 0,
      yMovement: 0,
    };

    (this.el as any).M_Tooltip = this;
    this._appendTooltipEl();
    this._setupEventHandlers();
  }

  static getInstance(el: HTMLElement): Tooltip | undefined {
    return (el as any).M_Tooltip;
  }

  destroy(): void {
    this.tooltipEl.remove();
    this._removeEventHandlers();
    (this.el as any).M_Tooltip = undefined;
  }

  _appendTooltipEl(): void {
    const tooltipEl = document.createElement('div');
    tooltipEl.classList.add('material-tooltip');
    this.tooltipEl = tooltipEl;

    const tooltipContentEl = document.createElement('div');
    tooltipContentEl.classList.add('tooltip-content');
    tooltipContentEl.innerHTML = this.options.html || '';
    tooltipEl.appendChild(tooltipContentEl);

    document.body.appendChild(tooltipEl);
  }

  _updateTooltipContent(): void {
    const contentEl = this.tooltipEl.querySelector('.tooltip-content');
    if (contentEl) {
      contentEl.innerHTML = this.options.html || '';
    }
  }

  _setupEventHandlers(): void {
    this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
    this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
    this._handleFocusBound = this._handleFocus.bind(this);
    this._handleBlurBound = this._handleBlur.bind(this);

    this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
    this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
    this.el.addEventListener('focus', this._handleFocusBound, true);
    this.el.addEventListener('blur', this._handleBlurBound, true);
  }

  _removeEventHandlers(): void {
    this.el.removeEventListener('mouseenter', this._handleMouseEnterBound);
    this.el.removeEventListener('mouseleave', this._handleMouseLeaveBound);
    this.el.removeEventListener('focus', this._handleFocusBound, true);
    this.el.removeEventListener('blur', this._handleBlurBound, true);
  }

  open(isManual: boolean = true): void {
    if (this.state.isOpen) {
      return;
    }

    this.state.isOpen = true;

    // Update tooltip content with data attributes
    this.options = { ...this.options, ...this._getAttributeOptions() };
    this._updateTooltipContent();
    this._setEnterDelayTimeout(isManual);
  }

  close(): void {
    if (!this.state.isOpen) {
      return;
    }

    this.state.isHovered = false;
    this.state.isFocused = false;
    this.state.isOpen = false;
    this._setExitDelayTimeout();
  }

  _setExitDelayTimeout(): void {
    if (this.state.exitDelayTimeout) {
      clearTimeout(this.state.exitDelayTimeout);
    }

    this.state.exitDelayTimeout = window.setTimeout(() => {
      if (this.state.isHovered || this.state.isFocused) {
        return;
      }
      this._animateOut();
    }, this.options.exitDelay);
  }

  _setEnterDelayTimeout(isManual: boolean): void {
    if (this.state.enterDelayTimeout) {
      clearTimeout(this.state.enterDelayTimeout);
    }

    this.state.enterDelayTimeout = window.setTimeout(() => {
      if (!this.state.isHovered && !this.state.isFocused && !isManual) {
        return;
      }
      this._animateIn();
    }, this.options.enterDelay);
  }

  _positionTooltip(): void {
    const origin = this.el;
    const tooltip = this.tooltipEl;
    const originHeight = origin.offsetHeight;
    const originWidth = origin.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;
    const margin = this.options.margin;

    this.state.xMovement = 0;
    this.state.yMovement = 0;

    const originRect = origin.getBoundingClientRect();
    let targetTop = originRect.top + window.pageYOffset;
    let targetLeft = originRect.left + window.pageXOffset;

    switch (this.options.position) {
      case 'top':
        targetTop += -tooltipHeight - margin;
        targetLeft += originWidth / 2 - tooltipWidth / 2;
        this.state.yMovement = -this.options.transitionMovement;
        break;
      case 'right':
        targetTop += originHeight / 2 - tooltipHeight / 2;
        targetLeft += originWidth + margin;
        this.state.xMovement = this.options.transitionMovement;
        break;
      case 'left':
        targetTop += originHeight / 2 - tooltipHeight / 2;
        targetLeft += -tooltipWidth - margin;
        this.state.xMovement = -this.options.transitionMovement;
        break;
      case 'bottom':
      default:
        targetTop += originHeight + margin;
        targetLeft += originWidth / 2 - tooltipWidth / 2;
        this.state.yMovement = this.options.transitionMovement;
        break;
    }

    const repositioned = this._repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
    this.tooltipEl.style.top = repositioned.y + 'px';
    this.tooltipEl.style.left = repositioned.x + 'px';
  }

  _repositionWithinScreen(x: number, y: number, width: number, height: number): { x: number; y: number } {
    const scrollLeft = window.pageXOffset;
    const scrollTop = window.pageYOffset;
    let newX = x - scrollLeft;
    let newY = y - scrollTop;

    const offset = this.options.margin + this.options.transitionMovement;

    // Check boundaries
    if (newX < offset) {
      newX = offset;
    } else if (newX + width > window.innerWidth - offset) {
      newX = window.innerWidth - width - offset;
    }

    if (newY < offset) {
      newY = offset;
    } else if (newY + height > window.innerHeight - offset) {
      newY = window.innerHeight - height - offset;
    }

    return {
      x: newX + scrollLeft,
      y: newY + scrollTop,
    };
  }

  _animateIn(): void {
    this._positionTooltip();
    this.tooltipEl.style.visibility = 'visible';

    // CSS animation
    this.tooltipEl.style.cssText += `
      opacity: 0;
      transform: translate(0, 0);
      transition: opacity ${this.options.inDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1),
                  transform ${this.options.inDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1);
    `;

    setTimeout(() => {
      this.tooltipEl.style.opacity = '1';
      this.tooltipEl.style.transform = `translate(${this.state.xMovement}px, ${this.state.yMovement}px)`;
    }, 10);
  }

  _animateOut(): void {
    this.tooltipEl.style.cssText += `
      transition: opacity ${this.options.outDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1),
                  transform ${this.options.outDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1);
      opacity: 0;
      transform: translate(0, 0);
    `;

    setTimeout(() => {
      this.tooltipEl.style.visibility = 'hidden';
    }, this.options.outDuration);
  }

  _handleMouseEnter(): void {
    this.state.isHovered = true;
    this.state.isFocused = false;
    this.open(false);
  }

  _handleMouseLeave(): void {
    this.state.isHovered = false;
    this.state.isFocused = false;
    this.close();
  }

  _handleFocus(): void {
    this.state.isFocused = true;
    this.open(false);
  }

  _handleBlur(): void {
    this.state.isFocused = false;
    this.close();
  }

  _getAttributeOptions(): Partial<TooltipOptions> {
    const attributeOptions: Partial<TooltipOptions> = {};
    const tooltipText = this.el.getAttribute('data-tooltip');
    const position = this.el.getAttribute('data-position') as TooltipOptions['position'];

    if (tooltipText) {
      attributeOptions.html = tooltipText;
    }

    if (position && ['top', 'bottom', 'left', 'right'].includes(position)) {
      attributeOptions.position = position;
    }

    return attributeOptions;
  }
}

// Mithril component for declarative usage
export interface TooltipComponentAttrs extends Attributes, TooltipOptions {
  /** Element selector or reference to attach tooltip to */
  targetSelector?: string;
}

export const TooltipComponent: FactoryComponent<TooltipComponentAttrs> = () => {
  let tooltipInstance: Tooltip | null = null;

  return {
    oncreate: ({ attrs }) => {
      if (attrs.targetSelector) {
        const targetEl = document.querySelector(attrs.targetSelector) as HTMLElement;
        if (targetEl) {
          tooltipInstance = new Tooltip(targetEl, attrs);
        }
      }
    },

    onremove: () => {
      if (tooltipInstance) {
        tooltipInstance.destroy();
        tooltipInstance = null;
      }
    },

    view: () => null, // This component doesn't render anything itself
  };
};

// Helper function to initialize tooltips on elements
export const initTooltips = (selector: string = '[data-tooltip]', options: TooltipOptions = {}): Tooltip[] => {
  const elements = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;
  const tooltips: Tooltip[] = [];

  elements.forEach((el) => {
    if (!(el as any).M_Tooltip) {
      tooltips.push(new Tooltip(el, options));
    }
  });

  return tooltips;
};
