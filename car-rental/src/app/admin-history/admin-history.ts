import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { RentService } from '../history/rent.service';
import { Auth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';

export interface CarHistory {
  id?: string;
  carId?: string;
  car: string;
  from: any;
  to: any;
  total: number;
  userName: string;
  phoneNumber: number | string;
  address: string;
  approved: boolean;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatTableModule, DatePipe, MatCheckboxModule],
  templateUrl: './admin-history.html',
  styleUrls: ['./admin-history.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHistory implements OnInit {
  displayedColumns: string[] = [
    'userName',
    'phoneNumber',
    'address',
    'car',
    'from',
    'to',
    'total',
    'approved',
  ];

  dataSource = signal<CarHistory[]>([]);

  constructor(private rentService: RentService, private auth: Auth) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  async loadReservations() {
    try {
      const reservations = await this.rentService.getAllReservations();

      this.dataSource.set(
        reservations.map((res: any) => ({
          id: res.id,
          carId: res.carId,
          car: res.carName,
          from: res.from,
          to: res.to,
          total: res.total,
          userName: res.userName,
          phoneNumber: res.phone,
          address: res.address,
          approved: res.approved ?? false,
        }))
      );
    } catch (error) {
      console.error('Error loading reservations:', error);
    }
  }

  updateApproval(element: CarHistory, approved: boolean) {
    this.dataSource.update((rows) =>
      rows.map((row) => (row.id === element.id ? { ...row, approved } : row))
    );
  }

  toggleApproval(element: any) {
    this.rentService
      .toggleReservationApproval(element.id, element.carId, element.approved)
      .then((newState) => {
        element.approved = newState;
      })
      .catch((err) => console.error('Failed to toggle approval', err));
  }
}
