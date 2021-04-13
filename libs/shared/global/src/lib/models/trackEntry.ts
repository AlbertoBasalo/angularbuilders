export interface TrackEntry {
  category: TrackerCategories;
  event: TrackerEvents;
  label?: string;
  value?: number;
}

export type TrackerCategories = 'ERROR' | 'BUSINESS' | 'SYSTEM';

export type TrackerErrorEvents =
  | 'CODE_FAULT'
  | 'AUTH_FAULT'
  | 'SERVER_FAULT'
  | 'CALLER_FAULT';

export type TrackerBusinessEvents =
  | 'NAV'
  | 'CLICK'
  | 'FORM_SENT'
  | 'USER_ADDED'
  | 'RESOURCE_ADDED';

export type TrackerSystemEvents =
  | 'TRACKER_INIT'
  | 'APP_STARTED'
  | 'PROCESS_START'
  | 'PORCESS_FINISH';

export type TrackerEvents =
  | TrackerErrorEvents
  | TrackerBusinessEvents
  | TrackerSystemEvents;
