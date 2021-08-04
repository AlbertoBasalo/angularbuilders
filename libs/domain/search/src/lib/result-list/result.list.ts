import { Resource } from '@ab/data';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ab-result-list',
  templateUrl: './result.list.html',
  styles: [],
})
export class ResultList {
  @Input() resources: Resource[] = [];

  private header = {
    heroClass: 'is-success',
    title: `No resources yet`,
    subtitle: '',
  };

  getHeader() {
    // ToDo: use @Input set instead of this function call
    const header = { ...this.header };
    if (this.resources.length) {
      header.title = `Found ${this.resources.length} resources`;
    }
    return header;
  }
}
