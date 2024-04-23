import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PpncreatejobService } from '../../services/ppnjob/ppncreatejob.service';
import { Calendar, CalendarOptions} from '@fullcalendar/core'; // useful for typechecking
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { addDays, endOfWeek, format, formatISO, isBefore, isEqual, parseISO, startOfWeek } from "date-fns";
import { CommonmasterService } from '../../services/common/commonmaster.service';
import { CapacityService } from '../../services/capacity/capacity.service';
import { an } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-slot-calendar',
  templateUrl: './slot-calendar.component.html',
  styleUrls: ['./slot-calendar.component.scss']
})
export class SlotCalendarComponent implements OnInit {
  @ViewChild('fullcalendar') calendarComponent: Calendar;
  @Input() zoneDetails: any = {}
  //@Output() selectedSlotEvent = new EventEmitter();
  @Output() selectedSlotEvent: EventEmitter<any> = new EventEmitter<any>();

  calendarOptions: CalendarOptions = {}
  meetingsDates: any
  slotCollection: any = []
  toasterStatus: boolean = false;
  dateSetCounter = 0
  prevWeekStartData: any = null
  toasterIsSuccess: boolean = true

  constructor(private ppncreateservice: PpncreatejobService, private commonService: CommonmasterService, private capacityService: CapacityService) { }

  ngOnInit(): void {
    //console.log("VERIFY ZONE DETAILS ===>", this.zoneDetails)
    this.createCalendarCanvas()
    //this.getZoneCapacity()
    //this.getSlotData(new Date(), new Date())
    this.getToasterStatus()
  }

  closeSlotCalendar() {
    this.ppncreateservice.showSlotCalendar.next(false)
  }

  createCalendarCanvas() {
    this.calendarOptions = {
      // initialView: 'dayGridMonth',
      initialView: 'timeGridWeek',
      plugins: [timeGridPlugin, interactionPlugin],
      //dateClick: this.handleDateClick.bind(this),
      // events: [
      //   { title: 'event 1', date: '2024-01-01' },
      //   { title: 'event 2', date: '2024-01-02' }
      // ],
      events: [],
      eventTimeFormat: {
        hour: 'numeric',
        minute: '2-digit',
        meridiem: 'short',
      },
      eventClick: this.handleEventClick.bind(this),
      datesSet: this.handleDatesSet.bind(this),
      //eventDidMount: this.eventDidMount.bind(this), // It is used when we want to add new element below the event
      initialDate: new Date(),
      headerToolbar: {
        left: 'prev', // Remove the left side of the header
        center: 'title',
        right: 'next' // Remove the right side of the header
      },
      views: {
        timeGrid: {
          allDaySlot: false, // Remove the all-day slot in the timeGrid view
          slotMinTime: '08:30:00', // Set the minimum time to 8:30 AM
          slotMaxTime: '18:30:00', // Set the maximum time to 7:30 PM
        }
      },
      editable: true,
      firstDay: 1,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true
    };
  }
  handleEventClick(info: any) {
    const event = info.event;
    const currentTime = new Date(); //current date and time
    // dipali: one hour differnece while selecting slot
     const oneHourAhead = new Date(currentTime.getTime() + 60 * 60 * 1000);
     if (event.start < oneHourAhead) 
     {
     this.showToaster("You can not select this slot.")
     return;
    }

    var pastDate = new Date(event.start)
    pastDate.setDate(pastDate.getDate() - 1) //getting past date 
    pastDate.setHours(18)
    pastDate.setMinutes(0)
    pastDate.setSeconds(0);
    if (this.calendarOptions && Array.isArray(this.calendarOptions['events']))
    {
      let length = (this.calendarOptions['events'] as any[]).length
      for (let i = 0; i < length; i++) {
        if ((this.calendarOptions['events'][i].start as Date).getTime() == pastDate.getTime()) {
          this.showToaster("You cannot select this slot.")
          return;
        }
      }
    }
    if (info.event.title != 'Not available') {
     /* alert('The Slot Is Not Available Please Select Different Slot')*/
      let selectedSlotObj = {
        startslot: format(event.start, 'MM/dd/yyyy HH:mm'),
        endslot: format(event.end, 'MM/dd/yyyy HH:mm')
      };
      this.selectedSlotEvent.emit(selectedSlotObj);
    }

    // Close the slot calendar
    this.ppncreateservice.showSlotCalendar.next(false);
  }

