import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'ab-categories',
  templateUrl: './categories.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesComponent implements OnInit {
  @Input() categories: any = {};
  constructor() {}

  ngOnInit(): void {}
}
