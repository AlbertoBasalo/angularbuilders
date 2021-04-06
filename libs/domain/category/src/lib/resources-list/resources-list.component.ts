import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Resource } from '../model/resource';

@Component({
  selector: 'ab-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResourcesListComponent implements OnChanges {
  @Input() categoryName = '';
  @Input() resources: Resource[] = [];

  header = {
    heroClass: 'is-danger',
    title: `Loading...`,
    subtitle: '...',
  };
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.categoryName) {
      this.header = {
        heroClass: 'is-warning',
        title: `List of resources for ${this.categoryName}`,
        subtitle: 'Loading resources...',
      };
    }
    if (changes.resources) {
      this.header = {
        heroClass: 'is-success',
        title: `List of resources for ${this.categoryName}`,
        subtitle: `Found ${this.resources.length} resources`,
      };
    }
  }
  getCardFrom(resource: Resource) {
    return {
      title: resource.name,
      description: resource.description,
      link: '/resource/' + resource.id,
    };
  }
}
