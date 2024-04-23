import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { CreateUpdateSlotRequest, RemoveSlot } from 'src/app/models/CapacityManagement/CapacityManagementInterface';

@Injectable({
  providedIn: 'root'
})
export class CapacityService {

  constructor(private http: HttpClient) { }

  getZoneWiseCapacity(zoneId: any): Observable<any> {
    return this.http.get(environment.BaseURL2 + `/Capacity/count/${zoneId}`)
  }

  createUpdateSlot(obj: CreateUpdateSlotRequest) {
    return this.http.post(environment.BaseURL2 + '/capacity/update', obj)
  }

  removeSlot(obj: RemoveSlot) {
    return this.http.post(environment.BaseURL2 + '/Capacity/remove', obj)
  }


}
