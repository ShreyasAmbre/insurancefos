import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WynHospitalComponent } from './wyn-hospital.component';

describe('WynHospitalComponent', () => {
  let component: WynHospitalComponent;
  let fixture: ComponentFixture<WynHospitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WynHospitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WynHospitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
