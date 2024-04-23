import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { CreateHealthJob, CreateMotorJob, EditMotorJobRequest } from 'src/app/models/PPNJob/ppnjobInterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PpncreatejobService {

  // Motor Form Subject 
  customerLocationSubject = new Subject(); 
  ppnInfoSubject = new Subject();
  slotsSubject = new Subject();
  customerInfoSubjec = new Subject();
  motorClaimForm = new Subject();
  isSubmit = new BehaviorSubject(false);
  // Health Form Subject
  healthCustomerLocateSubject = new Subject()
  pocDetailsSubject = new Subject()
  pickupLocationSubject = new Subject()
  healthCustomerInfo = new Subject()

  showSlotCalendar = new BehaviorSubject(false)
  zoneData: any = {};
  dropJobClaimDetails = new Subject();


  constructor(private http: HttpClient) { }

  createMotorJob(data: CreateMotorJob): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/job/motor/create', data)
  }
  editMotorJob(data: EditMotorJobRequest): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/job/motor/edit', data)
  }
  createHealthJob(data: CreateHealthJob): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/job/health/create', data)
  }

}
