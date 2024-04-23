import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpnPickupComponent } from './ppn-pickup.component';

describe('PpnPickupComponent', () => {
  let component: PpnPickupComponent;
  let fixture: ComponentFixture<PpnPickupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpnPickupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpnPickupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
