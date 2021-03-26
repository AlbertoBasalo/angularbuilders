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
  header = {
    heroClass: 'is-danger',
    title: 'Resources for Angular developers',
    subtitle: 'Coming soon...',
  };
  constructor() {}

  ngOnInit(): void {}
}
