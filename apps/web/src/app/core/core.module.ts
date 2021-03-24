import { LayoutModule } from '@ab/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreRoutingModule } from './core-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule, LayoutModule],
  exports: [LayoutModule],
})
export class CoreModule {}
