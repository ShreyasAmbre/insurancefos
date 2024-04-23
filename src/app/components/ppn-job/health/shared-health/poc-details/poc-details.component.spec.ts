import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocDetailsComponent } from './poc-details.component';

describe('PocDetailsComponent', () => {
  let component: PocDetailsComponent;
  let fixture: ComponentFixture<PocDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PocDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PocDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
