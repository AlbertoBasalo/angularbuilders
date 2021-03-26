import { FormModule } from '@ab/form';
import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { HomePage } from './home.page';
import { LeadForm } from './lead/lead.form';
@NgModule({
  imports: [
    CommonModule,
    FormModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomePage },
    ]),
    UiModule,
  ],
  declarations: [HomePage, CategoriesComponent, LeadForm],
})
export class HomeModule {}
