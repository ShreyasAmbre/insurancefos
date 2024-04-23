import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PpnCreateJobComponent } from './ppn-create-job.component';

describe('PpnCreateJobComponent', () => {
  let component: PpnCreateJobComponent;
  let fixture: ComponentFixture<PpnCreateJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PpnCreateJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PpnCreateJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
