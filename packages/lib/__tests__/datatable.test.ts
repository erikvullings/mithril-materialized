import m from 'mithril';
import { DataTable, DataTableColumn, DataTableAttrs, DataTableSort, DataTablePagination, DataTableSelection, DataTableFilter } from '../src/datatable';

// Mock data for tests
interface TestUser {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
  active: boolean;
}

const mockUsers: TestUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, department: 'Engineering', active: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 28, department: 'Marketing', active: true },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35, department: 'Engineering', active: false },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', age: 32, department: 'HR', active: true },
  { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', age: 27, department: 'Marketing', active: true },
];

const mockColumns: DataTableColumn<TestUser>[] = [
  {
    key: 'id',
    title: 'ID',
    field: 'id',
    sortable: true,
    align: 'center',
    width: '80px'
  },
  {
    key: 'name',
    title: 'Name',
    field: 'name',
    sortable: true,
    filterable: true
  },
  {
    key: 'email',
    title: 'Email',
    field: 'email',
    sortable: true,
    filterable: true
  },
  {
    key: 'age',
    title: 'Age',
    field: 'age',
    sortable: true,
    align: 'center',
    width: '80px'
  },
  {
    key: 'department',
    title: 'Department',
    field: 'department',
    sortable: true,
    filterable: true
  },
  {
    key: 'status',
    title: 'Status',
    render: (value, row) => row.active ? m('span.green-text', 'Active') : m('span.red-text', 'Inactive'),
    sortable: true
  }
];

