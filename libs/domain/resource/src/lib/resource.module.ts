import { UiModule } from '@ab/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResourcePage } from './resource.page';
import { ResourceComponent } from './resource/resource.component';
import { GithubComponent } from './github/github.component';
import { NoCodeComponent } from './no-code/no-code.component';
import { NpmComponent } from './npm/npm.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: ':id', pathMatch: 'full', component: ResourcePage },
    ]),
    UiModule,
  ],
  declarations: [ResourcePage, ResourceComponent, GithubComponent, NoCodeComponent, NpmComponent],
})
export class ResourceModule {}
