import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AuthService } from '../shared/auth.service';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const fireAuthStub = {
    authState: new BehaviorSubject(true),
    auth: {
      signInWithEmailAndPassword() {
        return Promise.reject();
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [
        AngularFireModule,
        AngularFireAuthModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        {provide: AngularFireAuth, useValue: fireAuthStub},
        {provide: AuthService, useClass: AuthService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
