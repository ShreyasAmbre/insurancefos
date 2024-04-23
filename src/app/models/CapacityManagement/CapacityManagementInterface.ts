export interface CreateUpdateSlotRequest{
  ZoneId: String;
  SlotFrom: String;
  SlotTo: String;
  WeekDay: String;
  BookingRatio: String;
  CreatedBy: String;
  SlotId: String;
}


export interface RemoveSlot {
  ZoneId: string;
  SlotId: string;
}
