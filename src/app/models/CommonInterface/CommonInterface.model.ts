export interface EncryptedKvUIModel {
  msg: any
}

export interface ZonesModel {
  ZoneName: string;
  ZoneId: string;
}

export interface IGarageTypes {
  GarageTypeId: string,
  GarageType: string
}

export interface IPPNType {
  ppnCategoryId:string,
  ppnCategory: string
}

export interface ICanelReasonResponse extends IBaseResponse {
  reason: ICancelReasonName[]
}

export interface ICancelReasonName {
  ReasonId: number,
  ReasonDetail: string
}

export interface IVerticalResponse extends IBaseResponse{
  vertical: IVertical[]
}
export interface IVertical {
  VerticalId: number
  VerticalName: string
}

export interface IBaseResponse {
  success: boolean
  errorMessage: any
  errorCode: any
  CorelationId: string
}
