import { FormModule } from '@ab/form';
import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactPage } from './contact.page';
import { ContactComponent } from './contact/contact.component';
@NgModule({
  imports: [
    CommonModule,
    FormModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ContactPage },
    ]),
    UiModule,
  ],
  declarations: [ContactPage, ContactComponent],
})
export class ContactModule {}
