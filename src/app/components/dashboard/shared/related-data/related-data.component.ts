import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';
import { Subscription } from 'rxjs';
import { IJobHistoryReqObj } from '../../../../models/Dashboard/dashboardInterface';

@Component({
  selector: 'app-related-data',
  templateUrl: './related-data.component.html',
  styleUrls: ['./related-data.component.scss']
})
export class RelatedDataComponent implements OnInit, OnChanges, OnDestroy {
  @Input() selectedJobData: any = '';

  subscription$: Subscription = new Subscription;
  allJobStatus: any = []
  jobAccIndex:number = -1


  constructor(private dashboardService: DashboardService) { }
  

  ngOnInit(): void {
    this.jobHistory()
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("SELECTED JOB  ===>", this.selectedJobData)
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }

  closePopup() {
    this.dashboardService.isVisisbleRelatedDataPopup.next({ data: '', status: false })
  }

  jobHistory() {
    let reqObj: IJobHistoryReqObj = {
      JobId: this.selectedJobData.JobId
    }

    this.subscription$.add(
      this.dashboardService.GetJobHistory(reqObj).subscribe((res: any) => {
        console.log("JOB HISTORY RES===>", res)
        this.allJobStatus = res.JobStatus.reverse();

      })
    )
  }

  openCloseAcc(i:any) {
    if (this.jobAccIndex !=i) {
      this.jobAccIndex = i;
    } else {
      this.jobAccIndex = -1;
    }
  }


}
