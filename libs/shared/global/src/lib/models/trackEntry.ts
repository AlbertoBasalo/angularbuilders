export interface TrackEntry {
  category: TrackCategories;
  action: string;
  label?: string;
  value?: number;
}

export type TrackCategories = 'ERROR' | 'BUSINESS' | 'SYSTEM';
