import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { CommonmasterService } from '../../../../services/common/commonmaster.service';
import { ICancelJobReqObj, IJobResponse, IJobsReqObj } from '../../../../models/Dashboard/dashboardInterface';
import { LoaderService } from '../../../../services/loader/loader.service';

@Component({
  selector: 'app-health-table',
  templateUrl: './health-table.component.html',
  styleUrls: ['./health-table.component.scss']
})
export class HealthTableComponent implements OnInit {
  @Input() selectedJobType: string = '';
  @Input() selectedVertical: string = '';
  @Input() selectedCategoryType: string = '';
  @Input() selectedDateRange: any = '';
  @Output() motorJobUpdateEmit = new EventEmitter<any>();



  expandedRow: number = -1
  subscription$: Subscription = new Subscription;
  jobsData: any = []
  isVisisbleAssignJob: boolean = false
  selectedJobData: any = null
  userRole: string = ''
  isVisisbleCancelPopup: boolean = false

  rowsPerPage: number = 10;
  currentPage: number = 0;
  searchText: string = '';
  isVisisbleRelatedData: any;
  openDeletePopUp: boolean = false

  constructor(private dashboardService: DashboardService, private commonService: CommonmasterService, private loaderService: LoaderService) { }


  ngOnInit(): void {
    this.getAssignJobPopupStatus()
    this.commonService.setSessionStorageData()
    this.userRole = this.commonService.sessionStorageData.roleId
    this.getCancelPopupStatus()
    this.getSearchValue();
    this.getRelatedDataStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getJobs()
    if (!changes['selectedCategoryType']['firstChange']) {
      this.currentPage = 0
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  getJobs() {
    this.loaderService.loadingSub.next(true);
    this.commonService.setSessionStorageData()

    let reqObj: IJobsReqObj = {
      JobType: this.selectedJobType,
      Status: this.selectedCategoryType,
      VerticalId: this.selectedJobType === "Motor" ? String(this.selectedVertical) : "",
      StartDate: this.selectedDateRange?.startDate ? this.selectedDateRange?.startDate : "",
      EndDate: this.selectedDateRange?.endDate ? this.selectedDateRange?.endDate : "",
      ZoneId: this.commonService.sessionStorageData.zoneAccessArea === null ||
        this.commonService.sessionStorageData.zoneAccessArea.length === 0 ? [] :
        (this.commonService.sessionStorageData.zoneAccessArea).split(',')
    }

    this.subscription$.add(
      this.dashboardService.fetchJobsByType(reqObj).subscribe((res: any) => {
        this.jobsData = res.jobLists
        this.loaderService.loadingSub.next(false);
      },
      (error: any) => {
        console.log(error);
        this.loaderService.loadingSub.next(false);
      })
    )


  }


  getAssignJobPopupStatus() {
    this.subscription$.add(
      this.dashboardService.isVisibleAssignJob.subscribe((value: any) => {
        this.isVisisbleAssignJob = value.status
        if (value.status === false && value.data != '') {
          this.showToaster(value.data.msg)
          this.replaceNewJobObj(value.data.obj)
          //this.getJobs()
        }
      })
    )
  }

  onPageChange(event: any) {
    this.expandedRow = -1
    this.rowsPerPage = event.rows
    this.currentPage = event.page;
  }

  get visibleRecords() {
    const startIndex = this.currentPage * this.rowsPerPage;
    const endIndex = startIndex + this.rowsPerPage;
    return this.filteredRecords.slice(startIndex, endIndex);
  }

  get filteredRecords() {
    return this.jobsData.filter((record: any) => {
      if (record.CustomerName) {
        return record.CustomerName.toLowerCase().includes(this.searchText.toLowerCase())
      }
    }
    );
  }

  getSearchValue() {
    this.dashboardService.searchInputValue.subscribe((value: any) => {
      this.searchText = value
    })
  }

  openAssignJobPopup(jobObj: any) {
    //this.selectedJobData = {
    //  jobId: jobObj.JobId,
    //  zoneId: "", // Backend Dep.
    //  assignedTo: jobObj.Assigned,
    //  reAssign: jobObj.Assigned === null ? true : false,
    //  activityBy: this.commonService.sessionStorageData.userId
    //}
    this.selectedJobData = jobObj
    this.dashboardService.isVisibleAssignJob.next({data: '', status: true})
  }

  accordionToggle(i: any) {
    this.expandedRow === i ? this.expandedRow = -1 : this.expandedRow = i
  }

  openCancelPopup(jobObj: any) {
    this.selectedJobData = {
      jobId: jobObj.JobId
    }
    this.openDeletePopUp = true;

    //this.dashboardService.isVisisbleCancelPopup.next(true)
  }

  closePopUp() {
    this.openDeletePopUp = false
  }

  cancelJob() {
    let reqObj: ICancelJobReqObj = {
      JobId: this.selectedJobData.jobId,
      CancelledBy: this.commonService.sessionStorageData.userId,
      ReasonOfCancelId: "",
      PPNCategoryId: "",
      GarageTypeId: "",
      CancelRemarks: ""
    }

    this.subscription$.add(
      this.dashboardService.CancelOrder(reqObj).subscribe((res: any) => {
        console.log("UPDATE RES ===>", res)
        if (res.success) {
          let obj = { isMotorJobUpdate: true }
          this.motorJobUpdateEmit.emit(obj)
          let newJobArr = this.jobsData.filter((ele: any) => ele.JobId !== this.selectedJobData.jobId)
          this.jobsData = newJobArr
          this.expandedRow = -1
          this.closePopUp()

        }
      })
    )
  }

  getCancelPopupStatus() {
    this.dashboardService.isVisisbleCancelPopup.subscribe((value: any) => {
      this.isVisisbleCancelPopup = value
      if (value === false) {
        let obj = { isMotorJobUpdate: true }
        this.motorJobUpdateEmit.emit(obj)
        let newJobArr = this.jobsData.filter((ele: any) => ele.JobId !== this.selectedJobData.jobId)
        this.jobsData = newJobArr
        this.expandedRow = -1
      }
    })
  }

  showToaster(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
  }

  replaceNewJobObj(newJobObj: IJobResponse) {
    let objIndex = this.jobsData.findIndex((ele: any) => ele.JobId === newJobObj.JobId)
    if (objIndex != -1) {
      this.jobsData[objIndex] = newJobObj
    }
  }

  getRelatedDataStatus() {
    this.subscription$.add(
      this.dashboardService.isVisisbleRelatedDataPopup.subscribe((value: any) => {
        this.isVisisbleRelatedData = value.status
        console.log('abb',value)
      })
    )
  }
  openRelatedData(item: any) {
    this.selectedJobData = item
    this.dashboardService.isVisisbleRelatedDataPopup.next({ data: '', status: true })
    console.log(item)
  }


  sortJobData(columnName: string) {
    if (columnName === 'JobSubType') {
      this.sortByJobType("asc")
    } else if (columnName === 'City') {
      this.sortByCity("asc")
    } else if (columnName === 'Status') {
      this.sortByStatus("asc")
    } else if (columnName === 'StartSlot') {
      this.sortBySlot("asc")
    }
  }

  sortByJobType(direction: string) {
    this.jobsData.sort((a: any, b: any) => a.JobSubType.localeCompare(b.JobSubType));
  }
  sortByStatus(direction: string) {
    this.jobsData.sort((a: any, b: any) => a.Status.localeCompare(b.Status));
  }

  sortByCity(direction: string) {
    this.jobsData.sort((a: any, b: any) => {
      if (a.City === null && b.City === null) {
        return 0;
      } else if (a.City === null) {
        return 1;
      } else if (b.City === null) {
        return -1;
      } else {
        return a.City.localeCompare(b.City)
      }
    });
  }

  sortBySlot(direction: string) {
    this.jobsData.sort((a: any, b: any) => {
      // Convert date strings to Date objects
      let dateA = new Date(a.StartSlot);
      let dateB = new Date(b.StartSlot);

      // Compare dates
      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }
      return 0;
    });
  }

}
