import { FormModule } from '@ab/form';
import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseForm } from './course-form/course.form';
import { ResourceNewForm } from './resource-new-form/resource-new.form';
import { ResourceNewPage } from './resource-new.page';

@NgModule({
  imports: [
    CommonModule,
    FormModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ResourceNewPage },
    ]),
    UiModule,
  ],
  declarations: [ResourceNewPage, ResourceNewForm, CourseForm],
})
export class ResourceNewModule {}
