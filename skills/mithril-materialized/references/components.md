# Component guide

This is a practical routing and recipe guide. The generated [component documentation](https://erikvullings.github.io/mithril-materialized/) and exported TypeScript interfaces remain the API source of truth.

## Catalogue

| Category | Components |
|----------|------------|
| Inputs | TextInput, TextArea, NumberInput, PasswordInput, EmailInput, UrlInput, ColorInput, RangeInput, FileInput, CharacterCounter |
| Form structure | FormSection, Fieldset |
| Choices | Select, SearchSelect, AutoComplete, RadioButton, RadioButtons, Options, Switch, ToggleButton, ToggleGroup, LikertScale, Rating |
| Search and files | Combobox primitives, Chips, FileUpload |
| Buttons | Button, LargeButton, SmallButton, FlatButton, IconButton, RoundIconButton, SubmitButton, ConfirmButton, FloatingActionButton |
| Pickers and ranges | DatePicker, TimePicker, TimeRangePicker, AnalogClock, DigitalClock, SingleRangeSlider, DoubleRangeSlider |
| Overlays and commands | ModalPanel, Dialog, AlertDialog, Menu, ContextMenu, CommandPalette, Tooltip |
| Feedback and state | SnackbarQueue, snackbar, Toast, Badge, Skeleton, EmptyState, CircularProgress, LinearProgress |
| Identity and display | Avatar, AvatarGroup, Collection, Collapsible, DataTable, VirtualList, TreeView, Timeline, Masonry, ImageList |
| Navigation and media | Sidenav, Breadcrumb, Tabs, Pagination, Wizard, Carousel, MaterialBox, Parallax |

## Dialog and AlertDialog

Use `Dialog` for normal tasks and `AlertDialog` for confirmations that require an explicit decision. `AlertDialog` prevents backdrop dismissal and initially focuses the safer secondary action.

```typescript
import m from 'mithril';
import { AlertDialog, Button } from 'mithril-materialized';

let open = false;

m.fragment({}, [
  m(Button, {
    label: 'Delete project',
    onclick: () => {
      open = true;
    },
  }),
  m(AlertDialog, {
    title: 'Delete project?',
    description: 'This permanently removes the project and its data.',
    isOpen: open,
    onToggle: (nextOpen) => {
      open = nextOpen;
    },
    secondaryAction: { label: 'Cancel' },
    primaryAction: {
      label: 'Delete project',
      destructive: true,
      onclick: deleteProject,
    },
  }),
]);
```

Use `Dialog` instead when backdrop dismissal and a close button are appropriate. Supply `primaryAction`, `secondaryAction`, and optional `actions`; the component applies consistent ordering and semantics.

## Menu and ContextMenu

Create typed menu components once, outside `view`. The trigger render function receives the ARIA and interaction attrs that must be spread onto the trigger element.

```typescript
import m from 'mithril';
import { Button, Menu } from 'mithril-materialized';

const ProjectMenu = Menu<'edit' | 'duplicate' | 'archive'>();

export const ProjectActions = {
  view: () =>
    m(ProjectMenu, {
      ariaLabel: 'Project actions',
      width: 220,
      trigger: (attrs) =>
        m(Button, {
          ...attrs,
          label: 'Project actions',
          iconName: 'more_vert',
        }),
      items: [
        { id: 'edit', label: 'Edit', iconName: 'edit' },
        { id: 'duplicate', label: 'Duplicate', iconName: 'content_copy' },
        { separator: true },
        { id: 'archive', label: 'Archive', disabled: true },
      ],
      onSelect: runProjectAction,
    }),
};
```

`ContextMenu<T>()` has the same item model. Its trigger should be focusable because keyboard users open it with Shift+F10 or the Context Menu key. Use `width` for an exact viewport-clamped width, `minWidth` for content-driven sizing, and `maxHeight` for long menus.

## CommandPalette

Instantiate the generic factory once. `enableGlobalShortcut` enables Ctrl+K and Command+K; when several enabled palettes are mounted, the most recently mounted one handles the shortcut.

```typescript
import m from 'mithril';
import { CommandPalette } from 'mithril-materialized';

const AppCommands = CommandPalette<'home' | 'clear-cache'>();
let open = false;

m(AppCommands, {
  isOpen: open,
  onToggle: (nextOpen) => {
    open = nextOpen;
  },
  enableGlobalShortcut: true,
  commands: [
    {
      id: 'home',
      label: 'Go to home',
      group: 'Navigation',
      shortcut: 'G H',
      execute: () => m.route.set('/home'),
    },
    {
      id: 'clear-cache',
      label: 'Clear local cache',
      group: 'Actions',
      execute: clearCache,
    },
  ],
});
```

Use `filterCommands` only when the built-in label, description, group, and shortcut matching is insufficient.

## SnackbarQueue

Use the shared `snackbar` helper for ordinary FIFO notifications:

```typescript
import { snackbar } from 'mithril-materialized';

snackbar({ message: 'Profile saved' });

snackbar({
  message: 'Project deleted',
  duration: 8000,
  dismissible: true,
  action: {
    label: 'Undo',
    onclick: restoreProject,
  },
});
```

Create a separate `SnackbarQueue` when a feature needs its own capacity, duration, or live-region politeness. Call `destroy()` when the queue's owner is removed.

## Avatar and AvatarGroup

`Avatar` falls back from image to explicit text, derived initials, and finally an icon. Give meaningful avatars an `alt` or `name`. Use `alt: ''` when a surrounding link or button already supplies the accessible name.

```typescript
m(Avatar, { src: user.photo, name: user.name, alt: user.name });

m(
  AvatarGroup,
  { max: 3, totalCount: 7, ariaLabel: 'Project contributors' },
  users.map((user) => m(Avatar, { name: user.name, alt: user.name }))
);
```

## Skeleton and EmptyState

Skeletons reserve layout while data loads; they are presentational and hidden from assistive technology. Empty states explain why content is absent and may provide actions.

```typescript
const body = loading
  ? m(Skeleton, { shape: 'text', count: 3, width: '100%' })
  : projects.length === 0
    ? m(EmptyState, {
        iconName: 'folder_open',
        title: 'Create your first project',
        description: 'Projects organize related work.',
        primaryAction: { label: 'Create project', onclick: createProject },
      })
    : m(ProjectList, { projects });
```

## VirtualList and DataTable virtualization

Use `VirtualList<T>()` for large synchronous lists whose rows have a known fixed height. Keep its factory result stable.

```typescript
const UserList = VirtualList<User>();

m(UserList, {
  items: users,
  height: 480,
  itemHeight: 40,
  overscan: 3,
  getItemKey: (user) => user.id,
  renderItem: (user) => m('.user-row', user.name),
});
```

Do not use fixed-height virtualization when row content can wrap to unpredictable heights. For tabular data, prefer DataTable's virtualization option so sorting, filtering, pagination, selection, and focus behavior stay integrated.
