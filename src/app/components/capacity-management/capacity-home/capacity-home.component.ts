import { Component, OnInit } from '@angular/core';
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { ZonesModel } from '../../../models/CommonInterface/CommonInterface.model';

@Component({
  selector: 'app-capacity-home',
  templateUrl: './capacity-home.component.html',
  styleUrls: ['./capacity-home.component.scss']
})
export class CapacityHomeComponent implements OnInit {
  zones: ZonesModel[] = [];
  selectedZone: string = '1'
  toasterStatus: boolean = false;


  constructor(private commonService: CommonmasterService) { }


  ngOnInit(): void {
    this.getZoneList()
    this.getToasterStatus()
  }

  getZoneList() {
    this.commonService.GetZoneList().subscribe((res: any) => {
      console.log("ZONE RES ===>", res)
      this.zones = res
    })
  }

  getToasterStatus() {
    this.commonService.userPopup.subscribe((value: any) => {
      this.toasterStatus = value.status
    })
  }

  

}
