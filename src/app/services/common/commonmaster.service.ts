import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { environment } from '../../../environments/environment';
import { Utility } from '../../constants/utility';
import { addMinutes, format } from 'date-fns';
import { ICanelReasonResponse, IVerticalResponse } from '../../models/CommonInterface/CommonInterface.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommonmasterService {

  userPopup = new BehaviorSubject({ status: false, toastMsg: '', isSuccess: true });
  roleAccessObj: any = new BehaviorSubject(null)
  sessionStorageData: any = []
  loggedInUserId: any = new BehaviorSubject(null)



  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  //Common API's'
  GetStateList() {
    return this.http.get(environment.BaseURL2 + '/Master/State');
  }

  GetCityList() {
    return this.http.get(environment.BaseURL2 + '/Master/City');
  }
  GetZoneList() {
    return this.http.get(environment.BaseURL2 + '/Master/Zone');
  }

  getStateCityZone() {
    return this.http.get(environment.BaseURL2 + '/master/StateCityZone');
  }

  decryptAndSetRoleAccessSubject() {
    let sessionData: any = sessionStorage.getItem('userData');
    if (sessionData) {
      let userRoleAccessStr = (JSON.parse(sessionData))?.roleAccessData;
      let userRoleAccessObj = JSON.parse(Utility.roleAccessDataDecryption(userRoleAccessStr))
      this.roleAccessObj.next(userRoleAccessObj)
    }
  }

  generateStateCityZoneTree(dataList: any, preZoneList:any) {
    let selectedZones:any = []
    let treeData = dataList.map((item:any) => {
      let stateList: any = {}
      stateList.id = item.StateId
      stateList.label = item.StateName
      stateList.stateId = item.StateId
      stateList.stateName = item.StateName
      stateList.children = item.cityLists.map((ele: any) => {
        let cityList: any = {}
        cityList.label = ele.CityName,
        cityList.cityName = ele.CityName
        cityList.cityId = ele.CityId
        cityList.type = "city"
        cityList.icon = 'pi pi-folder'
        cityList.children = ele.zoneLists.map((element: any) => {
          let zoneList: any = {}
          zoneList.label = element.ZoneName
          zoneList.zoneName = element.ZoneName
          zoneList.id = element.ZoneId
          zoneList.zoneId = element.ZoneId
          zoneList.cityId = ele.CityId
          zoneList.cityName = ele.CityName
          zoneList.type = "zone"
          zoneList.icon = 'pi pi-folder'
          if (preZoneList.includes(zoneList.id)) {
            selectedZones.push(zoneList)
          }
          return zoneList
        })
        return cityList
      })
      return stateList
    })

    //console.log("DATA LIST ===>", dataList, treeData)
    return { tree: treeData, zones: selectedZones}



  }

  setUpdateArea(obj:any) {
    return this.http.post(environment.BaseURL2 + '/user/update/accessarea', obj)
  }

  setSessionStorageData() {
    let data: any = sessionStorage.getItem('userData');
    this.sessionStorageData = JSON.parse(data)
  }


  getterSessionZoneIds() {
    setTimeout(() => {
      return this.sessionStorageData.zoneAccessArea === null ? [] :
        (this.sessionStorageData.zoneAccessArea).split(',')
    }, 500)
  }

  getZoneWiseSlotDetails(obj: any) {
    return this.http.post(environment.BaseURL2 + '/slot/fetch', obj)
  }


  getVerifyPincode(pincode:any) {
    return this.http.get(environment.BaseURL2 + `/master/pincode/verify/${pincode}`);
  }
  

  convertToISODate(day: any, date: any, startingMin: any, endingMin: any, slotId: any, bookingRatio: any, capacityVolume: any) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',];

    // Find the index of the given day name
    const dayIndex = daysOfWeek.indexOf(day);

    //if (dayIndex !== -1) {
    // Calculate the date by adding minutes to the start of the week
    //const sDate = startOfWeek(new Date());
    const sDate = new Date(date)
    const startDate = addMinutes(sDate, startingMin);
    const endDate = addMinutes(sDate, endingMin);
    let obj = {
      title: `Capacity ${capacityVolume}`,
      start: startDate,
      end: endDate,
      bookingratio: bookingRatio,
      capvol: capacityVolume,
      slotid: slotId,
      day: format(sDate, 'EEEE')
    }
    // Format the date as ISO string
    return obj
    //} else {
    //  return 'Invalid day name';
    //}
  }

  getClaimNumber(reqObj: any) {
    return this.http.post(environment.BaseURL2 + `/master/claim/search`, reqObj);
  }

  getGarageType(): Observable<any> {
    return this.http.get(environment.BaseURL2 + '/PPNMaster/GarageType')
  }

  getPPNcategory(): Observable<any> {
    return this.http.get(environment.BaseURL2 + '/PPNMaster/PPNCategory')
  }

  getCancelReason(): Observable<ICanelReasonResponse> {
    return this.http.get<ICanelReasonResponse>(environment.BaseURL2 + '/master/CancelReason')
  }

  getVertical(): Observable<IVerticalResponse[]> {
    return this.http.get<IVerticalResponse[]>(environment.BaseURL2 + '/master/Vertical')
  }


  userLogout() {
    let encUserId = Utility.encryptionWithoutSalt(this.sessionStorageData.userId).toString()
    let reqObj = {
      UserId: encUserId
    }
    this.authService.logoutUser(reqObj).subscribe((res: any) => {
      sessionStorage.removeItem('userData')
      sessionStorage.removeItem('Corelationid')
      this.roleAccessObj.next(null)
      this.router.navigate(['/'])
    })
  }
}
