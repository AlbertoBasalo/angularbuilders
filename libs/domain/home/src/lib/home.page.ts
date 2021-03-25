import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  categories$ = this.service.getCategories$();

  constructor(private service: HomeService) {}

  ngOnInit(): void {}
}
