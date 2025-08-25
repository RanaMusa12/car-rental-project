import { Component, inject, ChangeDetectionStrategy, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CarService } from '../../car.service';
import { Car } from '../../car.model';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDatepickerModule,
    MatDialogClose,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    CommonModule,
    MatButton,
  ],
  styleUrls: ['./dialog.css'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  readonly dialogRef = inject(MatDialogRef<Dialog>);

  car$!: Observable<Car | undefined>;
  fromDate!: Date;
  toDate!: Date;



  constructor(
    private carService: CarService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    // ✅ You can use this immediately
    this.car$ = this.carService.getCarById(this.data.id);
    console.log(this.car$)
  }


  onRent(form: NgForm) {
    console.log(form.value.fromDate);
    console.log(form.value.toDate);



  }



  onNoClick(): void {
    this.dialogRef.close();
  }

 
}
