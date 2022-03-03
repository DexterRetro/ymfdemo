import { environment } from './../../environments/environment';
import { Event } from './../models/event';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventsServiceService {
  constructor(private http: HttpClient) {}

  async getEvents(): Promise<
    Observable<{ status: string; data: { events: Event[] } } |undefined>
  > {
    return await this.http.get<{
      status: string;
      data: { events: Event[] };
    }>(`${environment.backendAPIURL}/events`);
    
  }

  async getCalender():Promise<Observable<{Calender:{  year:String;
    yearAbbr:String;
    month:String;
    monthAbbr: String;
    weekdays: [String];
    weekdaysAbbr: [String];
    days: Number;
    firstWeekday:Number;
    lastWeekday: Number,
    calendar: [[Number]]}}>>{
    const cal = await this.http.get<{Calender:{  year:String;
      yearAbbr:String;
      month:String;
      monthAbbr: String;
      weekdays: [String];
      weekdaysAbbr: [String];
      days: Number;
      firstWeekday:Number;
      lastWeekday: Number,
      calendar: [[Number]]}}>(`${environment.backendAPIURL}/calendar`);
    return cal;
  }

  ChangeDateFormat(IsoDAte:any) {
    const date = new Date(IsoDAte);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dt = date.getDate();
    let fDt = '';
    let fMnth = this.ChangeMonth(month);

    if (dt < 10) {
      fDt = '0' + dt.toString();
    } else {
      fDt = dt.toString();
    }

    return `${fDt} ${fMnth} ${year}`;
  }
  ChangeMonth(mnt:any) {
    switch (mnt) {
      case 1:
        return 'January';
      case 2:
        return 'February';

      case 3:
        return 'March';

      case 4:
        return 'April';

      case 5:
        return 'May';

      case 6:
        return 'returnJune';

      case 7:
        return 'July';

      case 8:
        return 'August';

      case 9:
        return 'September';

      case 10:
        return 'October';

      case 11:
        return 'November';

      case 12:
        return 'December';
    }
    return'';
  }
}
