import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IAssignRiderJobReqObj, ICancelJobReqObj, ICountReqObj, ICountResponse, IJobHistoryReqObj, IJobHistoryResponse, IJobResponse, IJobsReqObj, IRiderDetailsReqObj, IRiderDetailsResponse, IUpdateDCSMReqObj } from '../../models/Dashboard/dashboardInterface';
import { IBaseResponse } from '../../models/CommonInterface/CommonInterface.model';
import { RescheduleJobRequest } from '../../models/PPNJob/ppnjobInterface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  isVisibleAssignJob = new BehaviorSubject<any>({data: '', status: false})
  isVisisbleCancelPopup = new BehaviorSubject<boolean>(false)
  isVisisbleDateSelector = new BehaviorSubject<any>({ data: '', status: false })
  isAccessAreaClosed = new BehaviorSubject<boolean>(false)

  isRescheduleSlotPopup = new BehaviorSubject<any>({ data: '', status: false })
  searchInputValue = new Subject<string>()
  isVisisbleRelatedDataPopup = new BehaviorSubject<any>({ data: '', status: false })


  constructor(private http: HttpClient) { }

  GetJobCount(obj: ICountReqObj): Observable<ICountResponse[]> {
    return this.http.post<ICountResponse[]>(environment.BaseURL2 + `/dashboard/job/count`, obj);
  }


  fetchJobsByType(obj: IJobsReqObj): Observable<IJobResponse[]> {
    return this.http.post<IJobResponse[]>(environment.BaseURL2 + `/dashboard/job/fetch`, obj);
  }

  GetRiderDetails(obj: IRiderDetailsReqObj): Observable<IJobResponse[]> {
    return this.http.post<IJobResponse[]>(environment.BaseURL2 + `/dashboard/assign/fetch/rider`, obj);
  }


  AssignRiderToJob(obj: IAssignRiderJobReqObj): Observable<IRiderDetailsResponse[]> {
    return this.http.post<IRiderDetailsResponse[]>(environment.BaseURL2 + `/dashboard/assign/job`, obj);
  }

  UpdateSubMotorJobDetails(obj: IUpdateDCSMReqObj): Observable<IBaseResponse[]> {
    return this.http.post<IBaseResponse[]>(environment.BaseURL2 + `/job/motor/update`, obj);
  }

  CancelOrder(obj: ICancelJobReqObj): Observable<IBaseResponse[]> {
    return this.http.post<IBaseResponse[]>(environment.BaseURL2 + `/job/cancel`, obj);
  }

  GetJobHistory(obj: IJobHistoryReqObj): Observable<IJobHistoryResponse[]> {
    return this.http.post<IJobHistoryResponse[]>(environment.BaseURL2 + `/dashboard/status/history`, obj);
  }

  RescheduleSlots(obj: RescheduleJobRequest) {
    return this.http.post(environment.BaseURL2 + `/job/reschedule`, obj);
  }
}
