interface TabData {
  id: number;
  label: string;
  path: string;
}

export interface CustomTabsProps {
  tabs: TabData[];
}
