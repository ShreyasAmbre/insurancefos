import { Component, Input, OnInit } from '@angular/core';
import { PpncreatejobService } from '../../../../services/ppnjob/ppncreatejob.service';

@Component({
  selector: 'app-ppn-inspection',
  templateUrl: './ppn-inspection.component.html',
  styleUrls: ['./ppn-inspection.component.scss']
})
export class PpnInspectionComponent implements OnInit {
  @Input() actionSelected: string = '';

  showSlotCalendar: boolean = false
  zoneData: any = {}
  showImage = false;
  selectedSlotData = ''
  constructor(private ppncreateservice: PpncreatejobService) { }

  ngOnInit(): void {
    this.getSlotCalendarStatus()
    console.log("ONINIT inspection ===>", this.actionSelected)
  }

  getSlotCalendarStatus() {
    this.ppncreateservice.showSlotCalendar.subscribe((value: any) => {
      //console.log("STATUS SLOT CALENDAR", value)
      this.zoneData['zoneId'] = this.ppncreateservice.zoneData['zoneId']
      this.showSlotCalendar = value
    })
  }

  sendSelectedSlot(event: any) {
    this.selectedSlotData = event
  }
}
