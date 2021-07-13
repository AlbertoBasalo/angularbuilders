import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rated',
})
export class RatedPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value < 50) {
      return 'is-danger';
    } else if (value < 80) {
      return 'is-warning';
    } else {
      return 'is-success';
    }
  }
}
