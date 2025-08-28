import { Injectable, inject } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Auth, user } from '@angular/fire/auth';
import { from, Observable, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);
  private readonly ADMIN_UID = 'D38m05VXtCSVF0FwQiyHRP9vQHz2';

  user$: Observable<any>;

  isAdmin$: Observable<boolean>;
  isLoggedIn$: Observable<boolean>;

  constructor(private auth: Auth , private router:Router) {
    this.user$ = user(this.auth);

    this.isAdmin$ = this.user$.pipe(
      map(u => !!u && u.uid === this.ADMIN_UID)
    );
    this.isLoggedIn$ = this.user$.pipe(
    map(u => !!u)
  );
  }

  register(email: string, username: string, password: string) {
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password);
    return from(promise);
  }

  login(email: string, password: string) {
    const promise = signInWithEmailAndPassword(this.firebaseAuth, email, password);
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);

    console.log("logged out");
    this.router.navigate(['/']);
    return from(promise);
  }
}
