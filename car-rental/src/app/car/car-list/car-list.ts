import { Component, signal } from '@angular/core';
import { Car } from '../car.model';
import { CarService } from '../car.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarItem } from '../car';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ViewportScroller } from '@angular/common';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

interface numberOfSeats {
  value: string;
}
interface yearModel {
  value: string;
}

@Component({
  selector: 'app-car-list',
  imports: [
    CommonModule,
    CarItem,
    MatProgressSpinnerModule,
    FormsModule,
    MatInput,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './car-list.html',
  styleUrl: './car-list.css',
})
export class CarList {
  cars$: Observable<Car[]>;
  loading = signal(true);

  constructor(
    carService: CarService,
    private viewportScroller: ViewportScroller
  ) {
    this.loading.set(true);
    this.cars$ = carService.getCars();

    this.cars$.subscribe((cars) => {
      console.log(cars);
      this.loading.set(false);
    });
  }

  scrollToCars(event: Event) {
    event.preventDefault();
    const el = document.getElementById('car-list');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  selectedSeat!: string;
  selectedYear!: string;

  numberOfSeats: numberOfSeats[] = [
    { value: '' },
    { value: '4' },
    { value: '5' },
    { value: '7' },
  ];

  yearModel: yearModel[] = [
    { value: '' },
    { value: '2020' },
    { value: '2021' },
    { value: '2022' },
    { value: '2023' },
    { value: '2024' },
    { value: '2025' },
    { value: '2026' },
    { value: '2027' },
  ];
}