  handleDatesSet(info: any) {
    console.log("DATE SET ===>", info, this.dateSetCounter)
    this.getSlotData(info.start, info.end, 'DateSet')
    if (this.prevWeekStartData) {
      if (isBefore(this.prevWeekStartData, info.start)) {
        this.dateSetCounter = this.dateSetCounter + 1
      } else {
        this.dateSetCounter = this.dateSetCounter - 1
      }
    }
    this.prevWeekStartData = info.start
  }

  getSlotData(startDate:any, endDate: any, from?:any) {
    let startWeekMondayDate = formatISO(startOfWeek(startDate, { weekStartsOn: 1 }))
    let endWeekMondayDate = formatISO(endOfWeek(endDate, { weekStartsOn: 1 }))

    let reqObj = {
      ZoneId: String(this.zoneDetails.zoneId),
      FromDate:  startWeekMondayDate,
      ToDate: endWeekMondayDate
    }

    this.commonService.getZoneWiseSlotDetails(reqObj).subscribe((res: any) => {
      if (res.success) {
        let slotsData: any = res.slotList
        console.log("ZONE SLOT DATA RES =>", Object.values(slotsData))
        let slotArrayOfObj:any = Object.values(slotsData) // ex:- [ [{}], [{}] ]
        const combineSlots = [].concat(...slotArrayOfObj) // Spreading all object inside  and concat that in single array
        //console.log("ZONE SLOT DATA RES =>", resultArray)

        const calendarSlotData = combineSlots.map((ele: any) => {
          let obj = {
            title: `${ele.SlotCount} Book Slot`,
            //start: `${ele.SlotFrom}+05:30`,
            //end: `${ele.SlotTo}+05:30`,
            start: parseISO(ele.SlotFrom),
            end: parseISO(ele.SlotTo),
            slotcount: ele.SlotCount 
          }
          return obj
        })
        //this.calendarOptions.events = calendarSlotData
        this.slotCollection = calendarSlotData
        this.getZoneCapacity("DateSet")
        console.log("SLOT CAL SLOT RES =>", this.slotCollection)
      }

    }, (error: any) => {
        this.getZoneCapacity(from)
    })
  }


  getZoneCapacity(from?:any) {
    this.capacityService.getZoneWiseCapacity(this.zoneDetails.zoneId).subscribe((res: any) => {
      this.meetingsDates = res.capacityLists
      //console.log("CAPACITY RES ===>", this.meetingsDates)
      let arr: any = []
      for (const day in this.meetingsDates) {
        let data = (this.meetingsDates[day]).map((ele: any) => {
          //console.log("TIME before ===>", ele.DateOfDay)
          if (from === "DateSet") {
            const inputDate = new Date(ele.DateOfDay);
            const next7DaysDate = addDays(inputDate, 7 * this.dateSetCounter);
            ele['DateOfDay'] = next7DaysDate
            //console.log("TIME next ===>", next7DaysDate)
          }
          let obj = this.commonService.convertToISODate(day, ele.DateOfDay, ele.SlotFrom, ele.SlotTo, ele.SlotId, ele.BookingRatio, ele.CapacityVolume)
          return obj
        })
        arr = arr.concat(data)
      }
      //console.log("SLOT CAL CAP RES ===>", arr)
      this.calendarOptions['events'] = arr

      this.bookSlotCal()

    }, (error: any) => {
      this.calendarOptions['events'] = []
      console.log("ERROR ", error)
    })
  }

  bookSlotCal() {
    let eventSlotData: any = this.calendarOptions['events']
    let newEventSlotEvent = eventSlotData.map((item:any) => {
      let matchSlot = this.slotCollection.find((ele: any) => isEqual(ele.start, item.start))
      if (matchSlot) {
        let pendingSlot = item.capvol - matchSlot.slotcount
        if (pendingSlot <= 0) {
          item['title'] = `Not available`
        } else {
          item['title'] = `${pendingSlot} Book Slot`
        }
      } else {
        item['title'] = `${item.capvol} Book Slot`
      }
      return item
    })
    this.calendarOptions['events'] = newEventSlotEvent
    console.log("CAP RES after CAL  ===>", newEventSlotEvent)

  }


  getToasterStatus() {
    this.commonService.userPopup.subscribe((value: any) => {
      this.toasterStatus = value.status
      this.toasterIsSuccess = value.isSuccess
    })

  }

  showToaster(msg: string) {
    this.commonService.userPopup.next({ status: true, toastMsg: msg, isSuccess: false });
    setTimeout(() => {
      this.commonService.userPopup.next({ status: false, toastMsg: msg, isSuccess: false });
    }, 5000);
  }
}
