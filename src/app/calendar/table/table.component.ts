import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/shared/crud.service';
import { Task } from '../../shared/task.model';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  days = ['M', 'Tu', 'W', 'Th', 'F', 'Sa',
  'Su'];

  currentDay = new Date().getDate();

  year = new Date().getFullYear();
  month = new Date().getMonth();
  firstDayOfMonth = new Date(this.year, this.month, 1).getDay();
  lastDayOfMonth = new Date(this.year, this.month + 1, 0).getDate();

  firstWeek: Date[] = [];
  secondWeek: Date[] = [];
  thirdWeek: Date[] = [];
  fourthWeek: Date[] = [];
  fifthWeek: Date[] = [];
  sixthWeek: Date[] = [];

  from: number;
  to: number;

  changedDate: Date;
  tasksArray: Task[];
  uid: string;

  constructor(private crud: CrudService,
              private auth: AuthService,
              private data: DataService) {
  }

  ngOnInit(): void {
    this.createMonth();
    this.auth.getUID();
    this.auth.uid$.subscribe(value => {
      this.uid = value;
      if (this.uid) {
        this.readTask();
      }
    });
  }

  readTask() {
    this.crud.getTaskForCalendar(this.uid).subscribe(anArray => {
      this.tasksArray = anArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Task
        };
      });
    });
  }

  correctSunday() {
    // change first day if it is Sunday from 0 to 7
    if (this.firstDayOfMonth === 0) {
      this.firstDayOfMonth = 7;
    }
  }

  setFromAndTo(previousWeek: Date[]) {
      if (previousWeek[previousWeek.length - 1] !== undefined) {
        this.from = previousWeek[previousWeek.length - 1].getDate() + 1;
        this.to = previousWeek[previousWeek.length - 1].getDate() + 7;
      }
  }

  popWeekArrays(week: Date[], day?: number) {
    let date = new Date();
    this.decideDate();
    for (let i = this.from; i < this.to + 1; i++) {
      if (day !== undefined) {
        week[day + i - 2] = date = new Date(this.year, this.month, i);
      } else {
        week.push(date = new Date(this.year, this.month, i));
      }
    }
  }

  decideDate() {
    if (this.changedDate) {
      this.year = this.changedDate.getFullYear();
      this.month = this.changedDate.getMonth();
    }
  }

  pushUndefined(week: any[]) {
    if (0 < week.length && week.length < 7) {
      for (let i = week.length; i < 7; i++) {
        week.push(undefined);
      }
    }
  }

  fillFirstWeek() {
    this.correctSunday();
    this.from = 1;
    this.to = 8 - this.firstDayOfMonth;
    this.popWeekArrays(this.firstWeek, this.firstDayOfMonth);
  }

  fillWeek(previousWeek: any[], week: any[]) {
    this.setFromAndTo(previousWeek);
    this.popWeekArrays(week, undefined);
  }

  fillLastWeek(previousWeek: any[], week: any[]) {
    this.setFromAndTo(previousWeek);
    if (this.to > this.lastDayOfMonth) {
      this.to = this.lastDayOfMonth;
    }
    if (previousWeek[previousWeek.length - 1] !== undefined) {
      this.popWeekArrays(week, undefined);
      this.pushUndefined(week);
    }
  }

  createMonth() {
    this.fillFirstWeek();
    this.fillWeek(this.firstWeek, this.secondWeek);
    this.fillWeek(this.secondWeek, this.thirdWeek);
    this.fillWeek(this.thirdWeek, this.fourthWeek);
    this.fillLastWeek(this.fourthWeek, this.fifthWeek);
    this.fillLastWeek(this.fifthWeek, this.sixthWeek);
  }

  setLastDayOfMonth() {
    const gotYear = this.changedDate.getFullYear();
    const gotMonth = this.changedDate.getMonth();
    this.lastDayOfMonth = new Date(gotYear, gotMonth + 1, 0).getDate();
  }

  checkToday(date: Date) {
    const today = new Date().toLocaleDateString('en-US');
    if (date !== undefined) {
      if (date.toLocaleDateString('en-US') === today) {
        return true;
      } else {
        return false;
      }
    }
  }

  onDate(date: Date) {
    this.changedDate = date;
    this.firstDayOfMonth = date.getDay();
    this.setLastDayOfMonth();
    this.firstWeek.length = 0;
    this.secondWeek.length = 0;
    this.thirdWeek.length = 0;
    this.fourthWeek.length = 0;
    this.fifthWeek.length = 0;
    this.sixthWeek.length = 0;
    this.createMonth();
  }

  sendDateToService(date: Date) {
    this.data.setDateSubject(date);
  }

}
