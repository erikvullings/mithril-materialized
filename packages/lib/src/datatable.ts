import m, { Attributes, Component, Vnode, type FactoryComponent } from 'mithril';
import { NumberInput, TextInput } from './input';
import { InputCheckbox } from './option';
import { uniqueId } from './utils';
import { calculateVirtualRange } from './virtual-list';

/**
 * Attributes for custom cell renderer components in DataTable
 * @template T The type of the data object for each row
 */
export interface CellRendererAttrs<T = Record<string, any>> {
  /** The processed value from the data object for this cell */
  value: any;
  /** The complete row data object */
  row: T;
  /** The row index in the processed data */
  index: number;
  /** The column configuration object */
  column: DataTableColumn<T>;
}

/**
 * Configuration for a DataTable column
 * @template T The type of the data object for each row
 */
export interface DataTableColumn<T = Record<string, any>> {
  /** Unique identifier for the column (required for sorting/filtering) */
  key: string;
  /** Display title shown in the column header */
  title: string;
  /** Property name in the data object to display. If not provided, the entire row object is passed to the renderer */
  field?: keyof T;
  /** Custom cell renderer component for advanced cell content */
  cellRenderer?: FactoryComponent<CellRendererAttrs<T>>;
  /** @deprecated Use cellRenderer instead - Legacy render function for cell content */
  render?: (value: any, row: T, index: number) => string | number | Vnode | Vnode[];
  /** Enable sorting for this column */
  sortable?: boolean;
  /** Enable global search filtering for this column */
  filterable?: boolean;
  /** CSS width value (e.g., '100px', '20%', '10rem') */
  width?: string;
  /** Text alignment within cells */
  align?: 'left' | 'center' | 'right';
  /** CSS class applied to all cells in this column */
  className?: string;
  /** CSS class applied to the column header */
  headerClassName?: string;
}

/**
 * Configuration for DataTable sorting state
 */
export interface DataTableSort {
  /** Key of the column to sort by (must match a column's key) */
  column: string;
  /** Sort direction - ascending or descending */
  direction: 'asc' | 'desc';
}

/**
 * Configuration for DataTable pagination
 */
export interface DataTablePagination {
  /** Current page number (0-based indexing) */
  page: number;
  /** Number of items to display per page */
  pageSize: number;
  /** Total number of items in the dataset */
  total: number;
  /** Array of available page size options for user selection */
  pageSizes?: number[];
}

/**
 * Configuration for DataTable row selection functionality
 * @template T The type of the data object for each row
 */
export interface DataTableSelection<T = Record<string, any>> {
  /** Selection mode - controls how many rows can be selected */
  mode: 'single' | 'multiple' | 'none';
  /** Immutable array of currently selected row keys */
  selectedKeys: readonly string[];
  /** Function to generate a unique key for each row */
  getRowKey: (row: T, index: number) => string;
  /** Callback invoked when row selection changes */
  onSelectionChange?: (selectedKeys: string[], selectedRows: T[]) => void;
}

/**
 * Configuration for DataTable filtering functionality
 */
export interface DataTableFilter {
  /** Global search term applied across all filterable columns */
  searchTerm?: string;
  /** Column-specific filter values keyed by column key */
  columnFilters?: Record<string, any>;
}

export interface DataTableVirtualization {
  /** Height of the scroll viewport in pixels. */
  viewportHeight: number;
  /** Fixed height of every rendered data row in pixels. */
  rowHeight: number;
  /** Additional rows rendered before and after the visible window. @default 1 */
  overscan?: number;
}

/**
 * Main DataTable component attributes
 * @template T The type of the data object for each row
 *
 * @example Basic usage
 * ```typescript
 * m(DataTable, {
 *   data: users,
 *   columns: [
 *     { key: 'name', title: 'Name', field: 'name', sortable: true },
 *     { key: 'email', title: 'Email', field: 'email', filterable: true }
 *   ]
 * })
 * ```
 *
 * @example With pagination and selection
 * ```typescript
 * m(DataTable, {
 *   data: users,
 *   columns,
 *   pagination: { page: 0, pageSize: 10, total: users.length },
 *   selection: {
 *     mode: 'multiple',
 *     selectedKeys: [],
 *     getRowKey: (user) => user.id,
 *     onSelectionChange: (keys, users) => console.log('Selected:', users)
 *   }
 * })
 * ```
 */
