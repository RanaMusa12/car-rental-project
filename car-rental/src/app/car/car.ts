import { Component, input, Input, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Car } from './car.model';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import  {CarService} from '../car/car.service'
import { RentService } from '../history/rent.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-car',
  imports: [MatCardModule, MatIcon, CommonModule],
  templateUrl: './car.html',
  styleUrl: './car.css'
})
export class CarItem implements OnInit {

 @Input() car!: Car ;

  constructor(private router : Router , private carService:CarService, private rentService: RentService){
  
  }

  currentIndex = 0;
 
 isAvailableToday: boolean | null = null;
  
ngOnInit() {
  this.rentService.isCarAvailableToday(this.car.id).then(available => {
    this.isAvailableToday = available;
  });
}
  


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
