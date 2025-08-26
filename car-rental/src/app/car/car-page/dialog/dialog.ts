import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Inject,
} from '@angular/core';
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
import { RentService } from '../../../history/rent.service';
import { AuthService } from '../../../auth/auth.service';
import { ChangeDetectorRef } from '@angular/core';

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
    isAvailable: boolean | null = null;

  constructor(
    private carService: CarService,
    public rentService: RentService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.car$ = this.carService.getCarById(this.data.id);
    console.log(this.car$);
  }

  getTotalCost(car: any, fromDate: Date | null, toDate: Date | null): number {
    if (fromDate && toDate && fromDate < toDate) {
      const diffInTime = toDate.getTime() - fromDate.getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
      return car.cost * diffInDays;
    }
    return 0;
  }

  onRent(form: NgForm, car: any) {
    const fromDate = form.value.fromDate;
    const toDate = form.value.toDate;

    const totalCost = this.getTotalCost(car, fromDate, toDate);

    this.rentService.addRecord({
      carId: car.id,
      car: car.name,
      from: fromDate,
      to: toDate,
      total: totalCost,
    });
    this.rentService.addReservation({
      carId: car.id,
      from: fromDate,
      to: toDate,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }



async checkAvailability(carId: string, fromDate: Date, toDate: Date) {
  if (!fromDate || !toDate) {
    this.isAvailable = null;
    return;
  }

  this.isAvailable = await this.rentService.isCarAvailable(carId, fromDate, toDate);
  
  console.log('Result from Firestore → isAvailable =', this.isAvailable);
  
this.changeDetectorRef.detectChanges();
}

}
