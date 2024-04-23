import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  //User Management API's'
  userCreation(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/User/Create', data);
  }

  getAssignRole() {
    return this.http.get(environment.BaseURL2 + '/User/GetRoleList');
  }

  getUserDetails(): Observable<any> {
    return this.http.get(environment.BaseURL2 + '/User/GetUserList')
  }

  GetUserById(userId: any): Observable<any> {
    return this.http.get(environment.BaseURL2 + `/User/Get/${userId}`)
  }

  DeleteUser(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + `/User/Delete`, data)
  }

  EditUser(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + '/User/Edit', data)
  }

  DisableEnableUser(data: any): Observable<any> {
    return this.http.post(environment.BaseURL2 + `/User/Delete`, data)
  }

}
