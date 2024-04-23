import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotCalendarComponent } from './slot-calendar.component';

describe('SlotCalendarComponent', () => {
  let component: SlotCalendarComponent;
  let fixture: ComponentFixture<SlotCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotCalendarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlotCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
