import { Component, input, Input} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Car } from './car.model';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-car',
  imports: [MatCardModule, MatIcon],
  templateUrl: './car.html',
  styleUrl: './car.css'
})
export class CarItem {

 @Input() car!: Car;

  currentIndex = 0;


  prevImage() {
    if (!this.car?.images) return;
    this.currentIndex =
      (this.currentIndex - 1 + this.car.images.length) % this.car.images.length;
  }

  nextImage() {
    if (!this.car?.images) return;
    this.currentIndex = (this.currentIndex + 1) % this.car.images.length;
  }


}
