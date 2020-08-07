import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public errorMessage$ = this.auth.authErrorMessage$;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(email: string, password: string) {
    this.auth.login(email, password);
  }

  tryRegister(email: string, password: string) {
    this.auth.register(email, password);
  }

}
