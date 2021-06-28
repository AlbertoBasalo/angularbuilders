import { Category } from '@ab/data';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  categories$ = this.service.getCategories$();

  header = {
    heroClass: 'is-primary',
    title: 'The home of the Angular Builders',
    subtitle: 'A site to help you build great applications with Angular',
  };

  constructor(private service: HomeService) {
    this.categories$ = service
      .getCategories$()
      .pipe(switchMap((categoriesAPI) => this.getCategoriesWithCounter$(categoriesAPI)));
  }

  getCategoriesWithCounter$(categories: Category[]) {
    return this.getCountersForEachCategory$(categories).pipe(
      map((counters) => this.fillCategoriesWithCounters(categories, counters)),
      map((categories) =>
        categories.sort((ca, cb) => (cb.resourcesCount || 0) - (ca.resourcesCount || 0))
      )
    );
  }

  getCountersForEachCategory$(categories: Category[]) {
    const countersForEachCategory = categories.map((category) =>
      this.service.getResourceCountByCategoryid$(category.id || '')
    );
    return forkJoin(countersForEachCategory);
  }
  fillCategoriesWithCounters(categories: Category[], counters: number[]): Category[] {
    return categories.map((category: Category, index: number) => ({
      ...category,
      resourcesCount: counters[index],
    }));
  }
}
