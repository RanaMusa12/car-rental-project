
import { Component , signal, ChangeDetectionStrategy, inject} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
//import { AuthServiceTs } from '../../auth.service.ts';
import { Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
imports: [MatInputModule, MatFormFieldModule,MatCheckboxModule, MatButtonModule, MatIconModule, FormsModule,RouterLink, RouterLinkActive, MatProgressSpinnerModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
    loading = signal(false);
//authService = inject(AuthServiceTs)
    error:string='';

  constructor(private authService:AuthService){}
  router = inject(Router);

   hide = signal(true);
     clickEvent(event: MouseEvent) {
        this.hide.set(!this.hide());
        event.stopPropagation();

     }

 onSubmit(f: NgForm) {
  this.loading.set(true);

  this.authService.login(f.value.email, f.value.password).subscribe({
    next: (userCredential) => {
      console.log("Login successful:", userCredential);
      this.loading.set(false);
      this.router.navigateByUrl('/');
    },
    error: (err) => {
      console.error('Login failed', err);
      this.loading.set(false);
      this.error = "Password or email is incorrect, please try again.";
    }
  });
}










}