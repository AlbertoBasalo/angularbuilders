import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Header } from '../../models/header';

@Component({
  selector: 'ab-ui-page',
  templateUrl: './page.template.html',
  styles: [],
})
export class PageTemplate implements OnChanges {
  @Input() header: Header = { title: '', subtitle: '', heroClass: '' };
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes) return;
    this.header.heroClass += ' ';
  }
}
