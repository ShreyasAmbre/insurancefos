import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PpnTypeOption, pickupConfirmOption } from 'src/app/models/PPNJob/ppnjobInterface';
import * as ValidationConstants from "src/app/constants/ValidationConstants";
import { PpncreatejobService } from 'src/app/services/ppnjob/ppncreatejob.service';
import { PpnmasterService } from '../../../../services/ppnmaster/ppnmaster.service';
import { CommonmasterService } from '../../../../services/common/commonmaster.service';
import { IVertical } from '../../../../models/CommonInterface/CommonInterface.model';

@Component({
  selector: 'app-ppn-pickup',
  templateUrl: './ppn-pickup.component.html',
  styleUrls: ['./ppn-pickup.component.scss']
})
export class PpnPickupComponent implements OnInit {
  @Input() actionSelected: string = '';

  ppntypeOption: PpnTypeOption[] = []

  verticalOption: IVertical[] = []

  pickupConfirmOption: pickupConfirmOption[] = [
    {code: "1", option: 'Yes'},
    {code: "2", option: 'No'}
  ]
  customerLocationForm: FormGroup = new FormGroup({});
  showSlotCalendar: boolean = false
  zoneData: any = {}
  showImage = false;
  selectedSlotData = ''

  constructor(
    private formBuilder: FormBuilder,
    private ppncreateservice: PpncreatejobService,
    private ppnmasterSearvice: PpnmasterService,
    private commonService: CommonmasterService
  ) { }
    

  ngOnInit(): void {
    //console.log("ONINIT pickup ===>", this.actionSelected)
    //this.getPPNcategory()
    //this.getVertical()
    this.getSlotCalendarStatus()

  }

  toggleImage() {
    this.showImage = !this.showImage;
  }
  closeImage() {
    this.showImage = false;
  }

  getSlotCalendarStatus() {
    this.ppncreateservice.showSlotCalendar.subscribe((value: any) => {
      this.zoneData['zoneId'] = this.ppncreateservice.zoneData['zoneId']
      this.showSlotCalendar = value
      })
  }

  sendSelectedSlot(event: any) {
    this.selectedSlotData = event
  }

}
