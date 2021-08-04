import { AbstractControl } from '@angular/forms';

type functionValidator = (control: AbstractControl) => any | null;

export abstract class ABValidators {
  static includes(expected: string): functionValidator {
    return function (control: AbstractControl): any | null {
      const value = control.value as string;
      if (value?.toLocaleLowerCase().includes(expected.trim().toLocaleLowerCase())) {
        return null;
      } else {
        return { includes: expected + ' not found' };
      }
    };
  }
}
