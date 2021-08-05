import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rated',
})
export class RatedPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    return getClass(value);
  }
}

function getClass(rate: number): string {
  const classes = [
    { name: 'is-success', value: 50 },
    { name: 'is-warning', value: 30 },
    { name: 'is-danger', value: 0 },
  ];
  return classes.find((c) => rate >= c.value)?.name || 'is-danger';
}
