import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { differenceInMinutes, isBefore, isEqual, parse } from 'date-fns';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { CapacityService } from '../../../services/capacity/capacity.service';
import isAfter from 'date-fns/esm/isAfter/index';
import { Router } from '@angular/router';
import { CreateUpdateSlotRequest, RemoveSlot } from '../../../models/CapacityManagement/CapacityManagementInterface';


@Component({
  selector: 'app-meeting-details',
  templateUrl: './meeting-details.component.html',
  styleUrls: ['./meeting-details.component.scss']
})
export class MeetingDetailsComponent implements OnInit {

  slotCreation: FormGroup = new FormGroup({});
  isOverlap = false

  constructor(public dialogRef: DynamicDialogRef, public config: DynamicDialogConfig, private formBuilder: FormBuilder,
    private commonService: CommonmasterService, private capacityService: CapacityService, private router: Router) { }

  ngOnInit(): void {
    //console.log("CONFIG DATA ===>", this.config.data.slotsData)
    this.slotFromBuilder()

    this.slotFormChange()
  }

  slotFromBuilder() {
    this.slotCreation = this.formBuilder.group({
      StartTime: [this.config.data.startTime, ValidationConstants.requiredValidation],
      EndTime: [this.config.data.endTime, ValidationConstants.requiredValidation],
      BookingRation: [this.config.data.action === 'edit' ?
        this.config.data.bookingration : 1, ValidationConstants.BookingRationValidation],
    })
  }

  slotFormChange() {
    this.slotCreation.get('StartTime')?.valueChanges.subscribe((newValue) => {
      this.isOverlap = false

      const minTime = new Date(this.config.data.startTime);
      minTime.setHours(8, 30, 0); // Set minimum time (e.g., 8:30 AM)
      let isTimeBeforeMin = isBefore(newValue, minTime,)

      if (isTimeBeforeMin) {
        isTimeBeforeMin ? this.slotCreation.get('StartTime')?.setErrors({ 'invalidStart': true }) :
          this.slotCreation.get('StartTime')?.setErrors(null);
        //console.log("START BEFORE OPEN =>", minTime, isTimeBeforeMin)
        return
      }

      const maxTime = new Date(this.config.data.endTime);
      maxTime.setHours(18, 30, 0); // Set maximum time (e.g., 6:30 PM)
      let isTimeAfterMax = isAfter(this.slotCreation.get('EndTime')?.value, maxTime)

      if (isTimeAfterMax) {
        isTimeAfterMax ? this.slotCreation.get('EndTime')?.setErrors({ 'invalidEnd': true }) :
          this.slotCreation.get('EndTime')?.setErrors(null);
        //console.log("START AFTER OPEN =>", maxTime, isTimeAfterMax)
        return
      }
        
      let isBeforeStartTime = isBefore(newValue, this.slotCreation.get('EndTime')?.value)
      isBeforeStartTime === false ?
        this.slotCreation.get('StartTime')?.setErrors({ 'invalidStart': true }) :
        this.slotCreation.get('StartTime')?.setErrors(null);

      let isAfterEndTime = isAfter(this.slotCreation.get('EndTime')?.value, this.slotCreation.get('StartTime')?.value)
      isAfterEndTime === false ?
        this.slotCreation.get('EndTime')?.setErrors({ 'invalidEnd': true }) :
        this.slotCreation.get('EndTime')?.setErrors(null);


    });

   

    this.slotCreation.get('EndTime')?.valueChanges.subscribe((newValue) => {
      this.isOverlap = false

      const minTime = new Date(this.config.data.startTime);
      minTime.setHours(8, 30, 0); // Set minimum time (e.g., 8:30 AM)
      let isTimeBeforeMin = isBefore(this.slotCreation.get('StartTime')?.value, minTime,)

      if (isTimeBeforeMin) {
        isTimeBeforeMin ? this.slotCreation.get('StartTime')?.setErrors({ 'invalidStart': true }) :
          this.slotCreation.get('StartTime')?.setErrors(null);
        //console.log("START BEFORE OPEN =>", minTime, isTimeBeforeMin)
        return
      }

      const maxTime = new Date(this.config.data.endTime);
      maxTime.setHours(18, 30, 0); // Set maximum time (e.g., 6:30 PM)
      let isTimeAfterMax = isAfter(newValue, maxTime)

      if (isTimeAfterMax) {
        isTimeAfterMax ? this.slotCreation.get('EndTime')?.setErrors({ 'invalidEnd': true }) :
        this.slotCreation.get('EndTime')?.setErrors(null);
        //console.log("START AFTER OPEN =>", maxTime, isTimeAfterMax)
        return
      }
        
      let isBeforeStartTime = isBefore(this.slotCreation.get('StartTime')?.value, this.slotCreation.get('EndTime')?.value)
      isBeforeStartTime === false?
        this.slotCreation.get('StartTime')?.setErrors({ 'invalidStart': true }) :
        this.slotCreation.get('StartTime')?.setErrors(null);

      let isAfterEndTime = isAfter(newValue, this.slotCreation.get('StartTime')?.value)
      isAfterEndTime === false ?
        this.slotCreation.get('EndTime')?.setErrors({ 'invalidEnd': true }) :
        this.slotCreation.get('EndTime')?.setErrors(null);

      console.log("TIME VALIDATION ", isBeforeStartTime, isAfterEndTime)
      console.log("TIME VALIDATION ", this.slotCreation.get('StartTime')?.value, this.slotCreation.get('EndTime')?.value)
    });
  }