export interface DataTableAttrs<T = Record<string, any>> extends Attributes {
  /** Array of data objects to display in the table */
  data: T[];
  /** Column configuration array defining how data should be displayed */
  columns: DataTableColumn<T>[];
  /** Optional title displayed above the table */
  title?: string;
  /** Show loading spinner and disable interactions */
  loading?: boolean;
  /** Message to display when data array is empty */
  emptyMessage?: string;
  /** Apply alternating row background colors */
  striped?: boolean;
  /** Enable row highlighting on hover */
  hoverable?: boolean;
  /** Make table responsive with horizontal scrolling on small screens */
  responsive?: boolean;
  /** Center-align all table content */
  centered?: boolean;
  /** Fixed table height in pixels (enables scrolling) */
  height?: number;
  /**
   * Render only the fixed-height visible row window. If scrolling removes a
   * focused row, focus moves to the table viewport.
   */
  virtualization?: DataTableVirtualization;
  /** Additional CSS classes to apply to the table */
  className?: string;
  /** Custom HTML id attribute for the table container */
  id?: string;
  /** Stable row identity used for keyed rendering independently of selection. */
  getRowKey?: (row: T, originalIndex: number) => string | number;

  // Sorting
  /** Current sort configuration. If provided, sorting is controlled externally */
  sort?: DataTableSort;
  /** Callback invoked when user changes sort order */
  onSortChange?: (sort: DataTableSort) => void;

  // Pagination
  /** Pagination configuration. If provided, pagination is controlled externally */
  pagination?: DataTablePagination;
  /** Callback invoked when user changes page or page size */
  onPaginationChange?: (pagination: DataTablePagination) => void;

  // Selection
  /** Row selection configuration */
  selection?: DataTableSelection<T>;

  // Filtering
  /** Current filter state. If provided, filtering is controlled externally */
  filter?: DataTableFilter;
  /** Callback invoked when filter values change */
  onFilterChange?: (filter: DataTableFilter) => void;
  /** Show global search input above the table */
  enableGlobalSearch?: boolean;
  /** Placeholder text for the global search input */
  searchPlaceholder?: string;

  // Row events
  /** Callback invoked when a row is clicked */
  onRowClick?: (row: T, index: number, event: Event) => void;
  /** Callback invoked when a row is double-clicked */
  onRowDoubleClick?: (row: T, index: number, event: Event) => void;
  /** Function to generate custom CSS classes for each row */
  getRowClassName?: (row: T, index: number) => string;

  // Internationalization
  /** Internationalization configuration for UI text */
  i18n?: DataTableI18n;
}

// Internal state interface
interface DataTableState<T = Record<string, any>> {
  internalSort?: DataTableSort;
  internalFilter?: DataTableFilter;
  internalPagination?: DataTablePagination;
  processedData: T[];
  tableId: string;
  // Performance optimization caches
  lastProcessedHash?: string;
  cachedFilteredData?: T[];
  cachedSortedData?: T[];
  virtualScrollTop: number;
  processedOriginalIndices: number[];
  selectionCache?: {
    processedData: T[];
    selectedKeys: readonly string[];
    getRowKey: (row: T, index: number) => string;
    allSelected: boolean;
    someSelected: boolean;
  };
}

// Helper function interfaces for FactoryComponents
interface DataTableHelpers<T = Record<string, any>> {
  getCellValue: (row: T, column: DataTableColumn<T>) => any;
  handleSort: (columnKey: string) => void;
  handleGlobalSearch: (searchTerm: string) => void;
  handleSelectionChange: (rowKey: string, selected: boolean) => void;
  handleSelectAll: (selected: boolean) => void;
}

/**
 * Internationalization configuration for DataTable UI text
 * Allows customization of all user-facing text strings
 */
export interface DataTableI18n {
  /** Label for the search input */
  search?: string;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** "Showing" text in pagination display */
  showing?: string;
  /** "to" text in pagination display (e.g., "Showing 1 to 10 of 100") */
  to?: string;
  /** "of" text in pagination display */
  of?: string;
  /** "entries" text in pagination display */
  entries?: string;
  /** "Page" text in pagination controls */
  page?: string;
  /** Message displayed when no data is available */
  noDataAvailable?: string;
  /** Loading message displayed during data fetch */
  loading?: string;
}

// FactoryComponent for global search
interface GlobalSearchAttrs {
  searchPlaceholder?: string;
  onSearch: (searchTerm: string) => void;
  i18n?: DataTableI18n;
}

const GlobalSearch: FactoryComponent<GlobalSearchAttrs> = () => {
  return {
    view: ({ attrs }: Vnode<GlobalSearchAttrs>) => {
      const { searchPlaceholder, onSearch, i18n } = attrs;

      return m(
        '.datatable-global-search',
        m(TextInput, {
          className: 'datatable-search',
          label: i18n?.search || 'Search',
          placeholder: searchPlaceholder || i18n?.searchPlaceholder || 'Search table...',
          oninput: onSearch,
        })
      );
    },
  };
};

// FactoryComponent for table header
interface TableHeaderAttrs<T = Record<string, any>> {
  columns: DataTableColumn<T>[];
  selection?: DataTableSelection<T>;
  sort?: DataTableSort;
  allSelected: boolean;
  someSelected: boolean;
  helpers: DataTableHelpers<T>;
}

