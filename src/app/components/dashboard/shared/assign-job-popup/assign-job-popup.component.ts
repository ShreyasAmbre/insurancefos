import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { IAssignRiderJobReqObj, IRiderDetails, IRiderDetailsReqObj } from '../../../../models/Dashboard/dashboardInterface';
import { CommonmasterService } from '../../../../services/common/commonmaster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-assign-job-popup',
  templateUrl: './assign-job-popup.component.html',
  styleUrls: ['./assign-job-popup.component.scss']
})
export class AssignJobPopupComponent implements OnInit, OnDestroy {
  @Input() selectedJobData: any = '';
  
  assignedRider: any = null
  assignedRiderName: any = null
  riderDetails: IRiderDetails[] = []
  toasterStatus: boolean = false
  subscription$: Subscription = new Subscription;
  constructor(private dashboardService: DashboardService, private commonService: CommonmasterService) { }
   
  ngOnInit(): void {
    console.log("SELECTED JOB ===>", this.selectedJobData)
    this.getRiders()
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  getRiders() {
    let reqObj: IRiderDetailsReqObj = {
      ZoneId: this.selectedJobData.ZoneId,
      StartSlot: this.selectedJobData.StartSlot,
      EndSlot: this.selectedJobData.EndSlot
    }
    this.subscription$.add(
      this.dashboardService.GetRiderDetails(reqObj).subscribe((res: any) => {
        this.riderDetails = res.riderDetails
      })
    )
  }

  closePopup(msg?:any, obj?:any, status?:any) {
    this.dashboardService.isVisibleAssignJob.next({ data: {msg: msg, obj: obj}, status: status })
  }

  updateAssignJob() {
    let reqObj: IAssignRiderJobReqObj = {
      JobId: this.selectedJobData.JobId,
      AssignedTo: this.assignedRider.RiderId,
      ReAssign: this.selectedJobData.Assigned === null ? false : true,
      ActivityBy: this.commonService.sessionStorageData.userId
    }
    this.subscription$.add(
      this.dashboardService.AssignRiderToJob(reqObj).subscribe((res: any) => {
        if (res.success) {
          this.selectedJobData['Assigned'] = this.assignedRider.RiderName
          this.selectedJobData['Status'] = "Assigned"
          console.log("ASSIGN RIDER TO JOB RES =>", res, this.selectedJobData)
          this.closePopup("Job Assigned Successfully", this.selectedJobData, false)
        } else {
          this.closePopup("Something went wrong", this.selectedJobData, false)
        }
      })
    )
  }





 

}
