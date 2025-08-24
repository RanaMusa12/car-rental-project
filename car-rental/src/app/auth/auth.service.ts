import { Injectable, inject } from '@angular/core';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Auth, updateProfile, user } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  firebaseAuth = inject(Auth);

  register(email: string, username: string, password: string){
    // create user with email and password
    const promise = createUserWithEmailAndPassword(this.firebaseAuth, email, password);


     
    return from(promise);
  }

    login(email:string, password:string){

    const promise= signInWithEmailAndPassword(this.firebaseAuth, email, password);
    return from(promise);

  }
    logout(): Observable<void>{

    const promise = signOut(this.firebaseAuth);
    return from(promise);

  }


  
}
