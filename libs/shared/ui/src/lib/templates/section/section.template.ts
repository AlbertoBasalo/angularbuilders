import { Component, Input } from '@angular/core';
import { Header } from '../../models/header';

@Component({
  selector: 'ab-ui-section',
  templateUrl: './section.template.html',
  styles: [],
})
export class SectionTemplate {
  @Input() header: Header = { title: '', subtitle: '', heroClass: '' };
  constructor() {}
}
