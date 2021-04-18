import { TrackerStore } from '@ab/global';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
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

  constructor(private service: HomeService, private tracker: TrackerStore) {
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

  onLeadSend(lead: unknown) {
    this.service.postLead$(lead).subscribe({
      next: () =>
        this.tracker.trackBusiness(
          'FORM_SENT',
          'Thanks for your interest. We will get in contact with you ASAP!'
        ),
      error: () => {},
    });
  }
}
