import m from 'mithril';
import { vi } from 'vitest';
import { Select } from '../src/select';
import { Dropdown } from '../src/dropdown';
import { SearchSelect } from '../src/search-select';
import { InputOption } from '../src/option';

const options: InputOption<string>[] = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
];

/** Render two instances of a component side by side and redraw after every click. */
const renderPair = (view: () => m.Children) => {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const redraw = () => m.render(container, view());
  redraw();
  const click = (el: Element) => {
    (el as HTMLElement).click();
    redraw();
  };
  const unmount = () => {
    m.render(container, []);
    container.remove();
  };
  return { container, click, unmount };
};

describe('closing on outside click when another instance is clicked', () => {
  let unmount: (() => void) | undefined;
  afterEach(() => {
    unmount?.();
    unmount = undefined;
  });

  it.each([true, false])('Select (multiple: %s) closes when another Select is opened', (multiple) => {
    const first = Select<string>();
    const second = Select<string>();
    const pair = renderPair(() => [
      m(first, { id: 'first', options, multiple, onchange: vi.fn() }),
      m(second, { id: 'second', options, multiple, onchange: vi.fn() }),
    ]);
    unmount = pair.unmount;
    const [firstTrigger, secondTrigger] = Array.from(pair.container.querySelectorAll('button.select-dropdown'));

    pair.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');

    pair.click(secondTrigger);
    expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('multi-select closes when clicking another Select wrapper (not its trigger)', () => {
    const first = Select<string>();
    const second = Select<string>();
    const pair = renderPair(() => [
      m(first, { id: 'first', options, multiple: true, label: 'First', onchange: vi.fn() }),
      m(second, { id: 'second', options, multiple: true, label: 'Second', onchange: vi.fn() }),
    ]);
    unmount = pair.unmount;
    const [firstRoot, secondRoot] = Array.from(pair.container.querySelectorAll('.input-field.select-space'));
    const firstTrigger = firstRoot.querySelector('button.select-dropdown')!;

    pair.click(firstTrigger);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');

    pair.click(secondRoot);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('multi-select stays open when clicking its own options', () => {
    const onchange = vi.fn();
    const first = Select<string>();
    const second = Select<string>();
    const pair = renderPair(() => [
      m(first, { id: 'first', options, multiple: true, onchange }),
      m(second, { id: 'second', options, multiple: true, onchange: vi.fn() }),
    ]);
    unmount = pair.unmount;
    const firstRoot = pair.container.querySelector('.input-field.select-space')!;
    const firstTrigger = firstRoot.querySelector('button.select-dropdown')!;

    pair.click(firstTrigger);
    pair.click(firstRoot.querySelector('ul.select-dropdown li')!);

    expect(onchange).toHaveBeenCalledWith(['a']);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');

    pair.click(document.body);
    expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('Dropdown closes when another Dropdown is opened', () => {
    const items = options.map(({ id, label }) => ({ id, label }));
    const first = Dropdown<string>();
    const second = Dropdown<string>();
    const pair = renderPair(() => [
      m(first, { id: 'first', label: 'First', items }),
      m(second, { id: 'second', label: 'Second', items }),
    ]);
    unmount = pair.unmount;
    const [firstTrigger, secondTrigger] = Array.from(pair.container.querySelectorAll('button.dropdown-trigger'));
    const isOpen = (trigger: Element) => !!trigger.parentElement?.querySelector('.dropdown-content');

    pair.click(firstTrigger);
    expect(isOpen(firstTrigger)).toBe(true);

    pair.click(secondTrigger);
    expect(isOpen(secondTrigger)).toBe(true);
    expect(isOpen(firstTrigger)).toBe(false);
  });

  it('SearchSelect closes when another SearchSelect is opened', () => {
    const first = SearchSelect<string>();
    const second = SearchSelect<string>();
    const pair = renderPair(() => [
      m(first, { id: 'first', label: 'First', options, onchange: vi.fn() }),
      m(second, { id: 'second', label: 'Second', options, onchange: vi.fn() }),
    ]);
    unmount = pair.unmount;
    const [firstTrigger, secondTrigger] = Array.from(pair.container.querySelectorAll('.chips-container'));

    pair.click(firstTrigger);
    expect(pair.container.querySelectorAll('.dropdown-content')).toHaveLength(1);
    expect(firstTrigger.parentElement?.querySelector('.dropdown-content')).not.toBeNull();

    pair.click(secondTrigger);
    expect(pair.container.querySelectorAll('.dropdown-content')).toHaveLength(1);
    expect(secondTrigger.parentElement?.querySelector('.dropdown-content')).not.toBeNull();
  });
});
