import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { faSignOutAlt,
         faCalendar,
         faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  faSignOutAlt = faSignOutAlt;
  faCalendar = faCalendar;
  faTasks = faTasks;

  constructor(public router: Router,
              public fireAuth: AuthService) { }

  ngOnInit(): void {
  }

}
