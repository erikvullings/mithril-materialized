import m, { FactoryComponent, Attributes, Vnode } from 'mithril';
import { MaterialIcon } from './material-icon';
import { EventHandler, SelectionMode } from './types';

export interface TreeNode {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  expanded?: boolean;
  children?: TreeNode[];
}

export type TreeIconType = 'caret' | 'chevron' | 'plus-minus' | 'triangle';

// Utility function to check if a node is the last in its branch
const isNodeLastInBranch = (nodePath: number[], rootNodes: TreeNode[]): boolean => {
  // Navigate to the node's position and check if it's the last child at every level
  let currentNodes = rootNodes;
  for (let i = 0; i < nodePath.length; i++) {
    const index = nodePath[i];
    const isLastAtThisLevel = index === currentNodes.length - 1;
    
    // If this is not the last child at this level, then this node is not last in branch
    if (!isLastAtThisLevel) {
      return false;
    }
    
    // Move to the next level if it exists
    if (i < nodePath.length - 1) {
      const currentNode = currentNodes[index];
      if (currentNode.children) {
        currentNodes = currentNode.children;
      }
    }
  }
  return true;
};

export interface TreeViewAttrs<T extends TreeNode = TreeNode> extends Attributes {
  /** Tree data structure */
  data: T[];
  /** Selection mode - none, single, or multiple */
  selectionMode?: SelectionMode;
  /** Currently selected node IDs */
  selectedIds?: string[];
  /** Called when selection changes */
  onselection?: EventHandler<string[]>;
  /** Called when node is expanded/collapsed */
  onexpand?: EventHandler<{ nodeId: string; expanded: boolean }>;
  /** Icon type for expand/collapse indicators */
  iconType?: TreeIconType;
  /** Show connecting lines between tree levels (VSCode-style) */
  showConnectors?: boolean;
  /** Allow keyboard navigation */
  keyboardNavigation?: boolean;
  /** Optional CSS class */
  className?: string;
  /** Optional inline styles */
  style?: Record<string, any>;
  /** Component ID */
  id?: string;
}

interface TreeViewState {
  selectedIds: Set<string>;
  expandedIds: Set<string>;
  focusedNodeId: string | null;
  treeMap: Map<string, TreeNode>;
}

interface TreeNodeComponentAttrs {
  node: TreeNode;
  level: number;
  isSelected: boolean;
  isExpanded: boolean;
  isFocused: boolean;
  showConnectors: boolean;
  iconType: TreeIconType;
  selectionMode: SelectionMode;
  onToggleExpand: (nodeId: string) => void;
  onToggleSelect: (nodeId: string) => void;
  onFocus: (nodeId: string) => void;
  isLastInBranch?: boolean;
  currentPath?: number[];
  treeState?: TreeViewState;
  treeAttrs?: TreeViewAttrs;
}

