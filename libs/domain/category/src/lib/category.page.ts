import { Header } from '@ab/ui';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CategoryService } from './category.service';
import { Category } from './models/category';
import { Resource } from './models/resource';

@Component({
  templateUrl: './category.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPage implements OnInit {
  private header = {
    heroClass: 'is-primary',
    title: 'Category',
    subtitle: 'loading...',
  };

  header$ = new BehaviorSubject<Header>(this.header);
  categoryResources$!: Observable<{
    category: Category;
    resources: Resource[];
  }>;

  constructor(
    private route: ActivatedRoute,
    private service: CategoryService
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.params.id;
    this.header$.next({ ...this.header, title: categoryId });
    const category$ = this.service.getCategoryById$(categoryId);
    const resources$ = this.service.getResourcesByCategoryId$(categoryId);
    this.categoryResources$ = forkJoin({
      category: category$,
      resources: resources$,
    }).pipe(
      tap((result) =>
        this.header$.next({
          ...this.header,
          title: result.category.name,
          subtitle: result.category.description,
        })
      )
    );
  }
}
