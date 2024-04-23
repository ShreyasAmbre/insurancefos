import { Injectable } from '@angular/core';
import { CommonmasterService } from '../common/commonmaster.service';
import { Utility } from 'src/app/constants/utility';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom, map } from 'rxjs';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  isTokenExprire:boolean = false

  constructor(private commonService: CommonmasterService, private _http: HttpClient) { }

  async getToken() {

    let token = "";
    var ret = this.isAuthTokenExpired();
    if (ret == "GetAuthToken") {

    } else if (ret == "GetRefreshToken") {
      let encUserId = Utility.encryptionWithoutSalt(this.commonService.sessionStorageData.userId).toString()
      let reqObj = {
        UserId: encUserId
      }
      await this.refreshAuthToken(environment.BaseURL2 + `/auth/token/refresh`, reqObj).then((res) => {
        if (res.success) {
          this.isTokenExprire = false
          this.setLoginUserData(res);
        }
      });
    } else {
      let data: any = sessionStorage.getItem('userData');
      let sessionValue = JSON.parse(data)
      return token = sessionValue.authToken
    }
    token = this.commonService.sessionStorageData.authToken
    return token;
  }

  isAuthTokenExpired() {
    //let token = this.commonService.sessionStorageData.authToken
    let data: any = sessionStorage.getItem('userData');
    let sessionData = JSON.parse(data)
    if (!Utility.IsNullOrEmpty(sessionData?.authToken)) {
      let tokenExpiry = sessionData.expiry
      let tokenExpiryDateTime = new Date(tokenExpiry);
      let currentDateTime = new Date();
      let ret = 60 * 1000;
      ret = (+tokenExpiryDateTime - +currentDateTime) / ret;
      if (ret < 2 && ret > 0) { return "GetRefreshToken"; }
      else if (ret < 0) { return "GetAuthToken"; }
      else { return "NotExpired"; }
    } else { return "GetAuthToken"; }
  };

  setLoginUserData(response:any) {
    if (!Utility.IsNullOrEmpty(response) && response.Success) {
      this.commonService.sessionStorageData.authToken = response.AuthToken
      this.commonService.sessionStorageData.expiry = response.TokenExpiry
      sessionStorage.setItem('userData', JSON.stringify(this.commonService.sessionStorageData))
      //this.commonService.setSessionStorageData()
    }
  }
  refreshAuthToken(url: string, data: any): Promise<any> {
    this.isTokenExprire = true
    let token = this.commonService.sessionStorageData.authToken




    var kv = Utility.KeyIv();
    var KV = Utility.createEncryptedKV(kv);
    let body = Utility.getEncryptedBody(data, kv);
    let Corelationid :any = sessionStorage.getItem('Corelationid');
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("CorelationId", Corelationid)
      .set("Kv", KV)
    if (!Utility.IsNullOrEmpty(token))
      headers = headers.append("Authorization", "Bearer " + token);
    else
      headers = headers.append("Authorization", "Bearer " + null);

    let options = { headers: headers };
    return lastValueFrom(this._http.post(url, { msg: body } , options)
      .pipe(map((response) => {
        return response
      })));
  }
}
