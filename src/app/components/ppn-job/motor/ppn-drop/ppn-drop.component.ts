import { Component, Input, OnInit } from '@angular/core';
import { PpncreatejobService } from '../../../../services/ppnjob/ppncreatejob.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ppn-drop',
  templateUrl: './ppn-drop.component.html',
  styleUrls: ['./ppn-drop.component.scss']
})
export class PpnDropComponent implements OnInit {
  @Input() actionSelected: string = '';
  @Input() form!: FormGroup;
  showSlotCalendar: boolean = false
  zoneData: any = {}
  showImage = false;
  selectedSlotData = ''


  constructor(private ppncreateservice: PpncreatejobService) { }

  ngOnInit(): void {
    this.getSlotCalendarStatus()
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
