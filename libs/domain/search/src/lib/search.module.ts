import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResultList } from './result-list/result.list';
import { SearchPage } from './search.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: SearchPage },
    ]),
    UiModule,
  ],
  declarations: [SearchPage, ResultList],
})
export class SearchModule {}
