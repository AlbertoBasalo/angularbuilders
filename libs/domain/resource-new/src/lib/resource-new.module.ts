import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResourceNewForm } from './resource-new-form/resource-new.form';
import { ResourceNewPage } from './resource-new.page';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ResourceNewPage },
    ]),
  ],
  declarations: [ResourceNewPage, ResourceNewForm],
})
export class ResourceNewModule {}
