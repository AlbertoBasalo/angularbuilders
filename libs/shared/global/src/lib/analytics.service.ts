import { Inject, Injectable } from '@angular/core';
import { ENVIRONMENT } from './global.tokens';
import { Environment } from './models/environment';
import { TrackEntry } from './models/trackEntry';
import { TrackerStore } from './tracker.store';

declare let gtag: (command: string, id: string, event: unknown) => void;

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  constructor(
    @Inject(ENVIRONMENT) private readonly environment: Environment,
    private readonly tracker: TrackerStore
  ) {}

  activate() {
    gtag('config', this.environment.ga, {
      send_page_view: false,
    });
    this.tracker.selectNavBusiness$().subscribe({
      next: (trackEntry) => this.sendNav(trackEntry.label || ''),
    });
    this.tracker.selectClickBusiness$().subscribe({
      next: (trackEntry) => this.sendEvent(trackEntry),
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
    gtag('event', trackEntry.action, {
      event_category: trackEntry.category,
      event_label: trackEntry.label,
      value: trackEntry.value,
    });
  }
}
