import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpnInfoComponent } from './ppn-info.component';

describe('PpnInfoComponent', () => {
  let component: PpnInfoComponent;
  let fixture: ComponentFixture<PpnInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpnInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpnInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
