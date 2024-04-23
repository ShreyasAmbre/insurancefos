import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityCalenderComponent } from './capacity-calender.component';

describe('CapacityCalenderComponent', () => {
  let component: CapacityCalenderComponent;
  let fixture: ComponentFixture<CapacityCalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityCalenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacityCalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
