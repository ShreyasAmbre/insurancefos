import { Component, Input,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as ValidationConstants from 'src/app/constants/ValidationConstants'
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import { RescheduleJobRequest, motorJobResponseUiModel } from 'src/app/models/PPNJob/ppnjobInterface';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { DashboardService } from '../../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-reschedule-job',
  templateUrl: './reschedule-job.component.html',
  styleUrls: ['./reschedule-job.component.scss']
})
export class RescheduleJobComponent implements OnInit {
  rescheduleSlotForm: FormGroup;
  zoneData: any = {};
  showSlotCalendar: any;
  requestedByList = [
    { "requestedName": 'Customer', "requestedId": '1' },
    { "requestedName": 'FE', "requestedId": '2' }
  ]
  @Input() jobData: motorJobResponseUiModel;
  selectedSlotData: any;
  userData: any;
    submitted: boolean;
  constructor(private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private ppncreateservice: PpncreatejobService,
    private loaderService: LoaderService,
) { }
    
  ngOnInit(): void {
    this.createForm();
    this.userData = JSON.parse(sessionStorage.getItem('userData') || '');
    console.log(this.jobData)
  }
   
  ngOnDestroy(): void {

  }

  createForm() {
    this.rescheduleSlotForm = this.formBuilder.group({
      requestedBy: new FormControl('', ValidationConstants.requiredValidation),
      startDate: new FormControl({ value:new Date(this.jobData.StartSlot), disabled: true }, ValidationConstants.requiredValidation),
      endDate: new FormControl({ value: new Date(this.jobData.EndSlot), disabled: true }, ValidationConstants.requiredValidation),
    });
  }

  showSlotCal() {
    this.ppncreateservice.showSlotCalendar.next(true);
    this.getSlotCalendarStatus()
  }

  getSlotCalendarStatus() {
    this.ppncreateservice.showSlotCalendar.subscribe((value: any) => {
      this.zoneData['zoneId'] = this.jobData.ZoneId;
      this.showSlotCalendar = value
    });

  }

  sendSelectedSlot(event: any) {
    this.selectedSlotData = event;
    console.log(event);
    this.rescheduleSlotForm.patchValue({
      startDate: new Date(event.startslot),
      endDate: new Date(event.endslot),
    });
  }
  get rescheduleFormDetails() {
    return this.rescheduleSlotForm.controls;
  }
  get requestedBy() {
    return this.rescheduleFormDetails['requestedBy']
  }
  get startDate() {
    return this.rescheduleFormDetails['startDate']
  }
  get endDate() {
    return this.rescheduleFormDetails['endDate']
  }
  saveReschedule() {
    this.submitted = true;
    if (this.rescheduleSlotForm.invalid) {
      return false;
    }
    let request: RescheduleJobRequest = new RescheduleJobRequest();
    request.JobId = this.jobData.JobId;
    request.RescheduleRequestedBy = this.requestedBy.value;
    request.EndSlot = this.endDate.value;
    request.StartSlot = this.startDate.value;
    request.ModifiedBy = this.userData.userId;
    console.log(request)
    this.loaderService.loadingSub.next(true)
    this.dashboardService.RescheduleSlots(request).subscribe(res => {

      this.jobData.EndSlot = this.endDate.value;
      this.jobData.StartSlot = this.startDate.value;
      console.log("CREATE HEALTH JOB RES ===>", res)
      this.loaderService.loadingSub.next(false)

      this.closeRescheduleSlot("Job Reschedule Successfully");

    }, (err: any) => {
      this.loaderService.loadingSub.next(false)
      console.log(err)
    })
    return;
  }

  closeRescheduleSlot(msg?: any) {
    if (msg) {
      this.dashboardService.isRescheduleSlotPopup.next({ data: { msg: msg, obj: this.jobData }, status: false });
    } else {
      this.dashboardService.isRescheduleSlotPopup.next({ data: '', status: false });
    }
  }
}
