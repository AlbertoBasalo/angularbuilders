import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ab-ui-message',
  templateUrl: './message.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent {
  @Input() message = { show: true, class: '', header: '', body: '' };
  constructor() {}

  onClose() {
    this.message.show = false;
  }
}
