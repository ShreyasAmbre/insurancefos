import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchByTextPipe } from './search-by-text.pipe';
import { PhoneMaskingPipe } from './phone-masking.pipe';


@NgModule({
  declarations: [
    SearchByTextPipe,
    PhoneMaskingPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchByTextPipe,
    PhoneMaskingPipe
  ]
})
export class PipesModule { }
