import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Output() dateToEmit = new EventEmitter<Date>();

  faAngleDown = faAngleDown;
  faAngleUp = faAngleUp;

  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  currentDate = new Date(this.currentYear, this.currentMonth);

  constructor() { }

  ngOnInit(): void {
  }

  changeDate(date: Date) {
    this.dateToEmit.emit(date);
  }

  increaseYear() {
    this.currentDate = new Date(this.currentYear += 1, this.currentMonth);
    this.changeDate(this.currentDate);
  }

  decreaseYear() {
    this.currentDate = new Date(this.currentYear -= 1, this.currentMonth);
    this.changeDate(this.currentDate);
  }

  increaseMonth() {
    this.currentDate = new Date(this.currentYear, this.currentMonth += 1);
    this.changeDate(this.currentDate);
  }

  decreaseMonth() {
    this.currentDate = new Date(this.currentYear, this.currentMonth -= 1);
    this.changeDate(this.currentDate);
  }

}
