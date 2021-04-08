import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Header } from '../../models/header';

@Component({
  selector: 'ab-ui-section',
  templateUrl: './section.template.html',
  styles: [],
})
export class SectionTemplate implements OnChanges {
  @Input() header: Header = { title: '', subtitle: '', heroClass: '' };
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    this.header.heroClass += ' is-small';
  }
}