const TableHeader = <T = Record<string, any>>(): Component<TableHeaderAttrs<T>> => {
  return {
    view: ({ attrs }: Vnode<TableHeaderAttrs<T>>) => {
      const { columns, selection, sort, allSelected, helpers } = attrs;

      return m(
        'thead',
        m('tr', [
          // Selection column header
          ...(selection && selection.mode !== 'none'
            ? [
                m('th.selection-checkbox', [
                  selection.mode === 'multiple' &&
                    m(InputCheckbox, {
                      checked: allSelected,
                      onchange: helpers.handleSelectAll,
                      className: '',
                    }),
                ]),
              ]
            : []),
          // Regular columns
          ...columns.map((column: DataTableColumn<T>) => {
            const isSorted = sort?.column === column.key;
            const sortDirection = isSorted ? sort.direction : null;

            return m(
              'th',
              {
                class: [
                  column.headerClassName,
                  column.sortable ? 'sortable' : '',
                  isSorted ? `sorted-${sortDirection}` : '',
                ]
                  .filter(Boolean)
                  .join(' '),
                style: column.width ? { width: column.width } : undefined,
                onclick: column.sortable ? () => helpers.handleSort(column.key) : undefined,
              },
              [
                column.title,
                column.sortable &&
                  m('.sort-indicators', [
                    m(
                      'span.sort-icon.sort-asc',
                      {
                        className: isSorted && sortDirection === 'asc' ? 'active' : '',
                      },
                      '▲'
                    ),
                    m(
                      'span.sort-icon.sort-desc',
                      {
                        className: isSorted && sortDirection === 'desc' ? 'active' : '',
                      },
                      '▼'
                    ),
                  ]),
              ]
            );
          }),
        ])
      );
    },
  };
};

// FactoryComponent for table row
interface TableRowAttrs<T = Record<string, any>> {
  row: T;
  index: number;
  columns: DataTableColumn<T>[];
  selection?: DataTableSelection<T>;
  onRowClick?: (row: T, index: number, event: Event) => void;
  onRowDoubleClick?: (row: T, index: number, event: Event) => void;
  getRowClassName?: (row: T, index: number) => string;
  helpers: DataTableHelpers<T>;
  virtualRowHeight?: number;
  virtualStripe?: boolean;
  rowKey: string;
}

const TableRow = <T = Record<string, any>>(): Component<TableRowAttrs<T>> => {
  return {
    view: ({ attrs }: Vnode<TableRowAttrs<T>>) => {
      const {
        row,
        index,
        columns,
        selection,
        onRowClick,
        onRowDoubleClick,
        getRowClassName,
        helpers,
        virtualRowHeight,
        virtualStripe,
        rowKey,
      } = attrs;

      const isSelected = selection?.selectedKeys.includes(rowKey) || false;

      return m(
        'tr',
        {
          class:
            [
              getRowClassName ? getRowClassName(row, index) : '',
              isSelected ? 'selected' : '',
              virtualStripe ? 'virtual-stripe' : '',
            ]
              .filter(Boolean)
              .join(' ') || undefined,
          onclick: onRowClick ? (e: Event) => onRowClick(row, index, e) : undefined,
          ondblclick: onRowDoubleClick ? (e: Event) => onRowDoubleClick(row, index, e) : undefined,
          'data-virtual-index': virtualRowHeight ? index : undefined,
          'aria-rowindex': virtualRowHeight ? index + 2 : undefined,
          style: virtualRowHeight
            ? { height: `${virtualRowHeight}px` }
            : undefined,
        },
        [
          // Selection column
          selection &&
            selection.mode !== 'none' &&
            m('td.selection-checkbox', [
              m(InputCheckbox, {
                checked: isSelected,
                onchange: (checked: boolean) => helpers.handleSelectionChange(rowKey, checked),
                className: '',
              }),
            ]),

          columns.map((column: DataTableColumn<T>) => {
            const value = helpers.getCellValue(row, column);

            let cellContent;
            if (column.cellRenderer) {
              cellContent = m(column.cellRenderer, {
                value,
                row,
                index,
                column,
              });
            } else if (column.render) {
              // Backward compatibility with deprecated render function
              cellContent = column.render(value, row, index);
            } else {
              cellContent = String(value || '');
            }

            return m(
              'td',
              {
                class:
                  [column.className, column.align ? `align-${column.align}` : ''].filter(Boolean).join(' ') ||
                  undefined,
              },
              virtualRowHeight
                ? m(
                    '.datatable-virtual-cell-content',
                    { style: { height: `${virtualRowHeight}px` } },
                    cellContent
                  )
                : cellContent
            );
          }),
        ]
      );
    },
  };
};

// FactoryComponent for pagination
/**
 * Attributes for the PaginationControls component
 */
export interface PaginationControlsAttrs {
  /** Pagination configuration object */
  pagination?: DataTablePagination;
  /** Callback function invoked when pagination state changes */
  onPaginationChange: (pagination: DataTablePagination) => void;
  /** Internationalization strings for pagination text */
  i18n?: DataTableI18n;
  /** Allow the page information label to be clicked to enter a page number. @default false */
  allowPageInput?: boolean;
}

