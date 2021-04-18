import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ab-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  constructor() {}
}
