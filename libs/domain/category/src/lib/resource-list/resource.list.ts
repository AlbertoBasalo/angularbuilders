import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Resource } from '../model/resource';

@Component({
  selector: 'ab-resource-list',
  templateUrl: './resource.list.html',
  styles: [],
})
export class ResourceList implements OnChanges {
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
