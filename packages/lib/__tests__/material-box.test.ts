import { MaterialBox, IMaterialBox } from '../src/material-box';
import { render, fireEvent, cleanup } from '../src/test-utils';

describe('MaterialBox Component', () => {
  afterEach(() => {
    cleanup();
    // Clean up any overlay elements that might be left behind
    const overlays = document.querySelectorAll('.materialbox-overlay');
    overlays.forEach(overlay => overlay.remove());
    const overlayImages = document.querySelectorAll('.materialbox-image');
    overlayImages.forEach(img => img.remove());
    const captions = document.querySelectorAll('.materialbox-caption');
    captions.forEach(caption => caption.remove());
    // Reset body overflow
    document.body.style.overflow = '';
  });

  const defaultMaterialBoxAttrs: IMaterialBox = {
    src: 'test-image.jpg',
    alt: 'Test Image',
  };

  test('renders image with materialboxed class', () => {
    const { container } = render(MaterialBox, defaultMaterialBoxAttrs);

    const img = container.querySelector('img.materialboxed');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('src')).toBe('test-image.jpg');
    expect(img?.getAttribute('alt')).toBe('Test Image');
  });

  test('applies custom className', () => {
    const { container } = render(MaterialBox, { 
      ...defaultMaterialBoxAttrs, 
      className: 'custom-image' 
    });

    const img = container.querySelector('img');
    expect(img?.classList.contains('materialboxed')).toBe(true);
    expect(img?.classList.contains('custom-image')).toBe(true);
  });

  test('sets width and height attributes', () => {
    const { container } = render(MaterialBox, { 
      ...defaultMaterialBoxAttrs, 
      width: 300, 
      height: 200 
    });

    const img = container.querySelector('img');
    expect(img?.getAttribute('width')).toBe('300');
    expect(img?.getAttribute('height')).toBe('200');
  });

  test('has zoom-in cursor by default', () => {
    const { container } = render(MaterialBox, defaultMaterialBoxAttrs);

    const img = container.querySelector('img') as HTMLImageElement;
    expect(img.style.cursor).toBe('zoom-in');
  });

  test('calls onOpenStart callback when clicked', () => {
    const onOpenStart = jest.fn();
    const { container } = render(MaterialBox, { 
      ...defaultMaterialBoxAttrs, 
      onOpenStart 
    });

    const img = container.querySelector('img') as HTMLImageElement;
    // Mock getBoundingClientRect and naturalWidth/Height
    img.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 100,
      width: 200,
      height: 150,
      right: 300,
      bottom: 250,
    } as DOMRect));
    
    Object.defineProperty(img, 'naturalWidth', { value: 800 });
    Object.defineProperty(img, 'naturalHeight', { value: 600 });

    fireEvent.click(img);
    
    expect(onOpenStart).toHaveBeenCalled();
  });

  test('creates overlay when image is clicked', () => {
    const { container } = render(MaterialBox, defaultMaterialBoxAttrs);

    const img = container.querySelector('img') as HTMLImageElement;
    // Mock getBoundingClientRect and naturalWidth/Height
    img.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 100,
      width: 200,
      height: 150,
      right: 300,
      bottom: 250,
    } as DOMRect));
    
    Object.defineProperty(img, 'naturalWidth', { value: 800 });
    Object.defineProperty(img, 'naturalHeight', { value: 600 });

    fireEvent.click(img);

    const overlay = document.querySelector('.materialbox-overlay');
    const overlayImage = document.querySelector('.materialbox-image');
    
    expect(overlay).toBeTruthy();
    expect(overlayImage).toBeTruthy();
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('creates caption when provided', () => {
    const { container } = render(MaterialBox, { 
      ...defaultMaterialBoxAttrs, 
      caption: 'Test Caption' 
    });

    const img = container.querySelector('img') as HTMLImageElement;
    // Mock getBoundingClientRect and naturalWidth/Height
    img.getBoundingClientRect = jest.fn(() => ({
      top: 100,
      left: 100,
      width: 200,
      height: 150,
      right: 300,
      bottom: 250,
    } as DOMRect));
    
    Object.defineProperty(img, 'naturalWidth', { value: 800 });
    Object.defineProperty(img, 'naturalHeight', { value: 600 });

    fireEvent.click(img);

    const caption = document.querySelector('.materialbox-caption');
    expect(caption?.textContent).toBe('Test Caption');
  });

  test('prevents click event propagation', () => {
    const { container } = render(MaterialBox, defaultMaterialBoxAttrs);

    const img = container.querySelector('img') as HTMLImageElement;
    const clickEvent = new MouseEvent('click', { bubbles: true });
    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');

    img.dispatchEvent(clickEvent);
    
    expect(preventDefaultSpy).toHaveBeenCalled();
  });
});