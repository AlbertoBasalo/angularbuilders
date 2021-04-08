import { ENVIRONMENT } from '@ab/global';
import { LayoutModule } from '@ab/layout';
import { SearchBoxModule } from '@ab/search-box';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { CoreRoutingModule } from './core-routing.module';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [LayoutComponent],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    HttpClientModule,
    LayoutModule,
    SearchBoxModule,
  ],
  exports: [LayoutModule, LayoutComponent],
})
export class CoreModule {}