const TreeNodeComponent: FactoryComponent<TreeNodeComponentAttrs> = () => {
  return {
    view: ({ attrs }) => {
      const {
        node,
        level,
        isSelected,
        isExpanded,
        isFocused,
        showConnectors,
        iconType,
        selectionMode,
        onToggleExpand,
        onToggleSelect,
        onFocus,
      } = attrs;

      const hasChildren = node.children && node.children.length > 0;
      const indentLevel = level * 24; // 24px per level

      return m(
        'li.tree-node',
        {
          class:
            [
              isSelected && 'selected',
              isFocused && 'focused',
              node.disabled && 'disabled',
              hasChildren && 'has-children',
              attrs.isLastInBranch && 'tree-last-in-branch',
            ]
              .filter(Boolean)
              .join(' ') || undefined,
          'data-node-id': node.id,
          'data-level': level,
        },
        [
          // Node content
          m(
            '.tree-node-content',
            {
              style: {
                paddingLeft: `${indentLevel}px`,
              },
              onclick: node.disabled
                ? undefined
                : () => {
                    if (selectionMode !== 'none') {
                      onToggleSelect(node.id);
                    }
                    onFocus(node.id);
                  },
              onkeydown: (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (!node.disabled && selectionMode !== 'none') {
                    onToggleSelect(node.id);
                  }
                }
              },
              tabindex: node.disabled ? -1 : 0,
              role: selectionMode === 'multiple' ? 'option' : 'treeitem',
              'aria-selected': selectionMode !== 'none' ? isSelected.toString() : undefined,
              'aria-expanded': hasChildren ? isExpanded.toString() : undefined,
              'aria-disabled': node.disabled ? 'true' : undefined,
            },
            [
              // Connector lines
              showConnectors &&
                level > 0 &&
                m(
                  '.tree-connectors',
                  Array.from({ length: level }, (_, i) =>
                    m('.tree-connector', {
                      key: i,
                      style: { left: `${i * 24 + 12}px` },
                    })
                  )
                ),

              // Expand/collapse icon or spacer
              hasChildren
                ? m(
                    '.tree-expand-icon',
                    {
                      onclick: (e: Event) => {
                        e.stopPropagation();
                        if (!node.disabled) {
                          onToggleExpand(node.id);
                        }
                      },
                      class: iconType,
                    },
                    [
                      iconType === 'plus-minus'
                        ? m('span.tree-plus-minus', isExpanded ? '−' : '+')
                        : iconType === 'triangle'
                        ? m('span.tree-triangle', { class: isExpanded ? 'expanded' : undefined }, '▶')
                        : iconType === 'chevron'
                        ? m(MaterialIcon, {
                            name: 'chevron',
                            direction: isExpanded ? 'down' : 'right',
                            class: 'tree-chevron-icon',
                          })
                        : m(MaterialIcon, {
                            name: 'caret',
                            direction: isExpanded ? 'down' : 'right',
                            class: 'tree-caret-icon',
                          }),
                    ]
                  )
                : m('.tree-expand-spacer'), // Spacer for alignment

              // Selection indicator for multiple selection
              selectionMode === 'multiple' &&
                m('.tree-selection-indicator', [
                  m('input[type=checkbox]', {
                    checked: isSelected,
                    disabled: node.disabled,
                    onchange: () => {
                      if (!node.disabled) {
                        onToggleSelect(node.id);
                      }
                    },
                    onclick: (e: Event) => e.stopPropagation(),
                  }),
                ]),

              // Node icon (optional)
              node.icon && m('i.tree-node-icon.material-icons', node.icon),

              // Node label
              m('span.tree-node-label', node.label),
            ]
          ),

          // Children (recursive)
          hasChildren &&
            isExpanded &&
            m(
              'ul.tree-children',
              {
                role: 'group',
                'aria-expanded': 'true',
              },
              node.children!.map((child, childIndex) => {
                // Calculate state for each child using treeState
                const childIsSelected = attrs.treeState?.selectedIds.has(child.id) ?? false;
                const childIsExpanded = attrs.treeState?.expandedIds.has(child.id) ?? false;
                const childIsFocused = attrs.treeState?.focusedNodeId === child.id;
                
                // Calculate if this child is last in branch
                const childPath = [...(attrs.currentPath || []), childIndex];
                const childIsLastInBranch = attrs.treeAttrs?.data ? 
                  isNodeLastInBranch(childPath, attrs.treeAttrs.data) : false;

                return m(TreeNodeComponent, {
                  key: child.id,
                  node: child,
                  level: level + 1,
                  isSelected: childIsSelected,
                  isExpanded: childIsExpanded,
                  isFocused: childIsFocused,
                  showConnectors,
                  iconType,
                  selectionMode,
                  onToggleExpand,
                  onToggleSelect,
                  onFocus,
                  isLastInBranch: childIsLastInBranch,
                  currentPath: childPath,
                  treeState: attrs.treeState,
                  treeAttrs: attrs.treeAttrs,
                });
              })
            ),
        ]
      );
    },
  };
};

