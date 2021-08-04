import { Header } from '@ab/ui';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ab-about',
  templateUrl: './about.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent implements OnInit {
  @Input() header!: Header;
  constructor() {}

  ngOnInit(): void {}
}
