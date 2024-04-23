import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  //Login Auth API's'
  userCredentials(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/Auth/' + environment.loginEndPoint, data);
  }

  userIsLoggedIn() {
    let userData:any = sessionStorage.getItem('userData')
    userData = JSON.parse(userData)
    if (userData) {
      return userData.isLoggedIn
    } else {
      return false
    }
  }

  getUserRole() {
    let userData: any = sessionStorage.getItem('userData')
    userData = JSON.parse(userData)
    if (userData) {
      return userData.roleId
    } else {
      return null
    }
  }

  checkUserLogin(routeData:any, url:any) {
    let isLoggedIn = this.userIsLoggedIn()
    let loggedInRole = this.getUserRole()
    console.log("AUTH GUARD", routeData, url, routeData.data.role.includes(loggedInRole))
    if (isLoggedIn) {
      if (routeData.data.role.includes(loggedInRole)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }


  logoutUser(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/auth/logout', data)
  }

}
