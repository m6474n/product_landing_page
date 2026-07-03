export type SectionId =
  | 'hero'
  | 'precision'
  | 'engineering'
  | 'cooling'
  | 'performance'
  | 'memory'
  | 'battery'
  | 'display'
  | 'ports'
  | 'final';

export interface SectionContent {
  id: SectionId;
  title: string;
  subtitle?: string;
  description?: string;
}

export interface CalloutPoint {
  id: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  label: string;
  description?: string;
  align: 'left' | 'right' | 'top' | 'bottom';
}
