import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LoaderService } from './services/loader/loader.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'FOS';
  showSideNav: boolean = false;
  loading: boolean = false
  constructor(private router: Router, private route: ActivatedRoute, public _loading: LoaderService) {
     this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd){
        this.showSideNav = this.router.url !== '/';
      }
     })

  }

  ngOnInit() {
    this.listenToLoading();
    this.router.events
    .pipe(filter((event: any) => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
     

  

      if (url && url.includes('?')) {

        const queryString = url.split('?')[1];

        if (queryString && queryString.trim() !== '') {

          this.showSideNav = false;

        }

      }

    });

  }

  listenToLoading(): void {
    this._loading.loadingSub.subscribe((loading: any) => {
      setTimeout(() => {
        this.loading = loading;
      }, 0)
    });
  }

}
