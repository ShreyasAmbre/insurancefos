import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeZoneDashboardComponent } from './trade-zone-dashboard.component';

describe('TradeZoneDashboardComponent', () => {
  let component: TradeZoneDashboardComponent;
  let fixture: ComponentFixture<TradeZoneDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeZoneDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeZoneDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
