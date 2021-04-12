export interface TrackEntry {
  category: TrackerCategories;
  event: TrackerEvents;
  label?: string;
  value?: number;
}

export type TrackerCategories = 'ERROR' | 'BUSINESS' | 'SYSTEM';
export type TrackerEvents =
  | 'DEV_FAULT'
  | 'AUTH_FAULT'
  | 'SERVER_FAULT'
  | 'CALLER_FAULT'
  | 'NAV'
  | 'CLICK'
  | 'FORM_SENT'
  | 'TRACKER_INIT'
  | 'APP_STARTED'
  | 'START'
  | 'FINISH';
