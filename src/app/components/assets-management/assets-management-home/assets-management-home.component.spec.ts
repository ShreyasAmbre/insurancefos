import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsManagementHomeComponent } from './assets-management-home.component';

describe('AssetsManagementHomeComponent', () => {
  let component: AssetsManagementHomeComponent;
  let fixture: ComponentFixture<AssetsManagementHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsManagementHomeComponent]
    });
    fixture = TestBed.createComponent(AssetsManagementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
