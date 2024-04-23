import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpnMasterComponent } from './ppn-master.component';

describe('PpnMasterComponent', () => {
  let component: PpnMasterComponent;
  let fixture: ComponentFixture<PpnMasterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PpnMasterComponent]
    });
    fixture = TestBed.createComponent(PpnMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
