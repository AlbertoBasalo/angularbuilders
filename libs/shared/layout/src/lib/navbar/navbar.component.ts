import { TrackerStore } from '@ab/global';
import { Notification } from '@ab/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'ab-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  notification$: Observable<Notification>;

  constructor(store: TrackerStore) {
    // ToDo: create specific notifications by error event kind
    const error$ = store.selectAnyErrors$().pipe(
      map(() => ({
        class: 'is-danger',
        message:
          'There was an error!. Review your data and retry. If persists we will fix it ASAP!',
      }))
    );
    // ToDo: use another store for user notifications
    const success$ = store.selectByEvent$('FORM_SENT').pipe(
      map((trackEntry) => ({
        class: 'is-success',
        message: trackEntry.label || 'Success',
      }))
    );
    this.notification$ = merge(error$, success$);
  }

  ngOnInit(): void {}
}
