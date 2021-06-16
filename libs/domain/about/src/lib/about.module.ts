import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AboutPage } from './about.page';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: AboutPage },
    ]),
    UiModule,
  ],
  declarations: [AboutPage, AboutComponent],
})
export class AboutModule {}
