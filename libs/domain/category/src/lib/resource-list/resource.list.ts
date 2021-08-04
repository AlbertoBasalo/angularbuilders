import { Resource } from '@ab/data';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ab-resource-list',
  templateUrl: './resource.list.html',
  styles: [],
})
export class ResourceList {
  @Input() categoryName = '';
  @Input() resources: Resource[] = [];

  private header = {
    heroClass: 'is-success',
    title: `Loading`,
    subtitle: '  ',
  };

  getHeader() {
    const header = { ...this.header };
    if (this.resources.length) {
      header.title = `Found ${this.resources.length} ${this.categoryName}`;
    } else {
      header.heroClass = 'is-warning';
      header.title = `No ${this.categoryName} yet`;
    }
    return header;
  }
}
