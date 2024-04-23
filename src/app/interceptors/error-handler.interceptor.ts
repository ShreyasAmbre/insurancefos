import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { CommonmasterService } from '../services/common/commonmaster.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private commonService: CommonmasterService, private router: Router, private loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred';

        // Customize error message based on error status or other criteria
        if (error.status === 401) {
          sessionStorage.removeItem('userData')
          sessionStorage.removeItem('Corelationid')
          this.commonService.roleAccessObj.next(null)
          this.router.navigate(['/'])
          this.commonService.userPopup.next({ status: true, toastMsg: "Authorization Failed", isSuccess: false });
          this.loaderService.loadingSub.next(false);
        } else if (error.status === 403) {
          sessionStorage.removeItem('userData')
          sessionStorage.removeItem('Corelationid')
          this.commonService.roleAccessObj.next(null)
          this.router.navigate(['/'])
          this.commonService.userPopup.next({ status: true, toastMsg: "Authorization Failed", isSuccess: false });
          this.loaderService.loadingSub.next(false);
        } else if (error.status === 400) {
          this.commonService.userPopup.next({ status: true, toastMsg: "Something went wrong. Please try again", isSuccess: false });
          this.loaderService.loadingSub.next(false);
        }
        //else if (error.status === 409) {
        //  this.commonService.userPopup.next({ status: true, toastMsg: "User already logged-In", isSuccess: false });
        //  this.loaderService.loadingSub.next(false);
        //}
        //else if (error.status === 502) {

        //  this.commonService.userPopup.next({ status: true, toastMsg: "Something went wrong", isSuccess: false });
        //}

        // Pass the error to the calling code
        return throwError(errorMessage);
      })
    )

    
  }
}
