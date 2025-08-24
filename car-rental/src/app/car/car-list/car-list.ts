import { Component } from '@angular/core';
import { Car } from '../car.model';
import { CarService } from '../car.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CarItem } from "../car";


@Component({
  selector: 'app-car-list',
  imports: [CommonModule, CarItem],
  templateUrl: './car-list.html',
  styleUrl: './car-list.css'
})
export class CarList {

   cars$: Observable<Car[]>;

constructor(carService: CarService) {
  this.cars$ = carService.getCars();

  // Debug log without breaking async pipe
  this.cars$.subscribe(cars => console.log(cars));
}

  

}