/**
 * Standalone Pagination Controls component
 *
 * Provides navigation controls for paginated data with customizable text labels.
 * Includes first page, previous page, next page, last page buttons and page info display.
 * Can be used independently of DataTable for any paginated content.
 *
 * @example
 * ```typescript
 * m(PaginationControls, {
 *   pagination: { page: 0, pageSize: 10, total: 100 },
 *   allowPageInput: true,
 *   onPaginationChange: (newPagination) => console.log('Page changed:', newPagination),
 *   i18n: { showing: 'Showing', to: 'to', of: 'of', entries: 'entries', page: 'Page' }
 * })
 * ```
 */
export const PaginationControls: FactoryComponent<PaginationControlsAttrs> = () => {
  const state = {
    isEditingPage: false,
  };

  return {
    view: ({ attrs }: Vnode<PaginationControlsAttrs>) => {
      const { pagination, onPaginationChange, i18n, allowPageInput = false } = attrs;

      if (!pagination) return null;

      const { page, pageSize, total } = pagination;
      const totalPages = Math.ceil(total / pageSize);
      const startItem = page * pageSize + 1;
      const endItem = Math.min((page + 1) * pageSize, total);

      const showingText = i18n?.showing || 'Showing';
      const toText = i18n?.to || 'to';
      const ofText = i18n?.of || 'of';
      const entriesText = i18n?.entries || 'entries';
      const pageText = i18n?.page || 'Page';

      const startEditingPage = () => {
        if (allowPageInput && totalPages > 0) {
          state.isEditingPage = true;
        }
      };

      const submitPage = (target: EventTarget | null) => {
        if (!(target instanceof HTMLInputElement)) return;
        const pageNumber = Number(target.value);
        if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > totalPages) return;

        state.isEditingPage = false;
        if (pageNumber !== page + 1) {
          onPaginationChange({ ...pagination, page: pageNumber - 1 });
        }
      };

      const pageInfo = state.isEditingPage && allowPageInput && totalPages > 0
        ? m('.page-info.page-info-editor', [
            m('span', `${pageText} `),
            m(NumberInput, {
              className: 'page-number-input',
              defaultValue: page + 1,
              min: 1,
              max: totalPages,
              step: 1,
              hideSpinners: true,
              autofocus: true,
              selectOnFocus: true,
              'aria-label': pageText,
              onblur: (event) => submitPage(event.currentTarget),
              onkeydown: (event) => {
                if (event.key === 'Enter') {
                  submitPage(event.currentTarget);
                } else if (event.key === 'Escape') {
                  state.isEditingPage = false;
                }
              },
            }),
            m('span', ` ${ofText} ${totalPages}`),
          ])
        : m(
            'span.page-info',
            allowPageInput && totalPages > 0
              ? {
                  className: 'page-info-editable',
                  role: 'button',
                  tabindex: 0,
                  onclick: startEditingPage,
                  onkeydown: (event: KeyboardEvent) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      startEditingPage();
                    }
                  },
                }
              : {},
            `${pageText} ${page + 1} ${ofText} ${totalPages}`
          );

      return m('.datatable-pagination', [
        m('.pagination-info', `${showingText} ${startItem} ${toText} ${endItem} ${ofText} ${total} ${entriesText}`),
        m('.pagination-controls', [
          m(
            'button.btn-flat',
            {
              disabled: page === 0,
              onclick: () => onPaginationChange({ ...pagination, page: 0 }),
            },
            '⏮'
          ),
          m(
            'button.btn-flat',
            {
              disabled: page === 0,
              onclick: () => onPaginationChange({ ...pagination, page: page - 1 }),
            },
            '◀'
          ),
          pageInfo,
          m(
            'button.btn-flat',
            {
              disabled: page >= totalPages - 1,
              onclick: () => onPaginationChange({ ...pagination, page: page + 1 }),
            },
            '▶'
          ),
          m(
            'button.btn-flat',
            {
              disabled: page >= totalPages - 1,
              onclick: () => onPaginationChange({ ...pagination, page: totalPages - 1 }),
            },
            '⏭'
          ),
        ]),
      ]);
    },
  };
};

// Table content FactoryComponent
interface TableContentAttrs<T = Record<string, any>> {
  processedData: T[];
  height?: number;
  tableClasses: string;
  columns: DataTableColumn<T>[];
  selection?: DataTableSelection<T>;
  internalSort?: DataTableSort;
  allSelected: boolean;
  someSelected: boolean;
  helpers: DataTableHelpers<T>;
  onRowClick?: (row: T, index: number, event: Event) => void;
  onRowDoubleClick?: (row: T, index: number, event: Event) => void;
  getRowClassName?: (row: T, index: number) => string;
  virtualization?: DataTableVirtualization;
  scrollTop?: number;
  striped?: boolean;
  processedOriginalIndices: number[];
  getRowKey?: (row: T, originalIndex: number) => string | number;
}

