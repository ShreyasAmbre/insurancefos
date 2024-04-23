import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpnSearchHomeComponent } from './ppn-search-home.component';

describe('PpnSearchHomeComponent', () => {
  let component: PpnSearchHomeComponent;
  let fixture: ComponentFixture<PpnSearchHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PpnSearchHomeComponent]
    });
    fixture = TestBed.createComponent(PpnSearchHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
