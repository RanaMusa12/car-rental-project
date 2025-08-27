import {
  Component,
  inject,
  ChangeDetectionStrategy,
  Inject,
  signal,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
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
import { Router } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';


interface Phone {
  PhoeNumber: number;
}
interface informations {
  carId: string;
  carName: '';
  fromDate: Date;
  toDate: Date;
  total: number;
  userName: string;
}

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
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,

  ],
  styleUrls: ['./dialog.css'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dialog {
  confirmation = signal(false);
  readonly dialogRef = inject(MatDialogRef<Dialog>);

  carId: string = '';
  carName: string = '';
  fromDate!: Date;
  toDate!: Date;
  total!: number;
  userName!: string;
  phoneNumber!: number;
  address!: string;

  nowDate = new Date();

  car$!: Observable<Car | undefined>;
  // fromDate!: Date;
  // toDate!: Date;
  isAvailable: boolean | null = null;

  constructor(
    private carService: CarService,
    public rentService: RentService,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router,


    @Inject(MAT_DIALOG_DATA) public data: { id: string }
  ) {
    this.car$ = this.carService.getCarById(this.data.id);
    console.log(this.car$);
  }
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    addressCtrl: ['', Validators.required],
  });

  thirdFormGroup = this._formBuilder.group({
    phoneCtrl: ['', Validators.required],
  });

  phoneControl = new FormControl<Phone | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  phone: Phone[] = [{ PhoeNumber: 970 }, { PhoeNumber: 972 }];

  getTotalCost(car: any, fromDate: Date | null, toDate: Date | null): number {
    if (fromDate && toDate && fromDate < toDate) {
      const diffInTime = toDate.getTime() - fromDate.getTime();
      const diffInDays = diffInTime / (1000 * 60 * 60 * 24);
      return car.cost * diffInDays;
    }
    return 0;
  }

  record!: informations;

  onRent(form: NgForm, car: any) {
    const fromDate = form.value.fromDate;
    const toDate = form.value.toDate;

    const totalCost = this.getTotalCost(car, fromDate, toDate);

    this.carId = car.id;
    this.carName = car.name;
    this.fromDate = fromDate;
    this.toDate = toDate;
    this.total = totalCost;


  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  async checkAvailability(carId: string, fromDate: Date, toDate: Date) {
    if (!fromDate || !toDate) {
      this.isAvailable = null;
      return;
    }

    this.isAvailable = await this.rentService.isCarAvailable(
      carId,
      fromDate,
      toDate
    );

    console.log('Result from Firestore → isAvailable =', this.isAvailable);

    this.changeDetectorRef.detectChanges();
  }

  onContinuetoConfirmation() {
    this.confirmation.set(true);
  }

  onBacktoDates() {
    this.confirmation.set(false);
  }
  isSameDay(): boolean {
  if (!this.fromDate || !this.toDate) return false;
  return this.fromDate.toDateString() === this.toDate.toDateString();
}


  onConfirm() {

    if(this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
    this.userName = this.firstFormGroup.value.nameCtrl !;
    this.address = this.secondFormGroup.value.addressCtrl !;
    this.phoneNumber= Number(`${this.phoneControl.value?.PhoeNumber }${this.thirdFormGroup.value.phoneCtrl}`);

      this.rentService.addRecord({
        car: this.carName,
        from: this.fromDate,
        to: this.toDate,
        total:this.total
      });
      this.rentService.addReservation({
        carId: this.carId,
        userName: this.userName,
        address: this.address,
        phone :this.phoneNumber,
        from: this.fromDate,
        to: this.toDate,
        total:this.total
      });


      alert(`You rented this car from ${this.fromDate.toLocaleDateString()} to ${this.toDate.toLocaleDateString()} check your history`);

       this.dialogRef.close();
      
    }else{
      return;
    }
    
  }
}
