import { Component, input, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Car } from './car.model';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import  {CarService} from '../car/car.service'
@Component({
  selector: 'app-car',
  imports: [MatCardModule, MatIcon],
  templateUrl: './car.html',
  styleUrl: './car.css'
})
export class CarItem {

 @Input() car!: Car;

  constructor(private router : Router , private carService:CarService){
  
  }

  currentIndex = 0;
  


  prevImage(event:Event) {
    event.stopPropagation();
    if (!this.car?.images) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.car.images.length) % this.car.images.length;
  }

  nextImage(event:Event) {
    event.stopPropagation();
    if (!this.car?.images) return;
    this.currentIndex = (this.currentIndex + 1) % this.car.images.length;
  }


  onOpenPage(car: Car){
    console.log(this.carService.getCarIdFromSnapshot(car));
    this.router.navigate(['/car', this.carService.getCarIdFromSnapshot(car)]);
  }

}
