import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { PpnmasterService } from '../../../services/ppnmaster/ppnmaster.service';
import { DashboardService } from '../../../services/dashboard/dashboard.service';
import { IVertical } from '../../../models/CommonInterface/CommonInterface.model';
import { Subscription } from 'rxjs';
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { LoaderService } from '../../../services/loader/loader.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, OnDestroy {

  verticalOptions: IVertical[] = []

  jobsOptions = [
    { label: 'Motor jobs', value: "Motor" },
    { label: 'Wyn health', value: "Health" },
  ]

  jobListForm: FormGroup = new FormGroup({});

  selectedJobType: string = "Motor"
  selectedCategoryType: string = "Active"
  selectedVertical: string = ""
  isVisisbleDateRange: boolean = false
  selectedDateRange: any = null
  motorJobUpdateData:any = ''

  subscription$: Subscription = new Subscription;



  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private commonService: CommonmasterService,
    private loaderService: LoaderService) { }
    
  ngOnInit() {
    this.jobListFormBuilder();
    this.getVertical();
    this.getDateRangePopupStatus()  
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe()
  }


  jobListFormBuilder() {
    this.jobListForm = this.formBuilder.group({
      verticalMotor: new FormControl("", ValidationConstants.requiredValidation),
    });
  }

  getVertical() {
    this.subscription$.add(
      this.commonService.getVertical().subscribe({
        next: (data: any) => {
          this.verticalOptions = data.vertical
        },
        error: (err: any) => {
          console.log(err)
          this.loaderService.loadingSub.next(false);
        }
      })
    )
    
  }

  selectJobType(event: any) {
    console.log("VLAUE ===>", event)
    this.selectedJobType = (event['value']).split(" ")[0]
  }

  categoryEmit(eventData: any) {
    // eventData from Counter Component of Selected Category
    this.selectedCategoryType = eventData
  }

  getDateRangePopupStatus() {
    this.dashboardService.isVisisbleDateSelector.subscribe((value: any) => {
      this.isVisisbleDateRange = value.status
    })
  }

  openRangeSelector() {
    this.dashboardService.isVisisbleDateSelector.next({ data: '', status: true })
  }

  dateRangeEmit(eventData: any) {
    // eventData from Counter Component of Selected Category
    this.selectedDateRange = eventData
  }

  motorJobUpdateEmit(event: any) {
    this.motorJobUpdateData = event
  }
}
