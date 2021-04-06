import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryPage } from './category.page';
import { CategoryComponent } from './category/category.component';
import { ResourcesListComponent } from './resources-list/resources-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', pathMatch: 'full', component: CategoryPage },
    ]),
    UiModule,
  ],
  declarations: [CategoryPage, CategoryComponent, ResourcesListComponent],
})
export class CategoryModule {}
