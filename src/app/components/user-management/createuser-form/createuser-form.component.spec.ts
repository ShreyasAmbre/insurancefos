import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateuserFormComponent } from './createuser-form.component';

describe('CreateuserFormComponent', () => {
  let component: CreateuserFormComponent;
  let fixture: ComponentFixture<CreateuserFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateuserFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateuserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
