import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountHeaderComponent } from './count-header.component';

describe('CountHeaderComponent', () => {
  let component: CountHeaderComponent;
  let fixture: ComponentFixture<CountHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
