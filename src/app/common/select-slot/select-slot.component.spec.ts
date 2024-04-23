import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSlotComponent } from './select-slot.component';

describe('SelectSlotComponent', () => {
  let component: SelectSlotComponent;
  let fixture: ComponentFixture<SelectSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSlotComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
