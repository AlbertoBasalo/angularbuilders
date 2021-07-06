import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NpmRegistry } from '../models/npm-registry';

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
