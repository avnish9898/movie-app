import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortend',
})
export class ShortendPipe implements PipeTransform {
  transform(value: string, limit: number): unknown {
    if (value.length > limit) {
      return value.substring(0, limit) + '...';
    }
    return value;
  }
}
