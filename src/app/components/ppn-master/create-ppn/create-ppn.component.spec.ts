import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePPNComponent } from './create-ppn.component';

describe('CreatePPNComponent', () => {
  let component: CreatePPNComponent;
  let fixture: ComponentFixture<CreatePPNComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePPNComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePPNComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
