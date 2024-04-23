import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacityHomeComponent } from './capacity-home.component';

describe('CapacityHomeComponent', () => {
  let component: CapacityHomeComponent;
  let fixture: ComponentFixture<CapacityHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapacityHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapacityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
