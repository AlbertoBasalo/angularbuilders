import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'ab-form-control',
  templateUrl: './control.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ControlComponent),
      multi: true,
    },
  ],
})
export class ControlComponent implements ControlValueAccessor {
  @Input() form!: FormGroup;
  @Input() formControlName = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type = 'text';
  @Input() options = [{ id: '0', name: 'select one' }];

  value: unknown;
  onChange: any;
  onTouch: any;
  onInput(event: any) {
    this.value = event.target.value;
    this.onTouch();
    this.onChange(this.value);
  }
  onSelectChange(event: any) {
    this.value = event.target.value;
    this.onTouch();
    this.onChange(this.value);
  }
  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  hasErrorToShow() {
    const control = this.form.controls[this.formControlName];
    return control.touched && control.invalid;
  }
  hasError() {
    const control = this.form.controls[this.formControlName];
    return control.invalid;
  }
  getErrorMessage() {
    const control = this.form.controls[this.formControlName];
    return JSON.stringify(control.errors);
  }
}
