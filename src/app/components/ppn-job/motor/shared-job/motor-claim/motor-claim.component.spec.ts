import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorClaimComponent } from './motor-claim.component';

describe('MotorClaimComponent', () => {
  let component: MotorClaimComponent;
  let fixture: ComponentFixture<MotorClaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotorClaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotorClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
