import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import { CommonmasterService } from '../../../../services/common/commonmaster.service';
import { Dropdown } from 'primeng/dropdown';
import { PpncreatejobService } from '../../../../services/ppnjob/ppncreatejob.service';
import { motorJobResponseUiModel } from '../../../../models/PPNJob/ppnjobInterface';
import { IJobResponse, IJobsReqObj } from '../../../../models/Dashboard/dashboardInterface';
import { LoaderService } from '../../../../services/loader/loader.service';

@Component({
  selector: 'app-motor-table',
  templateUrl: './motor-table.component.html',
  styleUrls: ['./motor-table.component.scss']
})
export class MotorTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('InstaspectStatusInput') InstaspectStatusInput!: Dropdown;
  @ViewChild('FirstContactInput') FirstContactInput!: Dropdown;
  @ViewChild('InstaSrcInput') InstaSrcInput!: Dropdown;
  @Input() selectedJobType: string = '';
  @Input() selectedVertical: string = '';
  @Input() selectedCategoryType: string = '';
  @Input() selectedDateRange = { startDate: '', endDate: '' };
  @Output() motorJobUpdateEmit = new EventEmitter<any>();
  showReschedulePopup:boolean=false

  expandedRow: number = -1
  firstContact = [
    { label: "Not Contacted (Default)", value: "1" },
    { label: "Contacted", value: "2" },
   
  ]
  instaspect = [
    { label: "Done", value: "1" },
    { label: "Pending", value: "2" },
  ]
  instaspectSource = [
    { label: "Not Contacted (Default)", value: "1" },
    { label: "Garage Person", value: "2" },
    { label: "Completed", value: "3" },
    { label: "Other", value: "4" },
  ]

  subscription$: Subscription = new Subscription;
  jobsData: any = []
  //jobsDataOG: any[] = []
  isVisisbleAssignJob: boolean = false
  isVisisbleCancelPopup: boolean = false
  selectedJobData: any = {}
  firstContactStatus:any = ""
  instaspectStatus:any = ""
  instaspectSrc:any = ""
  searchText: string = '';
  toasterStatus: boolean = false
  startDate = ''
  endDate = ''
  userRole: string = ''
  zoneData: any;
  showSlotCalendar: any =false;
  selectedSlotData: any ;
  
  rowsPerPage: number = 10;
  currentPage: number = 0;
  jobData: motorJobResponseUiModel
  isVisisbleRelatedData: boolean = false

  constructor(private dashboardService: DashboardService, private commonService: CommonmasterService, private loaderService: LoaderService) { }
    
  ngOnInit(): void {
    this.getAssignJobPopupStatus();
    this.getCancelPopupStatus();
    this.getToasterStatus();
    this.getAccessAreaStatus();
    this.userRole = this.commonService.sessionStorageData.roleId
    this.getSearchValue();
    this.getRelatedDataStatus();
    this.getReschedulePopupStatus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getJobs()
    this.expandedRow = -1
    if (!changes['selectedCategoryType']['firstChange']) {
      this.currentPage = 0
    }
  }

  ngOnDestroy(): void {
    this.dashboardService.isVisibleAssignJob.next({ data: "", status: false })
    this.subscription$.unsubscribe()
  }

  getJobs() {
    this.loaderService.loadingSub.next(true);
    this.commonService.setSessionStorageData()

    let reqObj: IJobsReqObj = {
      JobType: this.selectedJobType,
      Status: this.selectedCategoryType,
      VerticalId: this.selectedJobType === "Motor" ? String(this.selectedVertical) : "",
      StartDate: this.selectedDateRange?.startDate ? this.selectedDateRange?.startDate : '',
      EndDate: this.selectedDateRange?.endDate ? this.selectedDateRange.endDate : '',
      ZoneId: this.commonService.sessionStorageData.zoneAccessArea === null ||
        this.commonService.sessionStorageData.zoneAccessArea.length === 0 ? [] :
        (this.commonService.sessionStorageData.zoneAccessArea).split(',')
    }
    this.subscription$.add(
      this.dashboardService.fetchJobsByType(reqObj).subscribe((res: any) => {
        this.jobsData = res.jobLists;
        this.loaderService.loadingSub.next(false);
      },
      (error: any) => {
        console.log(error);
        this.jobsData = []
        this.loaderService.loadingSub.next(false);
      },))
    
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
    return this.jobsData.filter((record:any) => {
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



  openAssignJobPopup(jobObj:any) {
    //this.selectedJobData = {
    //  jobId: jobObj.JobId,
    //  zoneId: jobObj.ZoneId,
    //  assignedTo: jobObj.Assigned,
    //  reAssign: jobObj.Assigned === null ? false : true,
    //  starteDate: jobObj.StartSlot,
    //  endDate: jobObj.EndSlot,
    //  activityBy: this.commonService.sessionStorageData.userId
    //}
    this.selectedJobData = jobObj
    this.dashboardService.isVisibleAssignJob.next({ data: "", status: true } )
  }

  openCancelPopup(jobObj: any) {
    this.selectedJobData = {
      jobId: jobObj.JobId
    } 
    this.dashboardService.isVisisbleCancelPopup.next(true)
  }

  getAssignJobPopupStatus() {
    this.subscription$.add(
      this.dashboardService.isVisibleAssignJob.subscribe((value: any) => {
        this.isVisisbleAssignJob = value.status
        if (value.status === false && typeof value.data == 'object') {
          this.showToaster(value.data.msg)
          this.replaceNewJobObj(value.data.obj)
          //this.getJobs()
          let obj = { isMotorJobUpdate: true }
          this.motorJobUpdateEmit.emit(obj)
        }
      })
    )
  }
  getReschedulePopupStatus() {
    this.subscription$.add(
      this.dashboardService.isRescheduleSlotPopup.subscribe((value: any) => {
        this.showReschedulePopup = value.status
        if (value.status === false && typeof value.data == 'object') {
          this.showToaster(value.data.msg)
          this.replaceNewJobObj(value.data.obj)
        }
      })
    )
  }

  getCancelPopupStatus() {
    this.subscription$.add(
      this.dashboardService.isVisisbleCancelPopup.subscribe((value: any) => {
        this.isVisisbleCancelPopup = value
        console.log("CANCEL ORDER ===>", value)
        if (value === false) {
          let obj = { isMotorJobUpdate: true }
          this.motorJobUpdateEmit.emit(obj)
          let newJobArr = this.jobsData.filter((ele:any) => ele.JobId !== this.selectedJobData.jobId)
          this.jobsData = newJobArr
          this.expandedRow = -1
        }
      })
    )
  }

  updateMotorSubDetails(jobObj: any, index:any) {
    let reqObj = {
      JobId: jobObj.JobId,
      JobProductType: "Motor",
      FirstContactStatus: this.firstContactStatus,
      InstaspectStatus: this.instaspectStatus,
      InstaspectSource: this.instaspectSrc,
      ModifiedBy: this.commonService.sessionStorageData.userId
    }

    this.subscription$.add(
      this.dashboardService.UpdateSubMotorJobDetails(reqObj).subscribe((res: any) => {
        console.log("UPDATE RES ===>", res)
        this.showToaster("Job Updated Sucessfully")
        this.accordionToggle(index)
        this.getJobs()
        let obj = {isMotorJobUpdate: true}
        this.motorJobUpdateEmit.emit(obj)
      })
    )
  }

  accordionToggle(i: any) {
    this.expandedRow === i ? this.expandedRow = -1 : this.expandedRow = i

    this.firstContactStatus = this.jobsData[i]['FirstContactStatus'] || this.jobsData[i]['FirstContactStatus'] != null ?
      this.jobsData[i]['FirstContactStatus'] : ""

    this.instaspectStatus = this.jobsData[i]['InstaspectStatus'] || this.jobsData[i]['InstaspectStatus'] != null ?
      this.jobsData[i]['InstaspectStatus'] : ""
    
    this.instaspectSrc = this.jobsData[i]['InstaspectSource'] || this.jobsData[i]['InstaspectSource'] != null ?
      this.jobsData[i]['InstaspectSource'] : ""


    console.log("VALUESSSS =>", this.firstContactStatus, this.instaspectStatus, this.instaspectSrc)
    this.InstaspectStatusInput.focus();
    this.FirstContactInput.focus();
    this.InstaSrcInput.focus();
  }

  getToasterStatus() {
    this.subscription$.add(
      this.commonService.userPopup.subscribe((value: any) => {
        this.toasterStatus = value.status
      })
    )
  }

  showToaster(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
  }

  getAccessAreaStatus() {
    this.subscription$.add(
      this.dashboardService.isAccessAreaClosed.subscribe((value: any) => {
        if (value) {
          this.getJobs()
        }
      })
    )
  } 

  getRelatedDataStatus() {
    this.subscription$.add(
      this.dashboardService.isVisisbleRelatedDataPopup.subscribe((value: any) => {
        this.isVisisbleRelatedData = value.status
      })
    )
  }
  openRelatedData(item: any) {
    this.selectedJobData = item
    this.dashboardService.isVisisbleRelatedDataPopup.next({ data: '', status: true })
  }

  openRescheduleSlot(item: motorJobResponseUiModel) {
    this.dashboardService.isRescheduleSlotPopup.next({ data: '', status: true });
    this.jobData = item;
  }


  replaceNewJobObj(newJobObj: IJobResponse) {
    let objIndex = this.jobsData.findIndex((ele: any) => ele.JobId === newJobObj.JobId)
    if (objIndex != -1) {
      this.jobsData[objIndex] = newJobObj
    }
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

  sortByJobType(direction:string) {
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
