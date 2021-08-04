import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    let source = value;
    const length = Number.parseInt(args[0] as string) || 30;
    const removeFromStart = args[1] as boolean;
    const charsToRemove = args[2] as string;
    const elipsis = args[3] || '...';
    if (charsToRemove) {
      source = source.replace(charsToRemove, '');
    }
    if (source.length <= length) {
      return source;
    } else {
      if (removeFromStart) {
        return elipsis + source.substring(source.length - length, source.length);
      } else {
        return source.substring(0, length) + elipsis;
      }
    }
  }
}
