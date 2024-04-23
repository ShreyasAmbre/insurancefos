import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-date-range-selector',
  templateUrl: './date-range-selector.component.html',
  styleUrls: ['./date-range-selector.component.scss']
})
export class DateRangeSelectorComponent implements OnInit {
  @Output() selectedDateEmit = new EventEmitter<any>();

  startDate: any = ''
  endDate: any = ''

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

  closePopup(data:any) {
    this.dashboardService.isVisisbleDateSelector.next({data: data, status: false})
  }

  submitDateRange() {
    let dateRange = {
      startDate: format(this.startDate, 'yyyy-MM-dd'),
      endDate: format(this.endDate, 'yyyy-MM-dd'),
    }
    this.selectedDateEmit.emit(dateRange)
    this.closePopup(dateRange)
  }



}
