import { IBaseResponse } from '../CommonInterface/CommonInterface.model'

export interface ICountReqObj {
  JobType: string
  VerticalId: string
  StartDate: string
  EndDate: string
  ZoneId: string[]
}

export interface ICountResponse {
  Active: number
  Done: number
  FirstContact: number
  Assigned: number
  NotAssigned: number
  OnJobs: number
  Cancelled: number
  success: boolean
  errorMessage: any
  errorCode: any
  CorelationId: string
}

export interface IJobsReqObj {
  JobType: string
  Status: string
  VerticalId: string
  StartDate: string
  EndDate: string
  ZoneId: string[]
}

export interface IJobResponse {
  CustomerName: string
  ClaimNumber: string
  JobSubType: string
  JobId: string
  StartSlot: string
  EndSlot: string
  Assigned: string
  City: string
  Status: string
  CustomerContactNo: string
  AlternatePOCNo: string
  DSCMName: string
  CreatedOn: string
  Pincode: string
  PPNName: string
  CustomerAddress: string
  PPNAddress: string
  ZoneId: string
  PPNType: string
  PPNId: string
  PPNContact: string
  VehicleNumber: string
  VehicleColor: string
  InstaspectStatus: string
  FirstContactStatus: string
  InstaspectSource: string
  InstaspectTime: string
  FirstDiversionPitch: string
  TaskLeadSource: string
  ClaimIntimationDate: string
  ConfirmedPickUp: string
  PreferredTimePickUp: string
  CustomerLocation: string
  DCSMContact: string
  CustomerIdProofNumber: any
  POCName: any
  POCContactNo: any
  POCAddress: any
  POCIdProof: any
  AddressType: any
  HospitalName: any
  DocumentCollection: any
  OtherDocuments: any
}

export interface IRiderDetailsReqObj {
  ZoneId: string
  StartSlot: string
  EndSlot: string
}

export interface IRiderDetails {
  RiderName: string
  RiderId: string
  RemainingCapacity: number
}

export interface IRiderDetailsResponse extends IBaseResponse {
  riderDetails: IRiderDetails[]
}

export interface IAssignRiderJobReqObj {
  JobId: string
  AssignedTo: string
  ReAssign: boolean
  ActivityBy: string
}

export interface IUpdateDCSMReqObj {
  JobId: string
  JobProductType: string
  FirstContactStatus: string
  InstaspectStatus: string
  InstaspectSource: string
  ModifiedBy: string
}

export interface ICancelJobReqObj {
  JobId: string
  CancelledBy: string
  ReasonOfCancelId: string
  PPNCategoryId: string
  GarageTypeId: string
  CancelRemarks: string
}

export interface IJobHistoryReqObj {
  JobId: string
}



export interface IJobHistoryResponse {
  JobStatus: IJobStatus[]
  success: boolean
  errorMessage: any
  errorCode: any
  CorelationId: string
}

export interface IJobStatus {
  StatusId: string
  Value: string
  Description?: string
  Comment?: IComment[]
  PPNImages?: any[]
  VehicleImages?: IVehicleImage[]
  AdditionalImages?: IAdditionalImage[]
  SignatureImage?: ISignatureImage
  CreatedBy: string
  RiderLatitude?: string
  RiderLongitude?: string
  EntryTimeStamp: string
}

export interface IComment {
  Key: string
  Value: string
}

export interface IVehicleImage {
  Key: string
  Value: any
  StoragePath: any
  S3Key: string
}

export interface IAdditionalImage {
  Key: string
  Value: any
  StoragePath: any
  S3Key: string
}

export interface ISignatureImage {
  Key: any
  Value: any
  StoragePath: any
  S3Key: any
}
