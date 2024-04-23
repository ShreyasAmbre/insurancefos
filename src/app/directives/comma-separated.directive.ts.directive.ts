import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCommaSeparatedDirectiveTs]'
})
export class CommaSeparatedDirectiveTsDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: any): void {
    let value = event.target.value;

    // Remove non-numeric characters
    value = value.replace(/[^0-9]/g, '');

    // Add commas after every group of 6 digits
    const regex = /(\d{6})/g;
    value = value.replace(regex, '$1,');

    // Update the input value
    this.el.nativeElement.value = value;
  }

}
