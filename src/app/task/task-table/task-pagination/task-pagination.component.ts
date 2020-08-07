import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-pagination',
  templateUrl: './task-pagination.component.html',
  styleUrls: ['./task-pagination.component.css']
})
export class TaskPaginationComponent implements OnInit {
  @Input() gotDate: Date;
  @Output() changedDateToEmit = new EventEmitter<Date>();

  faAngleUp = faAngleUp;
  faAngleDown = faAngleDown;

  constructor() { }

  ngOnInit(): void {
  }

  increase() {
    let day = this.gotDate.getDate();
    const month = this.gotDate.getMonth();
    const year = this.gotDate.getFullYear();
    this.gotDate = new Date(year, month, day += 1);
    this.emit(this.gotDate);
  }

  decrease() {
    let day = this.gotDate.getDate();
    const month = this.gotDate.getMonth();
    const year = this.gotDate.getFullYear();
    this.gotDate = new Date(year, month, day -= 1);
    this.emit(this.gotDate);
  }

  emit(date: Date) {
    this.changedDateToEmit.emit(date);
  }

}
