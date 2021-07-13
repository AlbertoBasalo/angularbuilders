import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aged',
})
export class AgedPipe implements PipeTransform {
  transform(date: Date, ...args: unknown[]): string {
    const age = getDays(new Date(), new Date(date));
    if (age > 365) {
      return 'is-danger';
    } else if (age > 31) {
      return 'is-warning';
    } else {
      return 'is-success';
    }
  }
}
// get days difference between two dates
function getDays(date1: Date, date2: Date): number {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.round(diff / (1000 * 60 * 60 * 24));
}
