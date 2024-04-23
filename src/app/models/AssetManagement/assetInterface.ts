export interface Accesslevel {
    ZoneName: string;
    ZoneId: string;
}

export interface SecondAccessLevel {
    code: string
    name: string
}

export interface AccessList {
  AccessId: string,
  AccessName: string
}

export interface CityList {
  CityId: string,
  CityName: string
}


export interface CreateRiderRequest {
  Capacity:string
  Createdby: string
  MobileNo: string
  ModifiedBy: string
  PrimaryAccessArea: string
  PrimaryAccessLevel: string
  SecondaryAccessArea: string
  SecondaryAccessLevel: string
  SkillSet: string
  UserId: string
  Username: string
}
