import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonmasterService } from '../../services/common/commonmaster.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userid: string = ''
  showUserProfile: boolean = true;
  userData:any = null
  constructor(private router: Router, private commonService: CommonmasterService,) { }


  ngOnInit(): void {
    
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        console.log('URL changed:', event.url);
        if (event.url === '/') {
          this.showUserProfile = false;
        } else {
          this.userData = JSON.parse(sessionStorage.getItem('userData') || '');
          this.userid = this.userData.userId ? this.userData.userId : ""
          this.showUserProfile = true;
        }
    })
  }
  
}
