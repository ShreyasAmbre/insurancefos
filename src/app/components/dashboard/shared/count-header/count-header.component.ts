import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import { CommonmasterService } from '../../../../services/common/commonmaster.service';
import { ICountReqObj } from '../../../../models/Dashboard/dashboardInterface';
import { LoaderService } from '../../../../services/loader/loader.service';

@Component({
  selector: 'app-count-header',
  templateUrl: './count-header.component.html',
  styleUrls: ['./count-header.component.scss']
})
export class CountHeaderComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedJobType: string = '';
  @Input() selectedVertical: string = '';
  @Output() selectedCatEmit = new EventEmitter<any>();
  @Input() selectedDateRange: any = '';
  @Input() motorJobUpdated: any = '';
  

  subscription$: Subscription = new Subscription;
  motorJobCategory = [
    { category: "Active", name: "Active jobs", count: "0", iconclass: "all-job", isVisible: "both"},
    { category: "Done", name: "Done jobs", count: "0", iconclass: "done-jobs", isVisible: "both" },
    { category: "FirstContact", name: "First contact", count: "0", iconclass: "first-contact", isVisible: "Motor" },
    { category: "Assigned", name: "Assignment", count: "0", iconclass: "assignment", isVisible: "both" },
    { category: "NotAssigned", name: "Pickup pending", count: "0", iconclass: "pickup-pending", isVisible: "both" },
    { category: "OnJobs", name: "On jobs", count: "0", iconclass: "on-jobs", isVisible: "hide" },
    { category: "Cancelled", name: "Cancel jobs", count: "0", iconclass: "cancle-job", isVisible: "both" },
  ]
  selectedCategory: string = 'Active'
  jobtype: string = "Motor"

  constructor(private dashboardService: DashboardService, private commonService: CommonmasterService, private loaderService: LoaderService) { }
    
  ngOnInit(): void {
    this.getAccessAreaStatus()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getAllCounts()
    console.log("MOTOR JOB ===>", this.motorJobUpdated)

  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  getAllCounts() {
    this.commonService.setSessionStorageData()

    let reqObj: ICountReqObj = {
      JobType: this.selectedJobType,
      VerticalId: this.selectedJobType === "Motor" ? String(this.selectedVertical) : "",
      StartDate: this.selectedDateRange?.startDate ? this.selectedDateRange?.startDate : '',
      EndDate: this.selectedDateRange?.endDate ? this.selectedDateRange.endDate : '',
      ZoneId: this.commonService.sessionStorageData.zoneAccessArea === null ||
        this.commonService.sessionStorageData.zoneAccessArea.length === 0 ? [] :
        (this.commonService.sessionStorageData.zoneAccessArea).split(',')
    }
    this.subscription$.add(
      this.dashboardService.GetJobCount(reqObj).subscribe((res: any) => {
        console.log("COUNT RES ===>", res, this.selectedJobType)
        this.motorJobCategory.forEach((ele: any, index: number) => {
          if (ele["category"] === Object.keys(res)[index]) {
             ele["count"] = Object.values(res)[index]
          }
        })
        this.loaderService.loadingSub.next(false);
        console.log("COUNT RES ===>", res, this.motorJobCategory)

      },
       (err: any) => {
          console.log(err)
          this.loaderService.loadingSub.next(false);
        }
      ),
    )
  }

  selectCategory(category: string) {
    this.selectedCategory = category
    this.selectedCatEmit.emit(this.selectedCategory)
  }

  getAccessAreaStatus() {
    this.subscription$.add(
      this.dashboardService.isAccessAreaClosed.subscribe((value: any) => {
        if (value) {
          this.getAllCounts()
        }
      })
    )
  }

}