const TableContent = <T = Record<string, any>>(): Component<TableContentAttrs<T>> => {
  const Header = TableHeader<T>();
  const Row = TableRow<T>();

  return {
    view: ({ attrs: contentAttrs }) => {
      const {
        processedData,
        tableClasses,
        columns,
        selection,
        internalSort,
        allSelected,
        someSelected,
        helpers,
        onRowClick,
        onRowDoubleClick,
        getRowClassName,
        virtualization,
        scrollTop = 0,
        striped,
        processedOriginalIndices,
        getRowKey,
      } = contentAttrs;
      const range = virtualization
        ? calculateVirtualRange({
            itemCount: processedData.length,
            itemHeight: virtualization.rowHeight,
            viewportHeight: virtualization.viewportHeight,
            scrollTop,
            overscan: virtualization.overscan,
          })
        : undefined;
      const rows = range
        ? processedData.slice(range.startIndex, range.endIndex + 1)
        : processedData;
      const columnCount =
        columns.length + (selection && selection.mode !== 'none' ? 1 : 0);
      const rowVnodes = rows.map((row, visibleIndex) => {
        const index = range ? range.startIndex + visibleIndex : visibleIndex;
        const originalIndex = processedOriginalIndices[index] ?? index;
        const selectionKey = selection?.getRowKey(row, originalIndex);
        const stableIdentity =
          getRowKey?.(row, originalIndex) ?? selectionKey ?? originalIndex;
        const rowKey = selectionKey ?? String(stableIdentity);
        return m(Row, {
          key: `datatable-row-${typeof stableIdentity}-${String(stableIdentity)}`,
          row,
          index,
          columns,
          selection,
          onRowClick,
          onRowDoubleClick,
          getRowClassName,
          helpers,
          virtualRowHeight: virtualization?.rowHeight,
          virtualStripe: Boolean(range && striped && index % 2 === 0),
          rowKey,
        });
      });
      const topSpacerHeight = range ? range.startIndex * virtualization!.rowHeight : 0;
      const bottomSpacerHeight = range
        ? (processedData.length - range.endIndex - 1) * virtualization!.rowHeight
        : 0;
      const bodyRows = range
        ? [
            m(
              'tr.datatable-virtual-spacer',
              {
                key: 'virtual-spacer-top',
                'aria-hidden': 'true',
                style: { height: `${topSpacerHeight}px` },
              },
              m('td', { colspan: columnCount })
            ),
            ...rowVnodes,
            m(
              'tr.datatable-virtual-spacer',
              {
                key: 'virtual-spacer-bottom',
                'aria-hidden': 'true',
                style: { height: `${bottomSpacerHeight}px` },
              },
              m('td', { colspan: columnCount })
            ),
          ]
        : rowVnodes;

      return m(
        'table',
        {
          class: tableClasses,
          'aria-rowcount': range ? processedData.length + 1 : undefined,
        },
        m(Header, {
          columns,
          selection,
          sort: internalSort,
          allSelected,
          someSelected,
          helpers,
        }),

        m(
          'tbody',
          bodyRows
        )
      );
    },
  };
};

/**
 * A comprehensive data table component with sorting, filtering, pagination, and selection capabilities.
 *
 * @template T The type of data objects displayed in each row
 *
 * @description
 * The DataTable component provides a feature-rich interface for displaying and interacting with tabular data.
 * It supports both controlled and uncontrolled modes for all interactive features.
 *
 * **Key Features:**
 * - Sorting: Click column headers to sort data ascending/descending
 * - Filtering: Global search across filterable columns
 * - Pagination: Navigate through large datasets with customizable page sizes
 * - Selection: Single or multiple row selection with callbacks
 * - Custom rendering: Use cellRenderer for complex cell content
 * - Responsive: Adapts to different screen sizes
 * - Internationalization: Customize all UI text
 * - Accessibility: Proper ARIA attributes and keyboard navigation
 *
 * @example Basic usage
 * ```typescript
 * interface User { id: number; name: string; email: string; }
 * const users: User[] = [...];
 * const columns: DataTableColumn<User>[] = [
 *   { key: 'name', title: 'Name', field: 'name', sortable: true, filterable: true },
 *   { key: 'email', title: 'Email', field: 'email', sortable: true, filterable: true }
 * ];
 *
 * return m(DataTable<User>, { data: users, columns });
 * ```
 *
 * @example Advanced usage with all features
 * ```typescript
 * return m(DataTable<User>, {
 *   data: users,
 *   columns,
 *   title: 'User Management',
 *   striped: true,
 *   hoverable: true,
 *   height: 400,
 *
 *   // Pagination
 *   pagination: { page: 0, pageSize: 10, total: users.length },
 *   onPaginationChange: (pagination) => console.log('Page changed:', pagination),
 *
 *   // Selection
 *   selection: {
 *     mode: 'multiple',
 *     selectedKeys: [],
 *     getRowKey: (user) => String(user.id),
 *     onSelectionChange: (keys, selectedUsers) => console.log('Selection:', selectedUsers)
 *   },
 *
 *   // Search
 *   enableGlobalSearch: true,
 *   searchPlaceholder: 'Search users...',
 *
 *   // Events
 *   onRowClick: (user, index, event) => console.log('Clicked:', user),
 *   onRowDoubleClick: (user) => editUser(user),
 *
 *   // Styling
 *   getRowClassName: (user) => user.active ? '' : 'inactive-row'
 * });
 * ```
 *
 * @returns A Mithril component that renders the data table
 */
