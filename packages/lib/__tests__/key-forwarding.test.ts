import m, { Vnode } from 'mithril';
import {
  Autocomplete,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  CircularProgress,
  CodeBlock,
  Collection,
  CollectionMode,
  EmptyState,
  Fieldset,
  FormSection,
  Label,
  LinearProgress,
  Mandatory,
  MaterialBox,
  MaterialIcon,
  NumberInput,
  RangeInput,
  Skeleton,
  Stepper,
  Switch,
  TextArea,
  TextInput,
  ToggleButton,
  VirtualList,
  omitKey,
} from '../src';

const NumberList = VirtualList<number>();
const KEY = 'component-key-must-not-leak';

type AnyVnode = Vnode<any, any> & { instance?: AnyVnode; children?: unknown };

/** Collect every vnode below the top-level component vnode that carries the component's key. */
const findLeakedKeys = (root: AnyVnode): AnyVnode[] => {
  const leaked: AnyVnode[] = [];
  const walk = (node: unknown, isRoot = false) => {
    if (!node || typeof node !== 'object') return;
    if (Array.isArray(node)) return node.forEach((child) => walk(child));
    const vnode = node as AnyVnode;
    if (!isRoot && vnode.key === KEY) leaked.push(vnode);
    walk(vnode.instance);
    walk(vnode.children);
  };
  walk(root, true);
  return leaked;
};

const cases: Array<[string, () => Vnode<any, any>]> = [
  ['TextArea', () => m(TextArea, { key: KEY, label: 'Notes', value: 'x', oninput: () => undefined })],
  ['TextArea with icon', () => m(TextArea, { key: KEY, label: 'Notes', iconName: 'edit', defaultValue: 'x' })],
  ['TextInput', () => m(TextInput, { key: KEY, label: 'Name' })],
  ['TextInput with icon', () => m(TextInput, { key: KEY, label: 'Name', iconName: 'person' })],
  ['NumberInput', () => m(NumberInput, { key: KEY, label: 'Count', iconName: 'tag' })],
  ['RangeInput (slider)', () => m(RangeInput, { key: KEY, label: 'Range', min: 0, max: 10, valueDisplay: 'on' } as any)],
  ['AutoComplete', () => m(Autocomplete, { key: KEY, label: 'Search', iconName: 'search', data: {} })],
  ['Avatar', () => m(Avatar, { key: KEY, name: 'Ada Lovelace' })],
  ['AvatarGroup', () => m(AvatarGroup, { key: KEY, items: [{ name: 'Ada' }, { name: 'Bob' }] } as any)],
  ['Badge', () => m(Badge, { key: KEY, badgeContent: 3 } as any, m('span', 'child'))],
  ['Button', () => m(Button, { key: KEY, label: 'Save', iconName: 'save' })],
  ['CircularProgress', () => m(CircularProgress, { key: KEY, value: 50, mode: 'determinate', label: '50%' } as any)],
  ['LinearProgress', () => m(LinearProgress, { key: KEY, value: 50, mode: 'determinate', label: '50%' } as any)],
  ['CodeBlock', () => m(CodeBlock, { key: KEY, code: 'const a = 1;' })],
  [
    'Collection (basic)',
    () => m(Collection, { key: KEY, header: 'Items', items: [{ id: '1', title: 'One' }] }),
  ],
  [
    'Collection (links)',
    () =>
      m(Collection, {
        key: KEY,
        header: 'Links',
        mode: CollectionMode.LINKS,
        items: [{ id: '1', title: 'One', href: 'https://example.com' }],
      }),
  ],
  ['EmptyState', () => m(EmptyState, { key: KEY, title: 'Nothing here', description: 'Add an item' } as any)],
  ['FormSection', () => m(FormSection, { key: KEY, title: 'Section', description: 'Info' } as any, m('p', 'body'))],
  ['Fieldset', () => m(Fieldset, { key: KEY, legend: 'Group', description: 'Info' } as any, m('p', 'body'))],
  ['Label', () => m(Label, { key: KEY, label: 'Label', isMandatory: true })],
  ['Mandatory', () => m(Mandatory, { key: KEY })],
  ['MaterialBox', () => m(MaterialBox, { key: KEY, src: 'image.png', alt: 'Image' } as any)],
  ['MaterialIcon', () => m(MaterialIcon, { key: KEY, name: 'caret' } as any)],
  ['Skeleton', () => m(Skeleton, { key: KEY, count: 3 } as any)],
  ['Switch', () => m(Switch, { key: KEY, label: 'Toggle' })],
  ['ToggleButton', () => m(ToggleButton, { key: KEY, label: 'Bold', iconName: 'format_bold' } as any)],
  [
    'VirtualList',
    () => m(NumberList, { key: KEY, items: [1, 2, 3], itemHeight: 20, height: 100, getItemKey: (i: number) => i, renderItem: (i: number) => m('div', i) } as any),
  ],
  ['Stepper', () => m(Stepper, { key: KEY, steps: [{ title: 'One', content: m('p', '1') }], currentStep: 0 } as any)],
];

describe('component keys are not forwarded to inner elements', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    m.render(container, null);
    container.remove();
  });

  it.each(cases)('%s renders with a key without leaking it', (_name, view) => {
    const vnode = view();
    expect(() => m.render(container, [vnode])).not.toThrow();
    expect(findLeakedKeys(vnode as AnyVnode)).toEqual([]);
    // Re-render keyed to exercise the update path as well.
    expect(() => m.render(container, [view()])).not.toThrow();
  });
});

describe('omitKey', () => {
  it('removes key and keeps other attrs', () => {
    expect(omitKey({ key: 1, id: 'a', className: 'b' })).toEqual({ id: 'a', className: 'b' });
  });

  it('returns the same object when no key is present', () => {
    const attrs = { id: 'a' };
    expect(omitKey(attrs)).toBe(attrs);
  });
});
