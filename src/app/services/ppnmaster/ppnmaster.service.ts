import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PpnmasterService {

  constructor(private http: HttpClient) { }

  //PPN Master API's
  CreatePPNMaster(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/PPNMaster/Create', data)
  }

  GetPPNMasterList(obj:any): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/PPNMaster/List', obj)
  }

  getDetailsByppnId(ppnId: any): Observable<any> {
    return this.http.get(environment.BaseURL2 + `/PPNMaster/Get/${ppnId}`)
  }
  DeletePPNmaster(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/PPNMaster/Delete', data)
  }

  EditPPNmaster(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/PPNMaster/Edit', data)
  }

  DisableEnablePPN(data: any): Observable<any> {
    //return this.http.post(environment.BaseURL2 + '/PPNMaster/DisableEnablePPN', data)
    return this.http.post(environment.BaseURL2 + '/ppnmaster/disableEnable', data)
  }


}
