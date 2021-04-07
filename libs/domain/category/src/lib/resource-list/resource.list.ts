import { Component, Input } from '@angular/core';
import { Resource } from '../models/resource';

@Component({
  selector: 'ab-resource-list',
  templateUrl: './resource.list.html',
  styles: [],
})
export class ResourceList {
  @Input() categoryName = '';
  @Input() resources: Resource[] = [];

  private header = {
    heroClass: 'is-warning',
    title: `...`,
    subtitle: ' No resources yet ',
  };

  getHeader() {
    const header = { ...this.header };
    if (this.categoryName) {
      header.title = `List of resources for ${this.categoryName}`;
    }
    if (this.resources.length) {
      header.subtitle = `Found ${this.resources.length} resources`;
    }
    return header;
  }
  getCardFrom(resource: Resource) {
    return {
      title: resource.name,
      description: resource.description,
      link: '/resource/' + resource.id,
    };
  }
}
