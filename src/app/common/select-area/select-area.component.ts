import { Component } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { CommonmasterService } from '../../services/common/commonmaster.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { LoaderService } from '../../services/loader/loader.service';

@Component({
  selector: 'app-select-area',
  templateUrl: './select-area.component.html',
  styleUrls: ['./select-area.component.scss'],
})
export class SelectAreaComponent {
  selectedZones: any = [];
  data!: TreeNode[];
  selectZoneCollection: any = [];
  userId = ""



  constructor(
    private commonService: CommonmasterService,
    public dialogRef: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private loaderService: LoaderService) { }

  ngOnInit(): void {
    let sessionData: any = sessionStorage.getItem('userData');
    let zonesStr = JSON.parse(sessionData)?.zoneAccessArea;
    this.userId = JSON.parse(sessionData)?.userId;

   
    

    if (zonesStr !== null) {
      this.selectZoneCollection = zonesStr.split(',');
    } else {
      this.selectZoneCollection = [];
    }

    console.log("CONFIG DATA ===>", this.config.data, this.selectZoneCollection);
    this.getAccessArea();
  }


  closeDialog() {
    this.dialogRef.close()
  }

  getAccessArea() {
    this.commonService.getStateCityZone().subscribe((res: any) => {
      let treeZoneData: any = this.commonService.generateStateCityZoneTree(res.stateList, this.selectZoneCollection)
      this.data = treeZoneData.tree
      this.selectedZones = treeZoneData.zones
      console.log("ACCESS AREA RES ===>", treeZoneData)

      this.data.forEach((node) => {
        this.expandRecursive(node, true);
      });
    })
  }


  expandRecursive(node: TreeNode, isExpand: boolean) {
    node.expanded = isExpand;
    if (node.children) {
      node.children.forEach((childNode) => {
        this.expandRecursive(childNode, isExpand);
      });
    }
  }
  selectAccess() {
    this.loaderService.loadingSub.next(true)
    console.log('selectAccess method called');
    let zoneCollection: any[] = [];

    this.selectedZones.forEach((ele: any) => {
      if (ele.zoneId) {
        zoneCollection.push(ele.zoneId);
      }
    });

    let zoneCollectionString = zoneCollection.join(",");
    let reqObj: any = {
      "UserId": this.userId,
      "ZoneAccessArea": zoneCollectionString,
    };

    this.commonService.setUpdateArea(reqObj).subscribe((res: any) => {
      this.loaderService.loadingSub.next(false)
      if (res.success) {
        reqObj['Success'] = true;
        console.log('zoneAccess Area if it is true');

        // Store the selected zone area in localStorage
        
        let sessionData: any = sessionStorage.getItem('userData');
        let zonesStr = JSON.parse(sessionData);
        zonesStr.zoneAccessArea = zoneCollectionString;
        console.log('ZoneHtml', zonesStr.toString())
        sessionStorage.setItem('userData', JSON.stringify(zonesStr)); 
      } else {
        reqObj['Success'] = false;
        console.log('zoneAccess Area if it is false');
      }
      this.dialogRef.close(reqObj);
    });
  }




}
