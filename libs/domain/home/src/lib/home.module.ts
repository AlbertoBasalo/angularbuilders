import { FormModule } from '@ab/form';
import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryList } from './category/category.list';
import { HomePage } from './home.page';
import { LeadForm } from './lead/lead.form';
import { PromoComponent } from './promo/promo.component';
@NgModule({
  imports: [
    CommonModule,
    FormModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: HomePage },
    ]),
    UiModule,
  ],
  declarations: [HomePage, LeadForm, PromoComponent, CategoryList],
})
export class HomeModule {}
