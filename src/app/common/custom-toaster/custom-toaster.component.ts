import { Component, Input, OnInit, Output } from '@angular/core';
import { CommonmasterService } from '../../services/common/commonmaster.service';

@Component({
  selector: 'app-custom-toaster',
  templateUrl: './custom-toaster.component.html',
  styleUrls: ['./custom-toaster.component.scss']
})

export class CustomToasterComponent implements OnInit {
  @Input() toasterIsSuccess: boolean = true;

  toastMessage: String = '';

  constructor(private commonService: CommonmasterService) { }

  ngOnInit(): void {
    this.getTotasterMsg()
  }

  getTotasterMsg() {
    this.commonService.userPopup.subscribe((value: any) => {
      this.toastMessage = value.toastMsg
    })
  }
}
