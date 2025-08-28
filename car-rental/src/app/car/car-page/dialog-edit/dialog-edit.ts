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
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.html',
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
  styleUrls: ['./dialog-edit.css'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogEdit {
  readonly dialogRef = inject(MatDialogRef<Dialog>);
  car$!: Observable<Car | undefined>;
  fromDate!: Date;
  toDate!: Date;
  
  constructor(
    private carService: CarService,
    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.car$ = this.carService.getCarById(this.data.id);
    console.log(this.car$);
  }

  onRent(form: NgForm) {
    console.log(form.value.fromDate);
    console.log(form.value.toDate);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onEdit(id: string | undefined, car: Car) {
    this.carService.updateCar(id, car);
  }
}
