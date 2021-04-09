import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TrackEntry } from './models/trackEntry';
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

  trackHttpError(error: HttpErrorResponse) {
    const actionType = 'TRACK_HTTP_ERROR';
    let errorAction = 'CALLER_FAULT';
    if (error.status >= 500) {
      errorAction = 'SERVER_FAULT';
    } else if ([401, 403].includes(error.status)) {
      errorAction = 'AUTH_FAULT';
    }
    const payload = {
      category: 'ERROR',
      action: errorAction,
      label: error.url || 'unknown',
      value: error.status,
    };
    this.store$.dispatch({ type: actionType, payload: payload });
  }
  selectAuthErrors$(): Observable<TrackEntry> {
    const authOnly = (state: TrackEntry) => state.action === 'AUTH_FAULT';
    return this.store$.getState$().pipe(filter(authOnly));
  }
  selectServerErrors$(): Observable<TrackEntry> {
    const serverOnly = (state: TrackEntry) => state.action === 'SERVER_FAULT';
    return this.store$.getState$().pipe(filter(serverOnly));
  }
  selectClientErrors$(): Observable<TrackEntry> {
    const clientOnly = (state: TrackEntry) => state.action === 'CLIENT_FAULT';
    return this.store$.getState$().pipe(filter(clientOnly));
  }

  trackError(error: Error) {
    const actionType = 'TRACK_ERROR';
    const payload = {
      category: 'ERROR',
      action: 'DEV_FAULT',
      label: error.message,
      value: new Date().getTime(),
    };
    this.store$.dispatch({ type: actionType, payload: payload });
  }
  selectDeveloperErrors$(): Observable<TrackEntry> {
    const devOnly = (state: TrackEntry) => state.action === 'DEV_FAULT';
    return this.store$.getState$().pipe(filter(devOnly));
  }

  trackSystem(action: string, label?: string, value?: number) {
    const actionType = 'TRACK_SYTEM';
    const payload: TrackEntry = {
      category: 'SYSTEM',
      action: action,
      label: label,
      value: value,
    };
    this.store$.dispatch({ type: actionType, payload: payload });
  }

  trackStartSystem(label?: string, value?: number) {
    const actionType = 'TRACK_SYTEM';
    const payload: TrackEntry = {
      category: 'SYSTEM',
      action: 'START',
      label: label,
      value: value || new Date().getTime(),
    };
    this.store$.dispatch({ type: actionType, payload: payload });
  }
  selectStartSytem$(): Observable<TrackEntry> {
    const startOnly = (state: TrackEntry) => state.action === 'START';
    return this.store$.getState$().pipe(filter(startOnly));
  }

  trackFinishSystem(label?: string, value?: number) {
    const actionType = 'TRACK_SYTEM';
    const payload: TrackEntry = {
      category: 'SYSTEM',
      action: 'FINISH',
      label: label,
      value: value || new Date().getTime(),
    };
    this.store$.dispatch({ type: actionType, payload: payload });
  }
  selectFinishSytem$(): Observable<TrackEntry> {
    const startOnly = (state: TrackEntry) => state.action === 'FINISH';
    return this.store$.getState$().pipe(filter(startOnly));
  }

  trackBusiness(action: string, label?: string, value?: number) {
    const actionType = 'TRACK_BUSSINESS';
    const payload: TrackEntry = {
      category: 'BUSINESS',
      action: action,
      label: label,
      value: value,
    };
    this.store$.dispatch({ type: actionType, payload: payload });
  }
  trackClickBusiness(label?: string, value?: number) {
    const actionType = 'TRACK_BUSSINESS';
    const payload: TrackEntry = {
      category: 'BUSINESS',
      action: 'CLICK',
      label: label,
      value: value,
    };
    this.store$.dispatch({ type: actionType, payload: payload });
  }
}
