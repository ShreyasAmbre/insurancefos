import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appMobilenumber]'
})
export class MobilenumberDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    let formattedValue = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (formattedValue.length > 10) {
      formattedValue = formattedValue.substring(0, 10); // Limit to 10 digits
    }
    if (formattedValue.length > 6) {
      formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3, 6)}-${formattedValue.slice(6)}`;
    } else if (formattedValue.length > 3) {
      formattedValue = `${formattedValue.slice(0, 3)}-${formattedValue.slice(3)}`;
    }
    input.value = formattedValue;
  }

}
