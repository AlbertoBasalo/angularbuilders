import { Resource } from '@ab/data';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ab-no-code',
  templateUrl: './no-code.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoCodeComponent {
  @Input() noCode!: Resource;
  constructor() {}
}
