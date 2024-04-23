import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerHealthInfoComponent } from './customer-health-info.component';

describe('CustomerHealthInfoComponent', () => {
  let component: CustomerHealthInfoComponent;
  let fixture: ComponentFixture<CustomerHealthInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerHealthInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerHealthInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