export const DataTable = <T = Record<string, any>>(): Component<DataTableAttrs<T>> => {
  const Content = TableContent<T>();
  const state: DataTableState<T> = {
    internalSort: undefined,
    internalFilter: undefined,
    internalPagination: undefined,
    processedData: [],
    tableId: '',
    // Performance optimization caches
    lastProcessedHash: '',
    cachedFilteredData: undefined,
    cachedSortedData: [],
    virtualScrollTop: 0,
    processedOriginalIndices: [],
    selectionCache: undefined,
  };

  // Helper functions
  const quickDataHash = (data: T[]): string => {
    if (data.length === 0) return '0';
    if (data.length === 1) return '1';

    // Sample first, middle, and last items for quick hash
    const first = JSON.stringify(data[0]);
    const middle = data.length > 2 ? JSON.stringify(data[Math.floor(data.length / 2)]) : '';
    const last = JSON.stringify(data[data.length - 1]);

    return `${data.length}-${first.length}-${middle.length}-${last.length}`;
  };

  const getDataHash = (attrs: DataTableAttrs<T>): string => {
    const { data, sort, filter, pagination } = attrs;
    const { internalSort, internalFilter, internalPagination } = state;

    const hashInputs = {
      dataLength: data.length,
      dataHash: quickDataHash(data),
      sort: sort || internalSort,
      filter: filter || internalFilter,
      pagination: pagination || internalPagination,
    };

    return JSON.stringify(hashInputs);
  };

  const getCellValue = (row: T, column: DataTableColumn<T>): any => {
    if (column.field) {
      return row[column.field];
    }
    return row;
  };

  const applyFiltering = (data: T[], filter: DataTableFilter, columns: DataTableColumn<T>[]): T[] => {
    if (!filter.searchTerm && !filter.columnFilters) return data;

    const filterableColumns = columns.filter((col) => col.filterable);
    if (filterableColumns.length === 0 && !filter.searchTerm) return data;

    const searchTerm = filter.searchTerm?.toLowerCase();
    const hasColumnFilters =
      filter.columnFilters &&
      Object.keys(filter.columnFilters).some((key) => {
        const value = filter.columnFilters![key];
        return value !== null && value !== undefined && value !== '';
      });

    return data.filter((row) => {
      // Global search
      if (searchTerm) {
        const matchesGlobal = filterableColumns.some((column) => {
          const value = getCellValue(row, column);
          if (value == null) return false;
          return String(value).toLowerCase().includes(searchTerm);
        });
        if (!matchesGlobal) return false;
      }

      // Column-specific filters
      if (hasColumnFilters) {
        const matchesColumnFilters = Object.entries(filter.columnFilters!).every(([columnKey, filterValue]) => {
          if (filterValue === null || filterValue === undefined || filterValue === '') return true;

          const column = columns.find((col) => col.key === columnKey);
          if (!column) return true;

          const value = getCellValue(row, column);
          if (value == null) return false;

          return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
        });
        if (!matchesColumnFilters) return false;
      }

      return true;
    });
  };

  const applySorting = (data: T[], sort: DataTableSort, columns: DataTableColumn<T>[]): T[] => {
    const column = columns.find((col) => col.key === sort.column);
    if (!column || !column.sortable) return data;

    const multiplier = sort.direction === 'asc' ? 1 : -1;

    return [...data].sort((a, b) => {
      const aValue = getCellValue(a, column);
      const bValue = getCellValue(b, column);

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return -1 * multiplier;
      if (bValue == null) return 1 * multiplier;

      // Type-specific comparisons
      const aType = typeof aValue;
      const bType = typeof bValue;

      if (aType === bType) {
        if (aType === 'number') {
          return (aValue - bValue) * multiplier;
        }
        if (aType === 'boolean') {
          return (aValue === bValue ? 0 : aValue ? 1 : -1) * multiplier;
        }
        if (aValue instanceof Date && bValue instanceof Date) {
          return (aValue.getTime() - bValue.getTime()) * multiplier;
        }
      }

      // Fallback to string comparison
      return String(aValue).localeCompare(String(bValue)) * multiplier;
    });
  };

  const processData = (attrs: DataTableAttrs<T>) => {
    const { data } = attrs;
    const { internalSort, internalFilter, internalPagination } = state;

    let processedData = [...data];
    state.selectionCache = undefined;

    // Apply filtering
    if (internalFilter) {
      processedData = applyFiltering(processedData, internalFilter, attrs.columns);
    }

    // Apply sorting
    if (internalSort) {
      processedData = applySorting(processedData, internalSort, attrs.columns);
    }

    const sourceIndicesByRow = new Map<T, number[]>();
    data.forEach((row, index) => {
      const indices = sourceIndicesByRow.get(row);
      if (indices) {
        indices.push(index);
      } else {
        sourceIndicesByRow.set(row, [index]);
      }
    });
    const rowOccurrences = new Map<T, number>();
    let processedOriginalIndices = processedData.map((row, index) => {
      const occurrence = rowOccurrences.get(row) ?? 0;
      rowOccurrences.set(row, occurrence + 1);
      return sourceIndicesByRow.get(row)?.[occurrence] ?? index;
    });

    // Update total count for pagination
    if (internalPagination) {
      state.internalPagination = {
        ...internalPagination,
        total: processedData.length,
      };
    }

    // Apply pagination
    if (internalPagination) {
      const { page, pageSize } = internalPagination;
      const start = page * pageSize;
      const end = start + pageSize;
      processedData = processedData.slice(start, end);
      processedOriginalIndices = processedOriginalIndices.slice(start, end);
    }

    state.processedData = processedData;
    state.processedOriginalIndices = processedOriginalIndices;
  };

  // Create stable helper functions that don't get recreated on every render
  const createHelpers = (attrs: DataTableAttrs<T>): DataTableHelpers<T> => ({
    getCellValue,
    handleSort: (columnKey: string) => {
      const column = attrs.columns.find((col) => col.key === columnKey);
      if (!column || !column.sortable) return;

      const currentSort = state.internalSort;
      let newSort: DataTableSort;

      if (currentSort?.column === columnKey) {
        // Toggle direction
        if (currentSort.direction === 'asc') {
          newSort = { column: columnKey, direction: 'desc' };
        } else {
          newSort = { column: columnKey, direction: 'asc' };
        }
      } else {
        // New column sort
        newSort = { column: columnKey, direction: 'asc' };
      }

      state.internalSort = newSort;
      attrs.onSortChange?.(newSort);
    },
    handleGlobalSearch: (searchTerm: string) => {
      const newFilter = {
        ...state.internalFilter,
        searchTerm,
      };
      state.internalFilter = newFilter;

      // Reset pagination to first page when filtering
      if (state.internalPagination) {
        state.internalPagination = {
          ...state.internalPagination,
          page: 0,
        };
      }

      attrs.onFilterChange?.(newFilter);
    },
    handleSelectionChange: (rowKey: string, selected: boolean) => {
      if (!attrs.selection) return;

      let newSelectedKeys: string[];

      if (attrs.selection.mode === 'single') {
        newSelectedKeys = selected ? [rowKey] : [];
      } else if (attrs.selection.mode === 'multiple') {
        if (selected) {
          newSelectedKeys = [...attrs.selection.selectedKeys, rowKey];
        } else {
          newSelectedKeys = attrs.selection.selectedKeys.filter((key) => key !== rowKey);
        }
      } else {
        return; // No selection mode
      }

      // Get selected rows
      const selectedKeySet = new Set(newSelectedKeys);
      const selectedRows = attrs.data.filter((row, index) => {
        const key = attrs.selection!.getRowKey(row, index);
        return selectedKeySet.has(key);
      });

      attrs.selection.onSelectionChange?.(newSelectedKeys, selectedRows);
    },
    handleSelectAll: (selected: boolean) => {
      if (!attrs.selection || attrs.selection.mode !== 'multiple') return;

      let newSelectedKeys: string[];

      if (selected) {
        // Select all visible rows
        newSelectedKeys = state.processedData.map((row, index) => {
          const originalIndex = state.processedOriginalIndices[index] ?? index;
          return attrs.selection!.getRowKey(row, originalIndex);
        });
      } else {
        newSelectedKeys = [];
      }

      const selectedKeySet = new Set(newSelectedKeys);
      const selectedRows = attrs.data.filter((row, index) => {
        const key = attrs.selection!.getRowKey(row, index);
        return selectedKeySet.has(key);
      });

      attrs.selection.onSelectionChange?.(newSelectedKeys, selectedRows);
    },
  });

  return {
    oninit(vnodeInit) {
      const { sort, filter, pagination } = vnodeInit.attrs;

      state.tableId = uniqueId();
      state.internalSort = sort || undefined;
      state.internalFilter = filter || { searchTerm: '', columnFilters: {} };
      state.internalPagination = pagination || undefined;

      processData(vnodeInit.attrs);
      state.lastProcessedHash = getDataHash(vnodeInit.attrs);
    },

    onbeforeupdate(vnodeUpdate) {
      // Only reprocess data if inputs have changed
      const currentHash = getDataHash(vnodeUpdate.attrs);
      if (currentHash !== state.lastProcessedHash) {
        processData(vnodeUpdate.attrs);
        state.lastProcessedHash = currentHash;
      }
    },

    view(vnodeView) {
      const attrs = vnodeView.attrs;
      const {
        loading,
        emptyMessage,
        striped,
        hoverable,
        responsive,
        centered,
        className,
        id,
        title,
        height,
        virtualization,
        enableGlobalSearch,
        searchPlaceholder,
        selection,
        columns,
        onRowClick,
        onRowDoubleClick,
        getRowClassName,
        getRowKey,
        onPaginationChange,
        i18n,
      } = attrs;
      const { processedData, tableId, internalSort, internalPagination } = state;
      if (loading) {
        return m('.datatable-loading', [
          m(
            '.preloader-wrapper.small.active',
            m('.spinner-layer.spinner-blue-only', m('.circle-clipper.left', m('.circle')))
          ),
          m('p', i18n?.loading || 'Loading...'),
        ]);
      }

      // Create stable helpers object using the factory function
      const helpers = createHelpers(attrs);

      // Calculate selection state for "select all" checkbox
      let allSelected = false;
      let someSelected = false;

      if (selection && selection.mode === 'multiple') {
        const cache = state.selectionCache;
        if (
          cache?.processedData === processedData &&
          cache.selectedKeys === selection.selectedKeys &&
          cache.getRowKey === selection.getRowKey
        ) {
          allSelected = cache.allSelected;
          someSelected = cache.someSelected;
        } else {
          const selectedKeys = new Set(selection.selectedKeys);
          let selectedCount = 0;
          processedData.forEach((row, index) => {
            const originalIndex = state.processedOriginalIndices[index] ?? index;
            if (selectedKeys.has(selection.getRowKey(row, originalIndex))) {
              selectedCount += 1;
            }
          });
          allSelected =
            processedData.length > 0 && selectedCount === processedData.length;
          someSelected =
            selectedCount > 0 && selectedCount < processedData.length;
          state.selectionCache = {
            processedData,
            selectedKeys: selection.selectedKeys,
            getRowKey: selection.getRowKey,
            allSelected,
            someSelected,
          };
        }
      }

      const tableClasses = [
        'datatable',
        striped ? 'striped' : '',
        hoverable ? 'highlight' : '',
        responsive ? 'responsive-table' : '',
        centered ? 'centered' : '',
        virtualization ? 'fixed-header' : '',
        className || '',
      ]
        .filter(Boolean)
        .join(' ');

      return m(
        '.datatable-container',
        {
          id: id || tableId,
        },
        title && m('h5.datatable-title', title),
        enableGlobalSearch &&
          m(GlobalSearch, {
            searchPlaceholder,
            onSearch: helpers.handleGlobalSearch,
            i18n,
          }),
        m(
          '.datatable-wrapper',
          {
            tabindex: virtualization ? 0 : undefined,
            'aria-label': virtualization
              ? title ?? 'Virtualized data table'
              : undefined,
            style: {
              maxHeight: virtualization
                ? `${virtualization.viewportHeight}px`
                : height
                  ? `${height}px`
                  : undefined,
              height: virtualization
                ? `${virtualization.viewportHeight}px`
                : undefined,
              overflowY: virtualization || height ? 'auto' : undefined,
              overflowX: responsive ? 'auto' : undefined,
            },
            onscroll: virtualization
              ? (event: Event) => {
                  const viewport = event.currentTarget as HTMLElement;
                  state.virtualScrollTop = viewport.scrollTop;
                  const focusedRow = (
                    document.activeElement as HTMLElement | null
                  )?.closest<HTMLElement>('tr[data-virtual-index]');
                  if (focusedRow && viewport.contains(focusedRow)) {
                    const focusedIndex = Number(
                      focusedRow.dataset.virtualIndex
                    );
                    const nextRange = calculateVirtualRange({
                      itemCount: processedData.length,
                      itemHeight: virtualization.rowHeight,
                      viewportHeight: virtualization.viewportHeight,
                      scrollTop: state.virtualScrollTop,
                      overscan: virtualization.overscan,
                    });
                    if (
                      focusedIndex < nextRange.startIndex ||
                      focusedIndex > nextRange.endIndex
                    ) {
                      viewport.focus();
                    }
                  }
                }
              : undefined,
          },
          processedData.length === 0
            ? m('.datatable-empty', emptyMessage || i18n?.noDataAvailable || 'No data available')
            : m(Content, {
                processedData,
                height,
                tableClasses,
                columns,
                selection,
                internalSort,
                allSelected,
                someSelected,
                helpers,
                onRowClick,
                onRowDoubleClick,
                getRowClassName,
                virtualization,
                scrollTop: state.virtualScrollTop,
                striped,
                processedOriginalIndices: state.processedOriginalIndices,
                getRowKey,
              })
        ),
        m(PaginationControls, {
          pagination: internalPagination,
          onPaginationChange: (pagination) => {
            state.internalPagination = pagination;
            onPaginationChange?.(pagination);
          },
          i18n,
        })
      );
    },
  };
};
