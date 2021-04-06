import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from './category.service';
import { Category } from './model/category';
import { Resource } from './model/resource';

@Component({
  templateUrl: './category.page.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryPage implements OnInit {
  header = {
    heroClass: 'is-primary',
    title: 'The home of the Angular Builders',
    subtitle: 'loading...',
  };
  category!: Category;
  resources$!: Observable<Resource[]>;

  constructor(
    private route: ActivatedRoute,
    private service: CategoryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.params.id;
    this.header.title = categoryId;
    const subscription = this.service.getCategoryById$(categoryId).subscribe({
      next: (category) => {
        this.category = category;
        this.header = {
          ...this.header,
          title: category.name,
          subtitle: category.description,
        };
        this.cdr.markForCheck();
        subscription.unsubscribe();
        this.resources$ = this.service.getResourcesByCategoryId$(categoryId);
      },
    });
  }
}
