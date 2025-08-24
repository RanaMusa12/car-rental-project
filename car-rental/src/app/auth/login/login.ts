
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
  constructor(private authService:AuthService){}
  router = inject(Router);

   hide = signal(true);
     clickEvent(event: MouseEvent) {
        this.hide.set(!this.hide());
        event.stopPropagation();

     }

       
  onSubmit(f:NgForm){
     this.loading.set(true); // Start spinner

    console.log(f.value);
    this.authService.login(f.value.email, f.value.password).subscribe(() => {

      this.router.navigateByUrl('/');
      this.loading.set(false);
    })

  }


}