import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelInfoComponent } from './cancel-info.component';

describe('CancelInfoComponent', () => {
  let component: CancelInfoComponent;
  let fixture: ComponentFixture<CancelInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
