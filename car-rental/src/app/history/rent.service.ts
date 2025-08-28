import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  docData,
  setDoc,
  query,
  getDocs,
  collectionGroup,
} from '@angular/fire/firestore';
import { updateDoc, deleteDoc } from '@angular/fire/firestore';
import { carHistory } from './History.model';
import { AuthService } from '../auth/auth.service';
@Injectable({
  providedIn: 'root',
})
export class RentService {
  userId?: string;

  constructor(private firestore: Firestore, private authService: AuthService) {
    this.authService.user$.subscribe((user) => {
      this.userId = user?.uid ?? undefined;
    });
  }

  addRecord(record: any) {
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

    return collectionData(userHistoryCollection, {
      idField: 'id',
    }) as Observable<carHistory[]>;
  }

  async addReservation(reservation: any) {
    const carReservationsRef = collection(
      this.firestore,
      `reservations/${reservation.carId}/all`
    );
    const newDoc = await addDoc(carReservationsRef, {
      ...reservation,
      byUser: this.userId,
      from: reservation.from,
      to: reservation.to,
      reservedAt: new Date(),
    });

    return newDoc.id;
  }

  async getAllReservations() {
    const reservationsRef = collectionGroup(this.firestore, 'all');
    const snapshot = await getDocs(reservationsRef);

    return snapshot.docs.map((doc) => {
      const pathParts = doc.ref.path.split('/');
      const carId = pathParts[1];

      return {
        id: doc.id,
        carId,
        ...doc.data(),
      };
    });
  }

  async isCarAvailable(carId: string, from: Date, to: Date): Promise<boolean> {
    const reservationsRef = collection(
      this.firestore,
      `reservations/${carId}/all`
    );
    const q = query(reservationsRef);
    const querySnapshot = await getDocs(q);

    for (const doc of querySnapshot.docs) {
      const res = doc.data() as any;
      const resFrom = res.from.toDate ? res.from.toDate() : new Date(res.from);
      const resTo = res.to.toDate ? res.to.toDate() : new Date(res.to);

      if (from <= resTo && to >= resFrom) {
        return false;
      }
    }

    return true;
  }

  async isCarAvailableToday(carId: string | undefined): Promise<boolean> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const reservationsRef = collection(
      this.firestore,
      `reservations/${carId}/all`
    );
    const q = query(reservationsRef);
    const querySnapshot = await getDocs(q);

    for (const docSnap of querySnapshot.docs) {
      const res = docSnap.data() as any;

      const resFrom: Date = res.from.toDate
        ? res.from.toDate()
        : new Date(res.from);
      const resTo: Date = res.to.toDate ? res.to.toDate() : new Date(res.to);

      if (today <= resTo && tomorrow > resFrom) {
        return false;
      }
    }

    return true;
  }

  async toggleReservationApproval(
    reservationId: string,
    carId: string,
    currentState: boolean
  ) {
    const reservationRef = doc(
      this.firestore,
      `reservations/${carId}/all/${reservationId}`
    );
    await updateDoc(reservationRef, {
      approved: !currentState,
    });
    return !currentState;
  }
}
