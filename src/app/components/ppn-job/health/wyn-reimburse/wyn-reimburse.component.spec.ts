import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WynReimburseComponent } from './wyn-reimburse.component';

describe('WynReimburseComponent', () => {
  let component: WynReimburseComponent;
  let fixture: ComponentFixture<WynReimburseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WynReimburseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WynReimburseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
