import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMasking'
})
export class PhoneMaskingPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    // Assuming the input value is a 10-digit phone number
    const formattedNumber = value.replace(/(\d{1})(\d{5})(\d{4})/, '$1*****$3');
    return formattedNumber;
  }

}
