import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  categories$!: Observable<any[]>;
  constructor(private service: HomeService) {}

  ngOnInit(): void {
    this.categories$ = this.service.getCategories$();
  }
}
