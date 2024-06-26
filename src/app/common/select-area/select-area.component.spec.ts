import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAreaComponent } from './select-area.component';

describe('SelectAreaComponent', () => {
  let component: SelectAreaComponent;
  let fixture: ComponentFixture<SelectAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAreaComponent]
    });
    fixture = TestBed.createComponent(SelectAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
