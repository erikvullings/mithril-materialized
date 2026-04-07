import { ComponentTypes } from 'mithril';

export type DashboardGroup = 'general' | 'forms' | 'components' | 'display' | 'styling';

export interface IDashboard {
  id: string;
  default?: boolean;
  title: string;
  icon?: string;
  route: string;
  visible: boolean;
  component: ComponentTypes<any, any>;
  group?: DashboardGroup;
}
