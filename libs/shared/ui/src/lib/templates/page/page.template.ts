import { Component, Input } from '@angular/core';
import { Header } from '../../models/header';

@Component({
  selector: 'ab-ui-page',
  templateUrl: './page.template.html',
  styles: [],
})
export class PageTemplate {
  @Input() header: Header = { title: '', subtitle: '', heroClass: '' };
  constructor() {}
}
