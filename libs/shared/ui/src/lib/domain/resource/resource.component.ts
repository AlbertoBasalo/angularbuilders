import { Resource } from '@ab/data';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Card } from '../../models/card';
@Component({
  selector: 'ab-ui-resource-card',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourceComponent {
  @Input()
  set resource(value: Resource) {
    this.card = {
      title: value.name,
      description: value.description,
      link: '/resource/' + value.id,
    };
  }

  public card: Card | undefined;

  constructor() {}
}
