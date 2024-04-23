import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPrimaryAccessComponent } from './select-primary-access.component';

describe('SelectPrimaryAccessComponent', () => {
  let component: SelectPrimaryAccessComponent;
  let fixture: ComponentFixture<SelectPrimaryAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectPrimaryAccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPrimaryAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
