import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Form, FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { NgForm } from '@angular/forms';
import { CarService } from '../../car/car.service';
import { Car } from '../../car/car.model';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, CommonModule,
    MatDialogClose, FormsModule,MatFormFieldModule,MatIconModule,MatInputModule],
  styleUrls: ['./dialog.css'],
})
export class Dialog {
  readonly dialogRef = inject(MatDialogRef<Dialog>);
  
  constructor(
    private carService : CarService,
    
  ){}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(form: NgForm){
   
    if(form.invalid)
    {
      return;
    }


     const car: Car ={
      name: form.value.name,
      cost: form.value.cost,
      details: form.value.details,
      images: [   
      form.value.image1,
      form.value.image2,
      form.value.image3
    ].filter((img: string) => !!img) 
    }

    this.carService.addCar(car);
  }
}
  