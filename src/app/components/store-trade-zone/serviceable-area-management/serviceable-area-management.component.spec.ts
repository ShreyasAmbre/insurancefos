import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceableAreaManagementComponent } from './serviceable-area-management.component';

describe('ServiceableAreaManagementComponent', () => {
  let component: ServiceableAreaManagementComponent;
  let fixture: ComponentFixture<ServiceableAreaManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceableAreaManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceableAreaManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
