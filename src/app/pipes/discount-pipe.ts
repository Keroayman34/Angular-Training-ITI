import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
})
export class DiscountPipe implements PipeTransform {
  transform(price: number, discount: number = 10): number {
    const finalPrice = price - (price * discount) / 100;

    return finalPrice;
  }
}
