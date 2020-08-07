import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  const fireAuthStub = {
    authState: new BehaviorSubject(true),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: AngularFireAuth, useValue: fireAuthStub}
      ],
      imports: [
        AngularFireAuthModule,
        AngularFireModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
