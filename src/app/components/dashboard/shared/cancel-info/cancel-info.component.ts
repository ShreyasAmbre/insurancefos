import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { IGarageTypes, IPPNType, ICancelReasonName } from '../../../../models/CommonInterface/CommonInterface.model';
import { CommonmasterService } from '../../../../services/common/commonmaster.service';
import { Subscription } from 'rxjs';
import { ICancelJobReqObj } from '../../../../models/Dashboard/dashboardInterface';

@Component({
  selector: 'app-cancel-info',
  templateUrl: './cancel-info.component.html',
  styleUrls: ['./cancel-info.component.scss']
})
export class CancelInfoComponent implements OnInit, OnDestroy {
  @Input() selectedJobData: any = '';


  cancelReasons: ICancelReasonName[] = []
  garageTypes: IGarageTypes[] = []
  ppnType: IPPNType[] = []
  selectedGarageType: string = ''
  selectedPPNType: string = ''
  selectedReason: any = ''
  reasonRemark: string = ''
  subscription$: Subscription = new Subscription;


  constructor(private dashboardService: DashboardService, private commonService: CommonmasterService) { }

  ngOnInit(): void {
    this.getGarageType()
    this.getPpnType()
    this.getCancelReasons()
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  getGarageType() {
    this.subscription$.add(
      this.commonService.getGarageType().subscribe((res: any) => {
        this.garageTypes = res
      })
    )
  }

  getPpnType() {
    this.subscription$.add(
      this.commonService.getPPNcategory().subscribe((res: any) => {
        this.ppnType = res
      })
    )
  }

  getCancelReasons() {
    this.subscription$.add(
      this.commonService.getCancelReason().subscribe((res: any) => {
        this.cancelReasons = res.reason
      })
    )
  }

  cancelJobOrder() {
    let reqObj: ICancelJobReqObj = {
      JobId: this.selectedJobData.jobId,
      CancelledBy: this.commonService.sessionStorageData.userId,
      ReasonOfCancelId: String(this.selectedReason?.ReasonId),
      PPNCategoryId: this.selectedPPNType,
      GarageTypeId: this.selectedGarageType,
      CancelRemarks: this.reasonRemark
    }

    this.subscription$.add(
      this.dashboardService.CancelOrder(reqObj).subscribe((res: any) => {
        console.log("UPDATE RES ===>", res)
        if (res.success) {
          this.closePopup()
        }
      })
    )
  }

  closePopup() {
    this.dashboardService.isVisisbleCancelPopup.next(false)
  }

}
