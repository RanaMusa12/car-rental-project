import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData,doc, docData, setDoc, query, getDocs } from '@angular/fire/firestore';
import { updateDoc,deleteDoc } from '@angular/fire/firestore';
import { carHistory } from './History.model';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RentService {


userId?: string;

constructor(private firestore: Firestore, private authService: AuthService) {
  this.authService.user$.subscribe(user => {
    this.userId = user?.uid ?? undefined;
  });
}

addRecord(record: carHistory) {
  if (!this.userId) throw new Error('User not logged in');
  
  const userHistoryCollection = collection(
    this.firestore,
    `rentals/${this.userId}/history`
  );

  return addDoc(userHistoryCollection, record);
}

 getUserHistory(userId: string): Observable<carHistory[]> {
    const userHistoryCollection = collection(
      this.firestore,
      `rentals/${userId}/history`
    );
    return collectionData(userHistoryCollection, { idField: 'id' }) as Observable<carHistory[]>;
  }


 async addReservation(reservation: {carId: string; from: Date; to: Date }) {
    // Path: reservations/{carId}/all
    const carReservationsRef = collection(this.firestore, `reservations/${reservation.carId}/all`);

    // Add the reservation and let Firestore generate the ID
    const newDoc = await addDoc(carReservationsRef, {
      ...reservation,
      byUser: this.userId,
      from: reservation.from, 
      to: reservation.to,
      reservedAt: new Date()
    });

    return newDoc.id;
  }


   async isCarAvailable(carId: string, from: Date, to: Date): Promise<boolean> {
    const reservationsRef = collection(this.firestore, `reservations/${carId}/all`);
    const q = query(reservationsRef);
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const res = doc.data() as any;
      const resFrom = res.from.toDate ? res.from.toDate() : new Date(res.from);
      const resTo = res.to.toDate ? res.to.toDate() : new Date(res.to);

      // overlap check: (start < existingEnd) && (end > existingStart)
      if (from <= resTo && to >= resFrom) {
        return false; // already reserved in this range
      }
    }

    return true; // no conflicts
  }

async isCarAvailableToday(carId: string | undefined): Promise<boolean> {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize to start of today
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const reservationsRef = collection(this.firestore, `reservations/${carId}/all`);
  const q = query(reservationsRef);
  const querySnapshot = await getDocs(q);

  for (const docSnap of querySnapshot.docs) {
    const res = docSnap.data() as any;

    const resFrom: Date = res.from.toDate ? res.from.toDate() : new Date(res.from);
    const resTo: Date = res.to.toDate ? res.to.toDate() : new Date(res.to);

    // check if TODAY falls inside [resFrom, resTo]
    if (today <= resTo && tomorrow > resFrom) {
      return false; // car is already reserved today
    }
  }

  return true; // free all day
}

}
