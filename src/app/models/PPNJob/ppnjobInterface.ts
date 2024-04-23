export interface Products {
  code: string;
  productname: string;
}

export interface PpnTypeOption {
  ppnCategoryId: string;
  ppnCategory: string;
}

export interface instaspectOptions {
  code: string;
  option: string;
}

export interface firstDiversionOptions {
  code: string;
  option: string;
}

export interface taskLeadOptions {
  code: string;
  option: string;
}
export interface pickupConfirmOption {
  code: string;
  option: string;
}

export interface CreateMotorJob {
  ServiceType: string;
  CustomerPincode: string;
  PPNType: string;
  PPNId: string;
  CustomerLocation: string;
  PPNAddress: string;
  ClaimNumber: string;
  VehicleNumber: string;
  CustomerContactNo: string;
  CustomerName: string;
  VehicleColor: string;
  InstaspectStatus: string;
  CustomerAddress: string;
  AlternateContactNo: string;
  DSCMName: string;
  FirstDiversionPitch: string;
  TaskLeadSource: string;
  ClaimIntiationDate: string;
  ConfirmedPickUp: string;
  PreferredTimePickUp: string;
  StartSlot: string;
  EndSlot: string;
  CreatedBy: string;
  CustomerLat: string,
  CustomerLong: string,
  VerticalId: string,
  ZoneId: string,

  DSCMContactNo: string,
  PPName: string,
  PPNContactNo: string

  InspectionAddress: string, 
  InspectionLocation: string,
  InstaspectTime: string,
  ClaimType: string
}

export interface CreateHealthJob {
  ServiceType: string
  CustomerPincode: string
  CustomerLat: string
  CustomerLong: string
  CustomerName: string
  ClaimNumber: string
  CustomerAddress: string
  CustomerProofIdNumber: string
  CustomerContactNo: string
  AlternateContactNo: string
  POCName: string
  POCContactNo: string
  POCAddress: string
  SpecificationOfDocter: string
  POCIdProof: string
  POCIdNumber: string
  HospitalName: string
  MarkedAddress: string
  AddressType: string
  DocumentCollection: string
  OtherDocuments: string
  StartSlot: string
  EndSlot: string
  CreatedBy: string
  ZoneId: string
}

export interface pickUpOptions {
  code: string;
  option: string;
}
export interface documentListOptions {
  name: string,
  code: string
}

export interface hospitalAddress {
  code: string;
  option: string;
}

export class motorJobResponseUiModel {
  IsEdit: boolean = false;
  AddressType:string;
  Assigned:string;
  City:string;
  ClaimNumber:string;
  CreatedOn:string;
  CustomerAddress:string;
  CustomerIdProofNumber:string;
  CustomerName:string;
  CustomerPhone:string;
  DSCMName:string;
  DocumentCollection:string;
  EndSlot:string;
  HospitalName:string;
  JobId:string;
  JobSubType:string;
  OtherDocuments: string;
  AlternatePOCNo: string;
  POCAddress:string;
  POCContactNo:string;
  POCIdProof:string;
  POCName:string;
  PPNAddress:string;
  PPNName:string;
  Pincode:string;
  StartSlot:string;
  Status:string;
  ZoneId: string; 
  ClaimIntimationDate:string
  ConfirmedPickUp:string
  PickUp:string
  CustomerLocation:string
  InstaspectTime:string
  DCSMContact:string
  InstaspectStatus:string
  FirstDiversionPitch:string
  CustomerContactNo:string
  PPNId:string
  PPNType:string
  PPNContact:string
  TaskLeadSource:string
  PreferredTimePickUp:string
  VehicleColor:string
  navigationId:number
  VehicleNumber:string
}

export class EditMotorJobRequest {
  
  JobId: string;
  JobProductType: string;
  PPNType: string;
  PPNId: string;
  VehicleColor: string;
  InstaspectStatus: string;
  ConfirmedPickUp: string;
  DCSMContact: string;
  ModifiedBy: string;

}

export class RescheduleJobRequest {
  JobId: string;
  StartSlot: string;
  EndSlot: string;
  RescheduleRequestedBy: string;
  ModifiedBy: string;
}
