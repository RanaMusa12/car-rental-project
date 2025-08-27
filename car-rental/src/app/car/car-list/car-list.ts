import { Component, signal } from '@angular/core';
import { Car } from '../car.model';
import { CarService } from '../car.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarItem } from "../car";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-car-list',
  imports: [CommonModule, CarItem,MatProgressSpinnerModule],
  templateUrl: './car-list.html',
  styleUrl: './car-list.css'
})
export class CarList {

   cars$: Observable<Car[]>;
   loading = signal(true);

constructor(carService: CarService, private viewportScroller: ViewportScroller) {
  this.loading.set(true);
  this.cars$ = carService.getCars();

  this.cars$.subscribe(cars => {
    console.log(cars);
    this.loading.set(false);  // stop spinner once data arrives
  });
}
scrollToCars(event: Event) {
  event.preventDefault(); // stops the anchor from refreshing page
  const el = document.getElementById('car-list');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


}
