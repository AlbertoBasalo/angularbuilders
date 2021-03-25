import { ENVIRONMENT } from '@ab/global';
import { LayoutModule } from '@ab/layout';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
  imports: [CommonModule, CoreRoutingModule, HttpClientModule, LayoutModule],
  exports: [LayoutModule],
})
export class CoreModule {}
