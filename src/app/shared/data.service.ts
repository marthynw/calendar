import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentDate = new Date();

  private dateSubject: BehaviorSubject<Date> =
    new BehaviorSubject(this.currentDate);

  dateObservable = this.dateSubject.asObservable();

  setDateSubject(value: Date) {
    this.dateSubject.next(value);
  }

  constructor() { }
}
