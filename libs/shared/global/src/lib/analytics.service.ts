import { Injectable } from '@angular/core';
import { TrackEntry } from './models/trackEntry';

declare let gtag: (command: string, id: string, event: unknown) => void;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor() {}

  configure(ga: string) {
    gtag('config', ga, {
      send_page_view: false,
    });
  }

  sendNav(page_path: string) {
    gtag('event', 'page_view', {
      page_title: document.title,
      page_location: location.href,
      page_path: page_path,
    });
  }

  sendEvent(trackEntry: TrackEntry) {
    gtag('event', trackEntry.event, {
      event_category: trackEntry.category,
      event_label: trackEntry.label,
      value: trackEntry.value,
    });
  }
}
