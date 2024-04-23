import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignJobPopupComponent } from './assign-job-popup.component';

describe('AssignJobPopupComponent', () => {
  let component: AssignJobPopupComponent;
  let fixture: ComponentFixture<AssignJobPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignJobPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignJobPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
