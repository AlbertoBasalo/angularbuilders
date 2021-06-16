import { ChangeDetectionStrategy, Component } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HomeService } from './home.service';
import { Category } from './models/category';

@Component({
  templateUrl: './home.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  categories$ = this.service.getCategories$().pipe();

  header = {
    heroClass: 'is-primary',
    title: 'The home of the Angular Builders',
    subtitle: 'A site to help you build great applications with Angular',
  };

  constructor(private service: HomeService) {
    this.categories$ = service
      .getCategories$()
      .pipe(
        switchMap((categoriesAPI) =>
          this.getCategoriesWithCounter$(categoriesAPI)
        )
      );
  }

  getCategoriesWithCounter$(categories: Category[]) {
    return this.getCounters$(categories).pipe(
      map((counters) => this.fillCategoriesWithCounters(categories, counters))
    );
  }

  getCounters$(categories: Category[]) {
    const counters$: Observable<number>[] = categories.map((category) =>
      this.service.getResourceCountByCategoryid$(category.id || '')
    );
    return forkJoin(counters$);
  }
  fillCategoriesWithCounters(categories: Category[], counters: number[]) {
    return categories.map((category: Category, index: number) => {
      const count = counters[index];
      return { ...category, count: count };
    });
  }
}
