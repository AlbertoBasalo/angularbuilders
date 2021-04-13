import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import {
  TrackEntry,
  TrackerBusinessEvents,
  TrackerCategories,
  TrackerErrorEvents,
  TrackerEvents,
  TrackerSystemEvents,
} from './models/trackEntry';
import { Store } from './store';
@Injectable({
  providedIn: 'root',
})
export class TrackerStore {
  private store$: Store<TrackEntry>;

  constructor() {
    this.store$ = new Store<TrackEntry>({
      category: 'SYSTEM',
      event: 'TRACKER_INIT',
    });
  }

  selectActions$() {
    return this.store$.getActions$();
  }
  trackEntry(
    category: TrackerCategories,
    event: TrackerEvents,
    label?: string,
    value?: number
  ) {
    const payload: TrackEntry = {
      category: category,
      event: event,
      label: label,
      value: value || new Date().getTime(),
    };
    this.store$.dispatch({ type: 'TRACK_' + category, payload: payload });
  }

  trackError(event: TrackerErrorEvents, label?: string, value?: number) {
    this.trackEntry('ERROR', event, label, value);
  }
  trackSystem(event: TrackerSystemEvents, label?: string, value?: number) {
    this.trackEntry('SYSTEM', event, label, value);
  }
  trackBusiness(event: TrackerBusinessEvents, label?: string, value?: number) {
    this.trackEntry('BUSINESS', event, label, value);
  }

  trackHttpError(error: HttpErrorResponse) {
    const errorEvent = this.getErrorEventFromStatus(error);
    const errorUrl = error.url || 'unknown';
    this.trackError(errorEvent, errorUrl, error.status);
  }
  trackCodeError(error: Error) {
    this.trackError('CODE_FAULT', error.message);
  }

  selectByEvent$(event: TrackerEvents) {
    const byEvent = (state: TrackEntry) => state.event === event;
    return this.store$.getState$().pipe(filter(byEvent));
  }

  selectAnyErrors$(): Observable<TrackEntry> {
    return this.store$.getState$().pipe(
      filter((state: TrackEntry) => state.category === 'ERROR'),
      distinctUntilChanged()
    );
  }

  private getErrorEventFromStatus(
    error: HttpErrorResponse
  ): TrackerErrorEvents {
    let errorEvent: TrackerErrorEvents = 'CALLER_FAULT';
    if (error.status >= 500) {
      errorEvent = 'SERVER_FAULT';
    } else if ([401, 403].includes(error.status)) {
      errorEvent = 'AUTH_FAULT';
    }
    return errorEvent;
  }
}
