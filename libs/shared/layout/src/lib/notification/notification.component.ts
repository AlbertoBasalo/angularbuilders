import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { Notification } from '../models/notification';
@Component({
  selector: 'ab-notification',
  templateUrl: './notification.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnChanges {
  @Input() notification: Notification = { class: '', message: '' };

  show$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.show$.next(true);
    timer(3000).subscribe(() => this.onClose());
  }

  onClose() {
    this.show$.next(false);
  }
}
