import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  // observable for showing/hiding notification
  show$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.showNotification();
    timer(3000).subscribe(() => this.hideNotification());
  }

  onClose() {
    this.hideNotification();
  }

  private showNotification() {
    this.show$.next(true);
  }
  private hideNotification() {
    this.show$.next(false);
  }
}
