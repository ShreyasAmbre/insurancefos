import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTouppercase]'
})
export class TouppercaseDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value.toUpperCase();
    inputElement.value = inputValue;
  }
}
