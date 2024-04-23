import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { CommonmasterService } from '../../../services/common/commonmaster.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
@Component({
  selector: 'app-select-primary-access',
  templateUrl: './select-primary-access.component.html',
  styleUrls: ['./select-primary-access.component.scss']
})
export class SelectPrimaryAccessComponent implements OnInit {

  states = [];
  selectedState:any = '';

  files!: TreeNode[];
  selectedZones:any = [];

  data!: TreeNode[];
  stateCityZoneData: any = []
  dataList:any = []

  constructor(private commonService: CommonmasterService, public dialogRef: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    //console.log("CONFIG DATA ===>", this.config.data.fieldName)
    console.log("CONFIG DATA ===>", this.config.data)
    this.getAccessList()
  }

  getAccessList() {
    this.commonService.getStateCityZone().subscribe((res:any) => {
      this.stateCityZoneData = res.stateList
      this.states = this.getStates()
      if (this.config.data.fromEdit) {
        this.preSelectAccess()
      }
    })
  }

  getCityList(id: any){
    return this.stateCityZoneData.find((ele:any) => {
      if (ele['StateId'] === id) {
        if (this.config.data.values && ele['StateName'] === this.config.data.values.state) {
          
          //console.log("FROM VALUES", this.config.data.values)
          //console.log("FROM VALUES", ele.cityLists, ele.cityLists[0].CityId, typeof ele.cityLists)
          var cityZoneListIndex = ele.cityLists.findIndex((ele:any) => ele.CityId === this.config.data.values.cityId)

          if (cityZoneListIndex != -1) {
            if (ele.cityLists[cityZoneListIndex].zoneLists.length > 1) {
              var value = ele.cityLists[cityZoneListIndex].zoneLists.filter((item: any) => {
                return item.ZoneName !== this.config.data.values.zones
              })
              ele.cityLists[cityZoneListIndex].zoneLists = value
              //console.log("FROM VALUES FROM VALUES finale", ele.cityLists, ele)
              return ele.cityLists
            } else {
              ele.cityLists.splice(cityZoneListIndex, 1)
              //console.log("FROM VALUES FROM VALUES finale second", ele.cityLists, ele)
              return ele.cityLists
            }
          }
        }
        return ele.cityLists
      }
    })
  }

  getStates() {
    return this.stateCityZoneData.map((ele:any) => {
      let obj:any = {}
      obj['StateName'] = ele.StateName 
      obj['StateId'] = ele.StateId
      return obj
    })
  }

  onStateSelect(event?: any, objFromEdit?: any) {
    //console.log("onStateSelect", event)
    this.dataList = event ? this.getCityList(event.value.StateId) : this.getCityList(objFromEdit.StateId)
    //console.log("ACCESS LIST STATES ===>", this.states)
    this.data = this.dataList.cityLists.map((ele: any) => {
      let cityList: any = {}
      cityList.label = ele.CityName;
        cityList.cityName = ele.CityName;
      cityList.cityId = ele.CityId;
      cityList.type = "city";
      cityList.icon = 'pi pi-folder';
      cityList.children = ele.zoneLists.map((element: any) => {
        let zoneList: any = {}
        zoneList.label = element.ZoneName;
        zoneList.zoneName = element.ZoneName
        zoneList.id = element.ZoneId;
        zoneList.zoneId = element.ZoneId;
        zoneList.cityId = ele.CityId;
        zoneList.cityName = ele.CityName;
        zoneList.type = "zone";
        zoneList.icon = 'pi pi-folder';
        zoneList.styleClass = element.ZoneStatus === "0" ? 'disabled-node' : '';
        zoneList.selectable = element.ZoneStatus === "0" ? false : true;
        return zoneList
      })
      return cityList
    })

    if (objFromEdit) {
      //console.log("FROM EDIT SELECT ===>", this.config.data.editPreValues)
      if (objFromEdit === 'fromView') {
        this.selectedZones = []
      } else {
        let selectedCityObj: any = this.data.find((ele: any) => ele.cityName === this.config.data.editPreValues.city)
        if (selectedCityObj) {
          var selectedZoneObj = selectedCityObj.children.find((item: any) => item.id === this.config.data.editPreValues.zoneId)
        }
        //console.log("FROM EDIT SELECT after find===>", selectedCityObj)

        this.selectedZones.push(selectedZoneObj)
      //console.log("FROM EDIT SELECT after push===>", this.selectedZones)
      }
      
     

    }
  }


nodeSelect(event: { originalEvent: Event, node: TreeNode }) {
  this.selectedZones = [event.node];
  //console.log("ACCESS event", event.node)
  // if (this.selectedZones.length >= 1 && this.selectedZones.length <= 2) {
  //if (this.selectedZones.length == 1) {
  //  console.log("SINGLE SELECT ", this.selectedZones)
  //  console.log("SINGLE SELECT ", this.dataList.cityLists)
  //}
  // } else {
  //console.log("ACCESS SELECT", this.selectedZones)
  //this.selectedZones = []
  //this.selectedZones = this.selectedZones.push(event.node) 
  //}
}



  selectAccess() {
    const concatenatedNames = this.selectedZones.map((obj: any) => obj.zoneName).join(',');
    console.log("SELECT ACCESS concatenatedNames", this.selectedZones, concatenatedNames)
    //let accessArea = `${this.selectedZones[0]['cityName']}, ${concatenatedNames}`
    const dataToSend = {
      field: this.config.data.fieldName,
      zoneField: this.config.data.zoneField,
      value: {
        state: this.selectedState['StateName'],
        city: this.selectedZones[0]['cityName'],
        cityId: this.selectedZones[0]['cityId'],
        zones: (concatenatedNames).replace(",", ""),
        zoneId: this.selectedZones[0]['zoneId'] ? this.selectedZones[0]['zoneId'] : this.selectedZones[1]['zoneId']
      } 
    }; // Your data to send back
    this.dialogRef.close(dataToSend);
  }

  preSelectAccess() {
    //console.log("FROM EDIT SELECT ===>", this.config.data.editPreValues)
    this.selectedState = {
      "StateName": this.config.data.editPreValues.state,
      "StateId": this.config.data.editPreValues.stateId
    }
    this.onStateSelect(null, this.selectedState)
  }
}
