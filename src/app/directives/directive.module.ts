import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommaSeparatedDirectiveTsDirective } from './comma-separated.directive.ts.directive';
import { DigitOnlyDirective } from './digit-only.directive';
import { InputfocusDirective } from './inputfocus.directive';
import { MobilenumberDirective } from './mobilenumber.directive';
import { TouppercaseDirective } from './touppercase.directive';
import { SpecialCharDirective } from './special-char.directive';



@NgModule({
  declarations: [
    CommaSeparatedDirectiveTsDirective,
    DigitOnlyDirective,
    InputfocusDirective,
    MobilenumberDirective,
    TouppercaseDirective,
    SpecialCharDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommaSeparatedDirectiveTsDirective,
    DigitOnlyDirective,
    InputfocusDirective,
    MobilenumberDirective,
    TouppercaseDirective,
    SpecialCharDirective
  ]
})
export class DirectiveModule { }
