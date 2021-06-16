import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryList } from './category-list/category.list';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomePage },
    ]),
    UiModule,
  ],
  declarations: [HomePage, CategoryList],
})
export class HomeModule {}
