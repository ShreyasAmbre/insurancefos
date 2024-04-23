import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpnDropComponent } from './ppn-drop.component';

describe('PpnDropComponent', () => {
  let component: PpnDropComponent;
  let fixture: ComponentFixture<PpnDropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpnDropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpnDropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
