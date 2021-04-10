import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TrackCategories, TrackEntry } from './models/trackEntry';
import { Store } from './store';
@Injectable({
  providedIn: 'root',
})
export class TrackerStore {
  private store$: Store<TrackEntry>;

  constructor() {
    this.store$ = new Store<TrackEntry>({ category: 'SYSTEM', action: 'Init' });
  }

  selectActions$() {
    return this.store$.getActions$();
  }
  trackEntry(
    category: TrackCategories,
    action: string,
    label?: string,
    value?: number
  ) {
    const payload: TrackEntry = {
      category: category,
      action: action,
      label: label,
      value: value || new Date().getTime(),
    };
    this.store$.dispatch({ type: 'TRACK_' + category, payload: payload });
  }

  trackError(action: string, label?: string, value?: number) {
    this.trackEntry('ERROR', action, label, value);
  }
  trackSystem(action: string, label?: string, value?: number) {
    this.trackEntry('SYSTEM', action, label, value);
  }
  trackBusiness(action: string, label?: string, value?: number) {
    this.trackEntry('BUSINESS', action, label, value);
  }

  trackHttpError(error: HttpErrorResponse) {
    const errorAction = this.getErrorActionFromStatus(error);
    const errorUrl = error.url || 'unknown';
    this.trackError(errorAction, errorUrl, error.status);
  }
  trackCodeError(error: Error) {
    this.trackError('DEV_FAULT', error.message);
  }
  trackStartSystem(process: string, value?: number) {
    this.trackSystem('START', process, value);
  }
  trackFinishSystem(process: string, value?: number) {
    this.trackSystem('FINISH', process, value);
  }
  trackClickBusiness(element: string, value?: number) {
    this.trackBusiness('CLICK', element, value);
  }
  trackNavBusiness(url: string) {
    this.trackBusiness('NAV', url);
  }

  selectByAction$(action: string) {
    const byAction = (state: TrackEntry) => state.action === action;
    return this.store$.getState$().pipe(filter(byAction));
  }
  selectAuthErrors$(): Observable<TrackEntry> {
    return this.selectByAction$('AUTH_FAULT');
  }
  selectServerErrors$(): Observable<TrackEntry> {
    return this.selectByAction$('SERVER_FAULT');
  }
  selectCallerErrors$(): Observable<TrackEntry> {
    return this.selectByAction$('CALLER_FAULT');
  }
  selectDeveloperErrors$(): Observable<TrackEntry> {
    return this.selectByAction$('DEV_FAULT');
  }
  selectStartSytem$(): Observable<TrackEntry> {
    return this.selectByAction$('START');
  }
  selectFinishSytem$(): Observable<TrackEntry> {
    return this.selectByAction$('FINISH');
  }
  selectNavBusiness$(): Observable<TrackEntry> {
    return this.selectByAction$('NAV');
  }
  selectClickBusiness$(): Observable<TrackEntry> {
    return this.selectByAction$('CLICK');
  }
  selectAnyErrors$(): Observable<TrackEntry> {
    return this.store$
      .getState$()
      .pipe(filter((state: TrackEntry) => state.category === 'ERROR'));
  }

  private getErrorActionFromStatus(error: HttpErrorResponse): string {
    let errorAction = 'CALLER_FAULT';
    if (error.status >= 500) {
      errorAction = 'SERVER_FAULT';
    } else if ([401, 403].includes(error.status)) {
      errorAction = 'AUTH_FAULT';
    }
    return errorAction;
  }
}
