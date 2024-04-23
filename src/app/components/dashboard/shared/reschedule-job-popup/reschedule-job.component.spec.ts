import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RescheduleJobComponent } from 'src/app/common/slot-calendar/slot-calendar.component';

describe('RescheduleJobComponent', () => {
  let component: RescheduleJobComponent;
  let fixture: ComponentFixture<RescheduleJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RescheduleJobComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RescheduleJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
