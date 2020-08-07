import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authErrorMessage$ = new Subject<string>();
  public uid$ = new Subject<string>();

  constructor(private afAuth: AngularFireAuth,
              private router: Router) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/calendar']);
      })
      .catch(error => {
        this.authErrorMessage$.next(error.message);
      });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  register(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
    .then(value => {
      this.router.navigate(['calendar']);
    })
    .catch(error => {
      this.authErrorMessage$.next(error.message);
    });
  }

  getUID() {
    this.afAuth.authState.subscribe(user => {
      if (user !== null) {
        this.uid$.next(user.uid);
      }
    });
  }

}
