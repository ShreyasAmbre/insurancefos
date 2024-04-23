import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateassetFormComponent } from './createasset-form.component';

describe('CreateassetFormComponent', () => {
  let component: CreateassetFormComponent;
  let fixture: ComponentFixture<CreateassetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateassetFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateassetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
