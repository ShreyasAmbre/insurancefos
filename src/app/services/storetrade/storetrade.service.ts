import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StoretradeService {

  constructor(private http: HttpClient) { }

  getPincodesById(id: any) {
    return this.http.get(environment.BaseURL2 + `/master/ZoneWise/Pincode/${id}`);
  }

  updateZonePincodes(obj: any) {
    return this.http.post(environment.BaseURL2 + '/master/ZoneWise/Pincode', obj)
  }


  getZoneDetailsById(obj: any) {
    return this.http.post(environment.BaseURL2 + '/master/ZoneId', obj)
  }

  updateZoneActivation(obj: any) {
    return this.http.post(environment.BaseURL2 + '/master/Zone/DisableEnable', obj)
  }
}
