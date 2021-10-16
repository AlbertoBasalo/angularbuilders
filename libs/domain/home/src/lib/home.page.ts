import { Category } from '@ab/data';
import { SeoService } from '@ab/global';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HomeService } from './home.service';

@Component({
  templateUrl: './home.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  categories$ = this.service.getCategories$();
  header = {
    heroClass: 'is-info',
    title: `The home of resources for Angular Builders like you`,
    subtitle: 'A site to help you build great applications with Angular',
  };

  constructor(private service: HomeService, seo: SeoService) {
    seo.updateSeoTags({ });
    this.categories$ = service
      .getCategories$()
      .pipe(switchMap((categoriesAPI) => this.getCategoriesWithCounter$(categoriesAPI)));
  }

  getCategoriesWithCounter$(categories: Category[]) {
    return this.getCountersForEachCategory$(categories).pipe(
      tap((counters) => {
        const resourceCounter = counters.reduce((accumulator, current) => accumulator + current, 0);
        this.header = {...this.header, title: `The home of ${resourceCounter} resources for Angular Builders like you.`};
    }),
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
