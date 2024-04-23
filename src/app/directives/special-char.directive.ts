import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appSpecialChar]'
})
export class SpecialCharDirective {

  @HostListener('keydown', ['$event']) onInput(event: KeyboardEvent) {
    console.log(event.key);
    let input = event.key;
    const forbiddenChars = ['<', '>'];

    if (forbiddenChars.includes(input)) {
      event.preventDefault();
      input = ('');
    }
  }

}
