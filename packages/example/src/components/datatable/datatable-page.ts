import m, { FactoryComponent } from 'mithril';
import {
  DataTable,
  DataTableColumn,
  DataTableSort,
  DataTablePagination,
  DataTableSelection,
  DataTableFilter,
  TreeView,
  TreeNode,
} from 'mithril-materialized';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
  salary: number;
  active: boolean;
  joinDate: Date;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
  rating: number;
  description: string;
}

// Generate sample data
const generateUsers = (count: number): User[] => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const names = [
    'John Doe',
    'Jane Smith',
    'Bob Johnson',
    'Alice Brown',
    'Charlie Wilson',
    'Diana Prince',
    'Eve Adams',
    'Frank Miller',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: names[i % names.length] + (i > names.length ? ` ${Math.floor(i / names.length) + 1}` : ''),
    email: `user${i + 1}@example.com`,
    age: Math.floor(Math.random() * 40) + 25,
    department: departments[Math.floor(Math.random() * departments.length)],
    salary: Math.floor(Math.random() * 100000) + 50000,
    active: Math.random() > 0.2,
    joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 5),
  }));
};

const generateProducts = (count: number): Product[] => {
  const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];
  const productNames = ['Widget', 'Gadget', 'Device', 'Tool', 'Accessory', 'Component'];

  return Array.from({ length: count }, (_, i) => ({
    id: `PRD-${String(i + 1).padStart(4, '0')}`,
    name: `${productNames[i % productNames.length]} ${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    price: Math.round((Math.random() * 500 + 10) * 100) / 100,
    inStock: Math.random() > 0.3,
    rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
    description: `Description for ${productNames[i % productNames.length]} ${
      i + 1
    }. This is a sample product description.`,
  }));
};

// Generate sample tree data
const generateTreeData = (): TreeNode[] => {
  return [
    {
      id: 'company',
      label: 'Acme Corporation',
      icon: 'business',
      expanded: true,
      children: [
        {
          id: 'engineering',
          label: 'Engineering',
          icon: 'code',
          expanded: true,
          children: [
            {
              id: 'frontend',
              label: 'Frontend Team',
              icon: 'web',
              children: [
                { id: 'react-dev', label: 'React Developer', icon: 'person' },
                { id: 'vue-dev', label: 'Vue Developer', icon: 'person' },
                { id: 'mithril-dev', label: 'Mithril Developer', icon: 'person' },
              ],
            },
            {
              id: 'backend',
              label: 'Backend Team',
              icon: 'storage',
              expanded: false,
              children: [
                { id: 'node-dev', label: 'Node.js Developer', icon: 'person' },
                { id: 'python-dev', label: 'Python Developer', icon: 'person' },
                { id: 'go-dev', label: 'Go Developer', icon: 'person' },
              ],
            },
            {
              id: 'devops',
              label: 'DevOps Team',
              icon: 'cloud',
              children: [
                { id: 'k8s-engineer', label: 'Kubernetes Engineer', icon: 'person' },
                { id: 'aws-architect', label: 'AWS Architect', icon: 'person' },
              ],
            },
          ],
        },
        {
          id: 'marketing',
          label: 'Marketing',
          icon: 'campaign',
          children: [
            { id: 'digital-marketing', label: 'Digital Marketing', icon: 'person' },
            { id: 'content-marketing', label: 'Content Marketing', icon: 'person' },
            { id: 'seo-specialist', label: 'SEO Specialist', icon: 'person' },
          ],
        },
        {
          id: 'sales',
          label: 'Sales',
          icon: 'trending_up',
          expanded: true,
          children: [
            { id: 'enterprise-sales', label: 'Enterprise Sales', icon: 'person' },
            { id: 'smb-sales', label: 'SMB Sales', icon: 'person' },
            { id: 'inside-sales', label: 'Inside Sales', icon: 'person', disabled: true },
          ],
        },
        {
          id: 'hr',
          label: 'Human Resources',
          icon: 'people',
          children: [
            { id: 'recruiting', label: 'Recruiting', icon: 'person_search' },
            { id: 'benefits', label: 'Benefits Administration', icon: 'favorite' },
          ],
        },
      ],
    },
    {
      id: 'projects',
      label: 'Active Projects',
      icon: 'folder',
      expanded: false,
      children: [
        {
          id: 'project-alpha',
          label: 'Project Alpha',
          icon: 'assignment',
          children: [
            { id: 'alpha-frontend', label: 'Frontend Module', icon: 'web' },
            { id: 'alpha-backend', label: 'Backend API', icon: 'api' },
            { id: 'alpha-testing', label: 'Testing Suite', icon: 'bug_report' },
          ],
        },
        {
          id: 'project-beta',
          label: 'Project Beta',
          icon: 'assignment',
          children: [
            { id: 'beta-research', label: 'Research Phase', icon: 'science' },
            { id: 'beta-prototype', label: 'Prototype', icon: 'build' },
          ],
        },
      ],
    },
  ];
};

// Component state
interface DataTablePageState {
  // User table state
  users: User[];
  userSort: DataTableSort;
  userFilter: DataTableFilter;
  userPagination: DataTablePagination;
  userSelection: DataTableSelection<User>;

  // Product table state
  products: Product[];
  productSort: DataTableSort;
  productFilter: DataTableFilter;
  productPagination: DataTablePagination;

  // Large dataset for performance demo
  largeDataset: User[];
  largeDatasetPagination: DataTablePagination;

  // TreeView state
  treeData: TreeNode[];
  selectedTreeNodes: string[];
}

export const DataTablePage: FactoryComponent = () => {
  const state = {} as DataTablePageState;
  return {
    oninit() {
      // Initialize data
      state.users = generateUsers(25);
      state.products = generateProducts(30);
      state.largeDataset = generateUsers(5000);
      state.treeData = generateTreeData();
      state.selectedTreeNodes = [];

      // Initialize user table state
      state.userSort = { column: 'name', direction: 'asc' };
      state.userFilter = { searchTerm: '', columnFilters: {} };
      state.userPagination = { page: 0, pageSize: 10, total: 0 };
      state.userSelection = {
        mode: 'multiple',
        selectedKeys: [],
        getRowKey: (user) => String(user.id),
        onSelectionChange: (keys, users) => {
          state.userSelection.selectedKeys = keys;
          console.log('Selected users:', users);
        },
      };

      // Initialize product table state
      state.productSort = { column: 'price', direction: 'desc' };
      state.productFilter = { searchTerm: '', columnFilters: {} };
      state.productPagination = { page: 0, pageSize: 8, total: 0 };

      // Initialize large dataset pagination
      state.largeDatasetPagination = { page: 0, pageSize: 100, total: state.largeDataset.length };
    },

    view() {
      const {
        users,
        products,
        largeDataset,
        userSort,
        userFilter,
        userPagination,
        userSelection,
        productSort,
        productFilter,
        productPagination,
        largeDatasetPagination,
        treeData,
        selectedTreeNodes,
      } = state;

      // User table columns
      const userColumns: DataTableColumn<User>[] = [
        {
          key: 'id',
          title: 'ID',
          field: 'id',
          sortable: true,
          align: 'center',
          width: '80px',
        },
        {
          key: 'name',
          title: 'Name',
          field: 'name',
          sortable: true,
          filterable: true,
        },
        {
          key: 'email',
          title: 'Email',
          field: 'email',
          sortable: true,
          filterable: true,
        },
        {
          key: 'age',
          title: 'Age',
          field: 'age',
          sortable: true,
          align: 'center',
          width: '80px',
        },
        {
          key: 'department',
          title: 'Department',
          field: 'department',
          sortable: true,
          filterable: true,
        },
        {
          key: 'salary',
          title: 'Salary',
          field: 'salary',
          sortable: true,
          align: 'right',
          render: (value) => `$${value.toLocaleString()}`,
        },
        {
          key: 'status',
          title: 'Status',
          render: (value, user) =>
            m(
              'span',
              {
                class: user.active ? 'green-text' : 'red-text',
                style: 'font-weight: bold;',
              },
              user.active ? 'Active' : 'Inactive'
            ),
        },
        {
          key: 'joinDate',
          title: 'Join Date',
          field: 'joinDate',
          sortable: true,
          render: (value) => value.toLocaleDateString(),
        },
      ];

      // Product table columns
      const productColumns: DataTableColumn<Product>[] = [
        {
          key: 'id',
          title: 'Product ID',
          field: 'id',
          sortable: true,
          width: '120px',
        },
        {
          key: 'name',
          title: 'Product Name',
          field: 'name',
          sortable: true,
          filterable: true,
        },
        {
          key: 'category',
          title: 'Category',
          field: 'category',
          sortable: true,
          filterable: true,
        },
        {
          key: 'price',
          title: 'Price',
          field: 'price',
          sortable: true,
          align: 'right',
          render: (value) => `$${value.toFixed(2)}`,
        },
        {
          key: 'stock',
          title: 'Stock',
          render: (value, product) =>
            m(
              'span',
              {
                class: product.inStock ? 'green-text' : 'red-text',
              },
              product.inStock ? 'In Stock' : 'Out of Stock'
            ),
        },
        {
          key: 'rating',
          title: 'Rating',
          field: 'rating',
          sortable: true,
          align: 'center',
          render: (value) => m('span', ['★'.repeat(Math.floor(value)), '☆'.repeat(5 - Math.floor(value)), ` ${value}`]),
        },
      ];

      return m('.datatables', [
        // Page header
        m('.row', [
          m('.col.s12', [
            m('h3', 'DataTable Component'),
            m(
              'p.grey-text',
              'Advanced data table with sorting, filtering, pagination, selection, and scrolling support.'
            ),
          ]),
        ]),

        // Basic DataTable Example
        m('.row', [
          m('.col.s12', [
            m('h5', 'Basic DataTable with Users'),
            m('p', 'Features: sorting, filtering, pagination, row selection, and responsive design.'),

            m('.card', [
              m('.card-content', [
                m('div', { style: 'margin-bottom: 1rem;' }, [
                  m('strong', `Selected: ${userSelection.selectedKeys.length} user(s)`),
                ]),

                m(DataTable<User>, {
                  data: users,
                  columns: userColumns,
                  title: 'User Management Table',
                  striped: true,
                  hoverable: true,
                  responsive: true,

                  // Sorting
                  sort: userSort,
                  onSortChange: (sort) => {
                    state.userSort = sort;
                  },

                  // Filtering
                  enableGlobalSearch: true,
                  searchPlaceholder: 'Search users...',
                  filter: userFilter,
                  onFilterChange: (filter) => {
                    state.userFilter = filter;
                  },

                  // Pagination
                  pagination: userPagination,
                  onPaginationChange: (pagination) => {
                    state.userPagination = pagination;
                  },

                  // Selection
                  selection: userSelection,

                  // Row events
                  onRowClick: (user) => {
                    console.log('Clicked user:', user);
                  },
                  onRowDoubleClick: (user) => {
                    console.log('Double-clicked user:', user);
                  },

                  // Custom row styling
                  getRowClassName: (user) => (user.active ? '' : 'grey lighten-4'),
                }),
              ]),
            ]),
          ]),
        ]),

        // Product Table Example
        m('.row', [
          m('.col.s12', [
            m('h5', 'Product Catalog Table'),
            m('p', 'Different data types with custom rendering and styling.'),

            m('.card', [
              m('.card-content', [
                m(DataTable<Product>, {
                  data: products,
                  columns: productColumns,
                  striped: true,
                  hoverable: true,
                  centered: true,

                  sort: productSort,
                  onSortChange: (sort) => {
                    state.productSort = sort;
                  },

                  enableGlobalSearch: true,
                  filter: productFilter,
                  onFilterChange: (filter) => {
                    state.productFilter = filter;
                  },

                  pagination: productPagination,
                  onPaginationChange: (pagination) => {
                    state.productPagination = pagination;
                  },
                }),
              ]),
            ]),
          ]),
        ]),

        // Large Dataset Demo
        m('.row', [
          m('.col.s12', [
            m('h5', 'Large Dataset Performance Demo'),
            m('p', 'Handling large datasets (5,000+ rows) efficiently with pagination and search.'),

            m('.card', [
              m('.card-content', [
                m(DataTable<User>, {
                  data: largeDataset,
                  columns: userColumns.slice(0, 5), // Fewer columns for better performance
                  title: `Large Dataset (${largeDataset.length.toLocaleString()} rows)`,
                  striped: true,
                  hoverable: true,
                  height: 400,

                  pagination: largeDatasetPagination,
                  onPaginationChange: (pagination) => {
                    state.largeDatasetPagination = pagination;
                  },

                  enableGlobalSearch: true,
                  emptyMessage: 'No data found',
                }),
              ]),
            ]),
          ]),
        ]),

        // TreeView Section
        m('.row', [
          m('.col.s12', [
            m('h3', { style: 'margin-top: 3rem;' }, 'TreeView Component'),
            m('p.grey-text', 'Hierarchical tree component with expand/collapse, selection, and customizable icons.'),
          ]),
        ]),

        // TreeView Examples
        m('.row', [
          m('.col.s12.m6', [
            m('h5', 'Organization Structure'),
            m('p', 'TreeView with multiple selection and caret icons.'),

            m('.card', [
              m('.card-content', [
                m('div', { style: 'margin-bottom: 1rem;' }, [
                  m('strong', `Selected: ${selectedTreeNodes.length} node(s)`),
                  selectedTreeNodes.length > 0 &&
                    m(
                      'div',
                      { style: 'margin-top: 0.5rem; font-size: 0.9em; color: #666;' },
                      selectedTreeNodes.join(', ')
                    ),
                ]),

                m(TreeView, {
                  data: treeData,
                  selectionMode: 'multiple',
                  selectedIds: selectedTreeNodes,
                  iconType: 'caret',
                  showConnectors: true,
                  keyboardNavigation: true,
                  onselection: (selectedIds) => {
                    state.selectedTreeNodes = selectedIds;
                    console.log('Selected nodes:', selectedIds);
                  },
                  onexpand: ({ nodeId, expanded }) => {
                    console.log(`Node ${nodeId} ${expanded ? 'expanded' : 'collapsed'}`);
                  },
                }),
              ]),
            ]),
          ]),

          m('.col.s12.m6', [
            m('h5', 'File System Tree'),
            m('p', 'TreeView with single selection and different icon styles.'),

            // Different icon style examples
            m('.card', [
              m('.card-content', [
                m('h6', 'Plus/Minus Icons'),
                m(TreeView, {
                  data: [
                    {
                      id: 'root',
                      label: 'Project Root',
                      expanded: true,
                      children: [
                        {
                          id: 'src',
                          label: 'src/',
                          expanded: true,
                          children: [
                            { id: 'components', label: 'components/' },
                            { id: 'utils', label: 'utils/' },
                            { id: 'index', label: 'index.ts' },
                          ],
                        },
                        { id: 'package', label: 'package.json' },
                        { id: 'readme', label: 'README.md' },
                      ],
                    },
                  ],
                  selectionMode: 'single',
                  iconType: 'plus-minus',
                  showConnectors: true,
                }),
              ]),
            ]),

            m('.card', { style: 'margin-top: 1rem;' }, [
              m('.card-content', [
                m('h6', 'Triangle Icons'),
                m(TreeView, {
                  data: [
                    {
                      id: 'config',
                      label: 'Configuration',
                      expanded: false,
                      children: [
                        { id: 'database', label: 'Database Settings' },
                        { id: 'api', label: 'API Configuration' },
                        { id: 'security', label: 'Security Settings' },
                      ],
                    },
                  ],
                  selectionMode: 'single',
                  iconType: 'triangle',
                  showConnectors: false,
                }),
              ]),
            ]),

            m('.card', { style: 'margin-top: 1rem;' }, [
              m('.card-content', [
                m('h6', 'Chevron Icons'),
                m(TreeView, {
                  data: [
                    {
                      id: 'menu',
                      label: 'Navigation Menu',
                      expanded: true,
                      children: [
                        { id: 'home', label: 'Home' },
                        {
                          id: 'products',
                          label: 'Products',
                          expanded: false,
                          children: [
                            { id: 'electronics', label: 'Electronics' },
                            { id: 'clothing', label: 'Clothing' },
                          ],
                        },
                        { id: 'contact', label: 'Contact' },
                      ],
                    },
                  ],
                  selectionMode: 'none',
                  iconType: 'chevron',
                  showConnectors: true,
                }),
              ]),
            ]),
          ]),
        ]),

        // TreeView Code Examples
        m('.row', [
          m('.col.s12', [
            m('h5', 'TreeView Usage Examples'),

            m('.card', [
              m('.card-content', [
                m('h6', 'Basic Usage'),
                m(
                  'pre',
                  m(
                    'code',
                    `
import { TreeView, TreeNode } from 'mithril-materialized';

const treeData: TreeNode[] = [
  {
    id: "1",
    label: "Root",
    expanded: true,
    children: [
      { id: "2", label: "Child A" },
      { id: "3", label: "Child B" },
    ]
  }
];

m(TreeView, {
  data: treeData,
  selectionMode: 'single',
  iconType: 'caret',
  showConnectors: true,
  onselection: (selectedIds) => console.log('Selected:', selectedIds),
});
              `.trim()
                  )
                ),

                m('h6', 'With Multiple Selection'),
                m(
                  'pre',
                  m(
                    'code',
                    `
m(TreeView, {
  data: treeData,
  selectionMode: 'multiple',
  selectedIds: ['node1', 'node2'],
  iconType: 'plus-minus',
  showConnectors: true,
  onselection: (selectedIds) => {
    console.log('Multi-select:', selectedIds);
  },
  onexpand: ({ nodeId, expanded }) => {
    console.log(\`Node \${nodeId} \${expanded ? 'expanded' : 'collapsed'}\`);
  },
});
              `.trim()
                  )
                ),

                m('h6', 'Different Icon Types'),
                m(
                  'pre',
                  m(
                    'code',
                    `
// Available icon types
iconType: 'caret'      // Default - Material Design caret
iconType: 'chevron'    // Chevron arrow
iconType: 'plus-minus' // + / - symbols
iconType: 'triangle'   // ▶ triangle

// Other configuration options
showConnectors: true   // VSCode-style connecting lines
keyboardNavigation: true // Enable arrow key navigation
selectionMode: 'single' | 'multiple' | 'none'
              `.trim()
                  )
                ),
              ]),
            ]),
          ]),
        ]),

        // Code Examples
        m('.row', [
          m('.col.s12', [
            m('h5', 'Usage Examples'),

            m('.card', [
              m('.card-content', [
                m('h6', 'Basic Usage'),
                m(
                  'pre',
                  m(
                    'code',
                    `
import { DataTable, DataTableColumn } from 'mithril-materialized';

const columns: DataTableColumn<User>[] = [
  { key: 'id', title: 'ID', field: 'id', sortable: true },
  { key: 'name', title: 'Name', field: 'name', sortable: true, filterable: true },
  { key: 'email', title: 'Email', field: 'email', sortable: true, filterable: true }
];

m(DataTable<User>, {
  data: users,
  columns,
  striped: true,
  hoverable: true,
  enableGlobalSearch: true,
  pagination: { page: 0, pageSize: 10, total: users.length }
});
              `.trim()
                  )
                ),

                m('h6', 'With Pagination'),
                m(
                  'pre',
                  m(
                    'code',
                    `
m(DataTable<User>, {
  data: users,
  columns,
  pagination: { page: 0, pageSize: 10, total: users.length },
  onPaginationChange: (pagination) => {
    console.log('Page changed:', pagination);
  }
});
              `.trim()
                  )
                ),

                m('h6', 'With Row Selection'),
                m(
                  'pre',
                  m(
                    'code',
                    `
const selection: DataTableSelection<User> = {
  mode: 'multiple',
  selectedKeys: [],
  getRowKey: (user) => String(user.id),
  onSelectionChange: (keys, users) => {
    console.log('Selected:', users);
  }
};

m(DataTable<User>, {
  data: users,
  columns,
  selection
});
              `.trim()
                  )
                ),
              ]),
            ]),
          ]),
        ]),
      ]);
    },
  };
};
