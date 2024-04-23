import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpnInspectionComponent } from './ppn-inspection.component';

describe('PpnInspectionComponent', () => {
  let component: PpnInspectionComponent;
  let fixture: ComponentFixture<PpnInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpnInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpnInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
