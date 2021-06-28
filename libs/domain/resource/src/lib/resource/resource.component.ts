import { Resource } from '@ab/data';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ab-resource',
  templateUrl: './resource.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceComponent {
  @Input() resource!: Resource;
}
