import { Resource } from '@ab/data';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
@Component({
  selector: 'ab-ui-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceComponent {
  @Input() resource!: Resource;
  constructor() {}
  getCard() {
    return {
      title: this.resource.name,
      description: this.resource.description,
      link: '/resource/' + this.resource.id,
    };
  }
}
