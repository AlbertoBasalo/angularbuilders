import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundPage } from './not-found.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: NotFoundPage },
    ]),
  ],
  declarations: [NotFoundPage],
})
export class NotFoundModule {}
