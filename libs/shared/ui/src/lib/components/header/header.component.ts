import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Header } from '../../models/header';

@Component({
  selector: 'ab-ui-header',
  templateUrl: './header.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() header: Header = { title: '', subtitle: '', heroClass: '' };
  constructor() {}
}
