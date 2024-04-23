import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpnMapSelectorComponent } from './ppn-map-selector.component';

describe('PpnMapSelectorComponent', () => {
  let component: PpnMapSelectorComponent;
  let fixture: ComponentFixture<PpnMapSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpnMapSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpnMapSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
