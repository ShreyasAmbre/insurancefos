import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementHomeComponent } from './user-management-home.component';

describe('UserManagementHomeComponent', () => {
  let component: UserManagementHomeComponent;
  let fixture: ComponentFixture<UserManagementHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserManagementHomeComponent]
    });
    fixture = TestBed.createComponent(UserManagementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
