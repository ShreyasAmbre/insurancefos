import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment';
import { CreateRiderRequest } from 'src/app/models/AssetManagement/assetInterface';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  constructor(private http: HttpClient) { }

  //Asset Management API's
  CreateAsset(data: CreateRiderRequest): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/Asset/Create', data)
  }

  GetAssetList(obj:any): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/Asset/List', obj)
    //return this.http.post(environment.BaseURL2 + '/asset/List', obj)
  }

  GetAssetById(userId: any): Observable<any> {
    return this.http.get(environment.BaseURL2 + `/Asset/Get/${userId}`)
  }

  EditAsset(data: CreateRiderRequest): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/Asset/Edit', data)
  }
  DeleteAsset(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + `/Asset/Delete`, data)
  }

  DisableEnableAsset(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + `/asset/disable`, data)
  }
}
