import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Resource } from '../models/resource';

@Component({
  selector: 'ab-resource',
  templateUrl: './resource.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceComponent {
  @Input() resource!: Resource;
}
