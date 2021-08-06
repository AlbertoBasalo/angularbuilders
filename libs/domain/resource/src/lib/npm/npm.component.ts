import { NpmRegistry } from '@ab/data';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ab-npm',
  templateUrl: './npm.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NpmComponent {
  @Input() npmRegistry!: NpmRegistry;
  constructor() {}
}
