import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let source = value;
    const length = Number.parseInt(args[0] as string) || 30;
    const fromEnd = args[1];
    const toRemove = args[2] as string;
    if (toRemove) {
      source = value.replace(toRemove, '');
    }
    if (source.length <= length) {
      return source;
    } else {
      if (fromEnd) {
        return '...' + source.substring(source.length - length, source.length);
      } else {
        return source.substring(0, length) + '...';
      }
    }
  }
}