describe('DataTable Component', () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    m.mount(container, null);
    document.body.removeChild(container);
  });

  describe('Basic Rendering', () => {
    test('renders table with data', () => {
      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      expect(container.querySelector('table')).toBeTruthy();
      expect(container.querySelector('thead')).toBeTruthy();
      expect(container.querySelector('tbody')).toBeTruthy();
      
      // Check that all rows are rendered
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(mockUsers.length);
    });

    test('renders column headers correctly', () => {
      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const headers = container.querySelectorAll('thead th');
      expect(headers).toHaveLength(mockColumns.length);
      
      mockColumns.forEach((column, index) => {
        expect(headers[index].textContent).toContain(column.title);
      });
    });

    test('renders custom cell content using render function', () => {
      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      // Check status column (has custom render function)
      const statusCells = container.querySelectorAll('tbody tr td:nth-child(6)');
      expect(statusCells[0].textContent).toBe('Active');
      expect(statusCells[2].textContent).toBe('Inactive'); // Bob Johnson is inactive
    });

    test('applies table classes correctly', () => {
      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        striped: true,
        hoverable: true,
        centered: true,
        responsive: true,
        className: 'custom-table'
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const table = container.querySelector('table');
      expect(table?.className).toContain('striped');
      expect(table?.className).toContain('highlight');
      expect(table?.className).toContain('centered');
      expect(table?.className).toContain('responsive-table');
      expect(table?.className).toContain('custom-table');
    });

    test('shows empty message when no data', () => {
      const attrs: DataTableAttrs<TestUser> = {
        data: [],
        columns: mockColumns,
        emptyMessage: 'No users found'
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const emptyElement = container.querySelector('.datatable-empty');
      expect(emptyElement?.textContent).toBe('No users found');
    });

    test('shows loading state', () => {
      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        loading: true
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const loadingElement = container.querySelector('.datatable-loading');
      expect(loadingElement).toBeTruthy();
      expect(loadingElement?.textContent).toContain('Loading...');
    });
  });

  describe('Sorting', () => {
    test('renders sort indicators for sortable columns', () => {
      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const sortableHeaders = container.querySelectorAll('thead th.sortable');
      expect(sortableHeaders.length).toBeGreaterThan(0);

      // Check for sort indicators
      const sortIndicators = container.querySelectorAll('.sort-indicators');
      expect(sortIndicators.length).toBeGreaterThan(0);
    });

    test('applies initial sort correctly', () => {
      const initialSort: DataTableSort = {
        column: 'name',
        direction: 'asc'
      };

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        sort: initialSort
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      // Check that the name column shows active sort
      const nameHeader = Array.from(container.querySelectorAll('thead th')).find(
        th => th.textContent?.includes('Name')
      );
      expect(nameHeader?.className).toContain('sorted-asc');
    });

    test('calls onSortChange when sorting changes', () => {
      const onSortChange = jest.fn();
      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        onSortChange
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      // Click on sortable header
      const nameHeader = Array.from(container.querySelectorAll('thead th')).find(
        th => th.textContent?.includes('Name')
      );
      
      nameHeader?.click();

      expect(onSortChange).toHaveBeenCalledWith({
        column: 'name',
        direction: 'asc'
      });
    });
  });

  describe('Filtering', () => {
    test('renders global search when enabled', () => {
      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        enableGlobalSearch: true,
        searchPlaceholder: 'Search users...'
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const searchInput = container.querySelector('.datatable-search input');
      expect(searchInput).toBeTruthy();
      // Check that the search section exists with label
      const searchSection = container.querySelector('.datatable-search');
      expect(searchSection?.textContent).toContain('Search');
    });

    test('filters data based on search term', () => {
      const filter: DataTableFilter = {
        searchTerm: 'John'
      };

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        filter,
        enableGlobalSearch: true
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      // Should show only rows containing "John" (John Doe, Bob Johnson)
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(2);
    });
  });

  describe('Pagination', () => {
    test('renders pagination controls', () => {
      const pagination: DataTablePagination = {
        page: 0,
        pageSize: 3,
        total: mockUsers.length
      };

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        pagination
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const paginationElement = container.querySelector('.datatable-pagination');
      expect(paginationElement).toBeTruthy();

      const paginationInfo = container.querySelector('.pagination-info');
      expect(paginationInfo?.textContent).toContain('Showing 1 to 3 of 5 entries');
    });

    test('shows correct number of rows per page', () => {
      const pagination: DataTablePagination = {
        page: 0,
        pageSize: 2,
        total: mockUsers.length
      };

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        pagination
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(2); // Should show only 2 rows per page
    });

    test('calls onPaginationChange when pagination changes', () => {
      const onPaginationChange = jest.fn();
      const pagination: DataTablePagination = {
        page: 0,
        pageSize: 2,
        total: mockUsers.length
      };

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        pagination,
        onPaginationChange
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      // Click next page button
      const nextButton = Array.from(container.querySelectorAll('button')).find(
        btn => btn.textContent?.includes('▶')
      );
      
      nextButton?.click();

      expect(onPaginationChange).toHaveBeenCalled();
    });
  });

  describe('Selection', () => {
    test('renders selection checkboxes when selection is enabled', () => {
      const selection: DataTableSelection<TestUser> = {
        mode: 'multiple',
        selectedKeys: [],
        getRowKey: (row) => String(row.id)
      };

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        selection
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      // Check for selection column header
      const headerCheckbox = container.querySelector('thead .selection-checkbox input[type="checkbox"]');
      expect(headerCheckbox).toBeTruthy();

      // Check for row checkboxes
      const rowCheckboxes = container.querySelectorAll('tbody .selection-checkbox input[type="checkbox"]');
      expect(rowCheckboxes).toHaveLength(mockUsers.length);
    });

    test('shows selected rows correctly', () => {
      const selection: DataTableSelection<TestUser> = {
        mode: 'multiple',
        selectedKeys: ['1', '3'], // Select first and third users
        getRowKey: (row) => String(row.id)
      };

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        selection
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      // Check that selected rows have the selected class
      const selectedRows = container.querySelectorAll('tbody tr.selected');
      expect(selectedRows).toHaveLength(2);

      // Check that the correct checkboxes are checked
      const checkedBoxes = container.querySelectorAll('tbody .selection-checkbox input[type="checkbox"]:checked');
      expect(checkedBoxes).toHaveLength(2);
    });

    test('calls onSelectionChange when selection changes', () => {
      const onSelectionChange = jest.fn();
      const selection: DataTableSelection<TestUser> = {
        mode: 'multiple',
        selectedKeys: [],
        getRowKey: (row) => String(row.id),
        onSelectionChange
      };

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        selection
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      // Click on first row checkbox
      const firstRowCheckbox = container.querySelector('tbody tr:first-child .selection-checkbox input[type="checkbox"]');
      firstRowCheckbox?.click();

      expect(onSelectionChange).toHaveBeenCalledWith(['1'], [mockUsers[0]]);
    });

    test('handles single selection mode correctly', () => {
      const onSelectionChange = jest.fn();
      const selection: DataTableSelection<TestUser> = {
        mode: 'single',
        selectedKeys: ['1'],
        getRowKey: (row) => String(row.id),
        onSelectionChange
      };

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        selection
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      // Should not have "select all" checkbox
      const headerCheckbox = container.querySelector('thead .selection-checkbox input[type="checkbox"]');
      expect(headerCheckbox).toBeFalsy();

      // Click on second row checkbox (should deselect first and select second)
      const secondRowCheckbox = container.querySelector('tbody tr:nth-child(2) .selection-checkbox input[type="checkbox"]');
      secondRowCheckbox?.click();

      expect(onSelectionChange).toHaveBeenCalledWith(['2'], [mockUsers[1]]);
    });
  });

  describe('Row Events', () => {
    test('calls onRowClick when row is clicked', () => {
      const onRowClick = jest.fn();
      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        onRowClick
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const firstRow = container.querySelector('tbody tr:first-child');
      firstRow?.click();

      expect(onRowClick).toHaveBeenCalledWith(mockUsers[0], 0, expect.any(Event));
    });

    test('calls onRowDoubleClick when row is double-clicked', () => {
      const onRowDoubleClick = jest.fn();
      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        onRowDoubleClick
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const firstRow = container.querySelector('tbody tr:first-child');
      firstRow?.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));

      expect(onRowDoubleClick).toHaveBeenCalledWith(mockUsers[0], 0, expect.any(Event));
    });

    test('applies custom row class names', () => {
      const getRowClassName = jest.fn((row: TestUser) => 
        row.active ? 'active-user' : 'inactive-user'
      );

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        getRowClassName
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const firstRow = container.querySelector('tbody tr:first-child');
      expect(firstRow?.className).toContain('active-user');

      const thirdRow = container.querySelector('tbody tr:nth-child(3)');
      expect(thirdRow?.className).toContain('inactive-user'); // Bob Johnson is inactive
    });
  });

  describe('Data Processing', () => {
    test('processes data correctly with filtering, sorting, and pagination', () => {
      const sort: DataTableSort = {
        column: 'name',
        direction: 'desc'
      };

      const filter: DataTableFilter = {
        searchTerm: 'e' // Should match users with 'e' in filterable fields
      };

      const pagination: DataTablePagination = {
        page: 0,
        pageSize: 2,
        total: 0 // Will be updated by component
      };

      const attrs: DataTableAttrs<TestUser> = {
        data: mockUsers,
        columns: mockColumns,
        sort,
        filter,
        pagination
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      // Should show filtered, sorted, and paginated results
      const rows = container.querySelectorAll('tbody tr');
      expect(rows.length).toBeLessThanOrEqual(2); // Due to pagination
    });

    test('handles empty data gracefully', () => {
      const attrs: DataTableAttrs<TestUser> = {
        data: [],
        columns: mockColumns
      };

      m.mount(container, { view: () => m(DataTable<TestUser>(), attrs) });

      const emptyMessage = container.querySelector('.datatable-empty');
      expect(emptyMessage?.textContent).toContain('No data available');
    });

    test('handles null/undefined values in cells', () => {
      const dataWithNulls = [
        { id: 1, name: null, email: 'test@example.com', age: 25, department: 'IT', active: true },
        { id: 2, name: 'Test User', email: undefined, age: 30, department: null, active: false }
      ] as any[];

      const attrs: DataTableAttrs<any> = {
        data: dataWithNulls,
        columns: mockColumns
      };

      m.mount(container, { view: () => m(DataTable(), attrs) });

      // Should render without errors
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(2);
    });
  });
});