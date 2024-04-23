import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDigitOnly]'
})
export class DigitOnlyDirective {

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    // Allow special keys like Backspace and Delete
    if (event.key === 'Backspace' || event.key === 'Delete') {
      return;
    }

    if (event.key === 'Tab') {
      return
    }

    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      return;
    }

    // Allow digits (0-9)
    const isDigit = /[0-9]/.test(event.key);

    if (!isDigit) {
      event.preventDefault();
    }
  }
}
