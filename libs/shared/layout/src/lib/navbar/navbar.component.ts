import { TrackerStore } from '@ab/global';
import { Notification } from '@ab/layout';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.notification$ = store.selectAnyErrors$().pipe(
      map((trackEntry) => ({
        class: 'is-danger',
        message: trackEntry.action + ' ' + (trackEntry.label || ''),
      }))
    );
  }

  ngOnInit(): void {}
}