export const TreeView: FactoryComponent<TreeViewAttrs> = () => {
  const state: TreeViewState = {
    selectedIds: new Set(),
    expandedIds: new Set(),
    focusedNodeId: null,
    treeMap: new Map(),
  };

  const buildTreeMap = (nodes: TreeNode[], map: Map<string, TreeNode>) => {
    nodes.forEach((node) => {
      map.set(node.id, node);
      if (node.children) {
        buildTreeMap(node.children, map);
      }
    });
  };

  const initializeExpandedNodes = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      if (node.expanded) {
        state.expandedIds.add(node.id);
      }
      if (node.children) {
        initializeExpandedNodes(node.children);
      }
    });
  };

  const handleToggleExpand = (nodeId: string, attrs: TreeViewAttrs) => {
    const isExpanded = state.expandedIds.has(nodeId);
    if (isExpanded) {
      state.expandedIds.delete(nodeId);
    } else {
      state.expandedIds.add(nodeId);
    }

    attrs.onexpand?.({ nodeId, expanded: !isExpanded });
  };

  const handleToggleSelect = (nodeId: string, attrs: TreeViewAttrs) => {
    const { selectionMode = 'single' } = attrs;

    if (selectionMode === 'single') {
      state.selectedIds.clear();
      state.selectedIds.add(nodeId);
    } else if (selectionMode === 'multiple') {
      if (state.selectedIds.has(nodeId)) {
        state.selectedIds.delete(nodeId);
      } else {
        state.selectedIds.add(nodeId);
      }
    }

    attrs.onselection?.(Array.from(state.selectedIds));
  };

  const handleFocus = (nodeId: string) => {
    state.focusedNodeId = nodeId;
  };

  const renderNodes = (nodes: TreeNode[], attrs: TreeViewAttrs, level = 0, parentPath: number[] = []): Vnode<any, any>[] => {
    return nodes.map((node, index) => {
      const isSelected = state.selectedIds.has(node.id);
      const isExpanded = state.expandedIds.has(node.id);
      const isFocused = state.focusedNodeId === node.id;
      const currentPath = [...parentPath, index];
      const isLastInBranch = isNodeLastInBranch(currentPath, attrs.data);

      return m(TreeNodeComponent, {
        key: node.id,
        node,
        level,
        isSelected,
        isExpanded,
        isFocused,
        showConnectors: attrs.showConnectors ?? true,
        iconType: attrs.iconType ?? 'caret',
        selectionMode: attrs.selectionMode ?? 'single',
        onToggleExpand: (nodeId: string) => handleToggleExpand(nodeId, attrs),
        onToggleSelect: (nodeId: string) => handleToggleSelect(nodeId, attrs),
        onFocus: handleFocus,
        isLastInBranch,
        currentPath,
        // Pass state and attrs for recursive rendering
        treeState: state,
        treeAttrs: attrs,
      });
    });
  };


  return {
    oninit: ({ attrs }) => {
      // Build internal tree map for efficient lookups
      buildTreeMap(attrs.data, state.treeMap);

      // Initialize expanded nodes from data
      initializeExpandedNodes(attrs.data);

      // Initialize selected nodes from props
      if (attrs.selectedIds) {
        state.selectedIds = new Set(attrs.selectedIds);
      }
    },

    onupdate: ({ attrs }) => {
      // Sync selectedIds prop with internal state
      if (attrs.selectedIds) {
        const newSelection = new Set(attrs.selectedIds);
        if (
          newSelection.size !== state.selectedIds.size ||
          !Array.from(newSelection).every((id) => state.selectedIds.has(id))
        ) {
          state.selectedIds = newSelection;
        }
      }
    },

    view: ({ attrs }) => {
      const { data, className, style, id, selectionMode = 'single', showConnectors = true } = attrs;

      return m(
        'div.tree-view',
        {
          class: [
            className,
            showConnectors && 'show-connectors'
          ].filter(Boolean).join(' ') || undefined,
          style,
          id,
          role: selectionMode === 'multiple' ? 'listbox' : 'tree',
          'aria-multiselectable': selectionMode === 'multiple' ? 'true' : 'false',
        },
        [
          m(
            'ul.tree-root',
            {
              role: 'group',
            },
            renderNodes(data, attrs)
          ),
        ]
      );
    },
  };
};
