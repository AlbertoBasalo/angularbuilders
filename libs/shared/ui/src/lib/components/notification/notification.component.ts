import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Subject, timer } from 'rxjs';
import { Notification } from '../../models/notification';

@Component({
  selector: 'ab-ui-notification',
  templateUrl: './notification.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationComponent implements OnChanges {
  @Input() notification: Notification = { show: true, class: '', message: '' };
  show$ = new Subject<boolean>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes.notification.currentValue as Notification;
    this.show$.next(change.show);
    if (change.show) {
      timer(3000).subscribe(() => this.onClose());
    }
  }

  onClose() {
    this.notification.show = false;
    this.show$.next(false);
  }
}
