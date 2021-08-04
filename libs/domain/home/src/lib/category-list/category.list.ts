import { Category } from '@ab/data';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'ab-category-list',
  templateUrl: './category.list.html',
  styles: [],
})
export class CategoryList {
  @Input() categories: Category[] = [];

  getCardFrom(category: Category) {
    return {
      title: category.name,
      description: category.description,
      link: '/category/' + category.id,
    };
  }
}
