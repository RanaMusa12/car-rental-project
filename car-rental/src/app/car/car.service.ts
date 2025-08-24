import { Injectable } from '@angular/core';
import { Car } from './car.model';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CarService {

  // cars: Car[] =[];


   constructor(private firestore: Firestore) {}

   

  getCars(): Observable<Car[]> {
    const carCollection = collection(this.firestore, 'cars');
    return collectionData(carCollection, { idField: 'id' }) as Observable<Car[]>;
  }

  addCar(car: Car) {
    const carCollection = collection(this.firestore, 'cars');
    
    return addDoc(carCollection, car);
  }
  
}
