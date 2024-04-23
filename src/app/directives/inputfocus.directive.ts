import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputfocus]'
})
export class InputfocusDirective {
  @HostListener('focus', ['$event'])
  onFocus() {
    console.log("FOCUS ")
    this.el.nativeElement.offsetParent.classList.add('focus', 'onFocused')
  }

  @HostListener('blur', ['$event'])
  onBlur() {
    if ((this.el.nativeElement.value).trim() == '') {
      this.el.nativeElement.offsetParent.classList.remove('onFocused', 'focus');
    }
    else {
      this.el.nativeElement.offsetParent.classList.remove('onFocused');
    }
  }

  constructor(private el: ElementRef) { }

}
