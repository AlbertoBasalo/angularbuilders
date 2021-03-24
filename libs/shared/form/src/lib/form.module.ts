import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlComponent } from './components/control/control.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ControlComponent],
  exports: [ControlComponent],
})
export class FormModule {}
