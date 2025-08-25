import { Injectable } from '@angular/core';
import { Car } from './car.model';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData,doc, docData } from '@angular/fire/firestore';
import { updateDoc,deleteDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CarService {

   constructor(private firestore: Firestore) {}

  getCars(): Observable<Car[]> {
    const carCollection = collection(this.firestore, 'cars');
    return collectionData(carCollection, { idField: 'id' }) as Observable<Car[]>;
  }

  addCar(car: Car) {
    const carCollection = collection(this.firestore, 'cars');
    
    return addDoc(carCollection, car);
  }

  getCarIdFromSnapshot(car: any): string {
  return car.id;
}

  getCarById(id: string): Observable<Car | undefined> {
    const carDocRef = doc(this.firestore, `cars/${id}`);
    return docData(carDocRef, { idField: 'id' }) as Observable<Car | undefined>;
  } 
  
 updateCar(id: string | undefined, car: Car) {
    const carDocRef = doc(this.firestore, `cars/${id}`);
    return updateDoc(carDocRef, { ...car }); 
  }
   deleteCar(id: string ) {
    const carDocRef = doc(this.firestore, `cars/${id}`);
    return deleteDoc(carDocRef);
  }

}
