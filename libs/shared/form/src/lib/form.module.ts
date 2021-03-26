import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ControlComponent } from './components/control/control.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [ControlComponent],
  exports: [ControlComponent, ReactiveFormsModule],
})
export class FormModule {}
