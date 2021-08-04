import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aged',
})
export class AgedPipe implements PipeTransform {
  transform(date: Date, ...args: unknown[]): string {
    const age = getDays(new Date(), new Date(date));
    return getClass(age);
  }
}

function getClass(age: number): string {
  const classes = [
    { name: 'is-danger', value: 365 },
    { name: 'is-warning', value: 31 },
    { name: 'is-success', value: 0 },
  ];
  return classes.find((c) => c.value <= age)?.name || 'is-danger';
}

// get days difference between two dates
function getDays(date1: Date, date2: Date): number {
  const diff = Math.abs(date1.getTime() - date2.getTime());
  return Math.round(diff / (1000 * 60 * 60 * 24));
}
