import { TrackEntry, TrackerStore } from '@ab/global';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'ab-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  errorMessage$: Observable<TrackEntry>;

  constructor(store: TrackerStore) {
    this.errorMessage$ = store.selectAnyErrors$();
  }

  ngOnInit(): void {}
}
