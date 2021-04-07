import { Component, Input } from '@angular/core';
import { Category } from '../model/category';

@Component({
  selector: 'ab-category-list',
  templateUrl: './category.list.html',
  styles: [],
})
export class CategoryList {
  @Input() categories: Category[] = [];
  header = {
    heroClass: 'is-danger',
    title: 'Resources for Angular developers',
    subtitle: 'Coming soon...',
  };
  getCardFrom(category: Category) {
    return {
      title: category.name,
      description: category.description,
      link: '/category/' + category.id,
    };
  }
}
