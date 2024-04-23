import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAccessAreaComponent } from './select-access-area.component';

describe('SelectAccessAreaComponent', () => {
  let component: SelectAccessAreaComponent;
  let fixture: ComponentFixture<SelectAccessAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAccessAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAccessAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
