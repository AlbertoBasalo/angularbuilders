import { TrackEntry, TrackerStore } from '@ab/global';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Notification } from '../models/notification';
@Component({
  selector: 'ab-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  notification$: Observable<Notification>;

  constructor(store: TrackerStore) {
    const error$ = store
      .selectAnyErrors$()
      .pipe(map((trackEntry: TrackEntry) => this.getNotificationForError(trackEntry)));
    const success$ = store.selectAnyBusiness$().pipe(
      map((trackEntry: TrackEntry) => ({
        class: 'is-success',
        message: trackEntry.label || 'Success',
      }))
    );
    this.notification$ = merge(error$, success$);
  }

  private getNotificationForError(trackEntry: TrackEntry): Notification {
    if (trackEntry.event === 'CALLER_FAULT') {
      return {
        class: 'is-warning',
        message: 'Ops, Review your data and retry',
      };
    }
    return {
      class: 'is-danger',
      message: 'Sorry there was an error. We will fix it ASAP!',
    };
  }
}