  submitSlot() {
    this.isOverlap = false
    // Convert date string to Date Object
    const startDateObject = new Date(this.slotCreation.value.StartTime);
    const endDateObject = new Date(this.slotCreation.value.EndTime);
    console.log("CONFIG DATA ===>", endDateObject)
    if (this.config.data.slotsData) {
      this.config.data.slotsData.some((ele: any) => {

        const overlap = this.slotsOverlap(ele.start, ele.end, startDateObject, endDateObject);
        //console.log("isOVERLAP", overlap)
        if (overlap && this.config.data.slotId != ele.slotid) {
          this.isOverlap = true
          return true
        }
        return false
      })
      if (this.isOverlap) {
        return
      }
    }
    // Get Day from date
    var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //const day = new Date(this.slotCreation.value.StartTime).getDay()
    const day = new Date(this.config.data.startTime).getDay()

    // Calculate the total minutes
    const startTimeInMin = String(startDateObject.getHours() * 60 + startDateObject.getMinutes());
    const endTimeInMin = String(endDateObject.getHours() * 60 + endDateObject.getMinutes());

    let reqObj: CreateUpdateSlotRequest = {
      ZoneId: String(this.config.data.zoneId),
      SlotFrom: startTimeInMin,
      SlotTo: endTimeInMin,
      WeekDay: daysOfWeek[day],
      BookingRatio: this.slotCreation.get('BookingRation')?.value,
      CreatedBy: this.commonService.sessionStorageData.userId,
      SlotId: this.config.data.action === 'edit' ? this.config.data.slotId : null
    }


    //console.log('ReqObj ===>', reqObj);

    this.capacityService.createUpdateSlot(reqObj).subscribe((res: any) => {
      //console.log("CREATED RES ===>", res)
      let action = this.config.data.action === 'edit' ? 'Updated' : 'Created'
      if (res.success) {
        this.showToaster(`Slot ${action} Successfully`)
      }
      this.dialogRef.close()
    })

  }

  removeSlot() {
    let reqObj: RemoveSlot = {
      "ZoneId": String(this.config.data.zoneId),
      "SlotId": this.config.data.action === 'edit' ? this.config.data.slotId : null,
    }

    this.capacityService.removeSlot(reqObj).subscribe((res: any) => {
      if (res.success) {
        this.showToaster(`Slot deleted Successfully`)
      }
      this.dialogRef.close()
    })
  }

  showToaster(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: true });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: true });
    }, 5000);
  }




  slotsOverlap(start1: Date, end1: Date, start2: Date, end2: Date): boolean {
    // Check if range 1 ends before or is equal to range 2 starts
    if (isBefore(end1, start2) || isEqual(end1, start2)) {
      return false;
    }

    // Check if range 1 starts after or is equal to range 2 ends
    if (isAfter(start1, end2) || isEqual(start1, end2)) {
      return false;
    }

    // If neither condition is met, there is an overlap
    return true;
    
  }

  



}
