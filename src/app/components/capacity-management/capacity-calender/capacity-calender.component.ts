import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CalendarOptions, EventInput, OverlapFunc } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction';
import { addMinutes, compareAsc, format, startOfWeek } from "date-fns";
import { CapacityService } from '../../../services/capacity/capacity.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MeetingDetailsComponent } from '../meeting-details/meeting-details.component';

@Component({
  selector: 'app-capacity-calender',
  templateUrl: './capacity-calender.component.html',
  styleUrls: ['./capacity-calender.component.scss'],
  providers: [DialogService]
})
export class CapacityCalenderComponent implements OnInit, OnChanges {
  @Input() zoneId: string = '';

  calendarOptions: CalendarOptions = {}
  meetingsDates: any
  selectAccessDialogRef: DynamicDialogRef | undefined;


  constructor(private capacityService: CapacityService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.createCalendarCanvas()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getZoneCapacity()
  }



  createCalendarCanvas() {
    this.calendarOptions = {
      // initialView: 'dayGridMonth',
      initialView: 'timeGridWeek',
      plugins: [timeGridPlugin, interactionPlugin],
      dateClick: this.handleDateClick.bind(this),
      // events: [
      //   { title: 'event 1', date: '2024-01-01' },
      //   { title: 'event 2', date: '2024-01-02' }
      // ],
      events: [],
      eventClick: this.handleEventClick.bind(this),
      //eventDidMount: this.eventDidMount.bind(this), // It is used when we want to add new element below the event
      initialDate: new Date(),
      headerToolbar: {
        left: '', // Remove the left side of the header
        center: '',
        right: '' // Remove the right side of the header
      },
      views: {
        timeGrid: {
          allDaySlot: false, // Remove the all-day slot in the timeGrid view
          slotMinTime: '08:30:00', // Set the minimum time to 8:30 AM
          slotMaxTime: '18:30:00', // Set the maximum time to 7:30 PM

          type: 'timeGridWeek',
          dayHeaderContent: (arg) => {
            // Extract and display only the day
            const day = arg.date.toLocaleString('default', { weekday: 'long' });
            return `${day}`;
          }
        }
      },
      editable: false,
      firstDay: 1,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true
    };
  }

  getZoneCapacity() {
    this.capacityService.getZoneWiseCapacity(this.zoneId).subscribe((res: any) => {
      this.meetingsDates = res.capacityLists
      //console.log("CAPACITY RES ===>", this.meetingsDates)
      let arr:any = []
      //for (const day in this.meetingsDates) {
      //  arr = arr.concat(this.meetingsDates[day])
      //}

      for (const day in this.meetingsDates) {
        let data = (this.meetingsDates[day]).map((ele:any) => {
          let obj = this.convertToISODate(day, ele.DateOfDay, ele.SlotFrom, ele.SlotTo, ele.SlotId, ele.BookingRatio, ele.CapacityVolume)
          return obj
        })
        arr = arr.concat(data)
      }
      //console.log("CAPACITY RES ===>", arr)
      this.calendarOptions['events'] = arr 


    }, (error: any) => {
      this.calendarOptions['events'] = []
      console.log("ERROR ", error)
    })
  }

  convertToISODate(day: any, date:any, startingMin: any, endingMin: any, slotId: any , bookingRatio: any, capacityVolume:any) {
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
        title: `Capacity ${capacityVolume}` ,
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

  handleDateClick(arg: any) {
    //console.log("MEETING DATE ===>", arg)
    const endTime = addMinutes(arg.date, 120);
    let selectDay = format(arg.date, 'EEEE')
    let allSlots:any = this.calendarOptions['events']
    let selectedWeekSlot = allSlots.filter((ele:any) => ele.day === selectDay)
    //console.log("MEETING DATE ===>", selectDay, selectedWeekSlot)
    
    this.selectAccessDialogRef = this.dialogService.open(MeetingDetailsComponent, {
      data: { argFromCalender: arg, startTime: arg.date, endTime: endTime, zoneId: this.zoneId, action: 'create', slotsData: selectedWeekSlot },
      header: 'Create Slot',
      width: '50%',
      height: 'auto',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.selectAccessDialogRef.onClose.subscribe((data: any) => {
      console.log("CREATE SLOT POPUP CLOSE", data)
      this.getZoneCapacity()
    });
  }

  handleEventClick(info: any) {

    const event = info.event;
    console.log("EVENT INFO ===>", event)

    let selectDay = format(event.start, 'EEEE')
    let allSlots: any = this.calendarOptions['events']
    let selectedWeekSlot = allSlots.filter((ele: any) => ele.day === selectDay)


    let eventData = {
      start: event.start,
      end: event.end,
      slotid: info.el.fcSeg.eventRange.def.extendedProps.slotid,
      bookration: info.el.fcSeg.eventRange.def.extendedProps.bookingratio
    }
    console.log("CAL EVENT", eventData)

    this.selectAccessDialogRef = this.dialogService.open(MeetingDetailsComponent, {
      data: {
        argFromCalender: info, startTime: eventData.start, endTime: eventData.end, zoneId: this.zoneId, action: 'edit',
        slotId: eventData.slotid, bookingration: eventData.bookration, slotsData: selectedWeekSlot
      },
      header: 'Edit Slot',
      width: '50%',
      height: 'auto',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
    });

    this.selectAccessDialogRef.onClose.subscribe((data: any) => {
      console.log("EDIT SLOT POPUP CLOSE", data)
      this.getZoneCapacity()
    });

  }

}
