import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { carHistory } from './History.model';
import { RentService } from './rent.service';
import { Auth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history',
  imports: [MatTableModule, DatePipe],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class History implements OnInit {
  displayedColumns: string[] = ['id', 'car', 'from', 'to', 'total'];
  dataSource: carHistory[] = [];

  constructor(private rentService: RentService, private auth: Auth) {}

  ngOnInit(): void {
    const user = this.auth.currentUser;
    if (!user) {
      console.warn('Not logged in!');
      return;
    }

    this.rentService.getUserHistory(user.uid).subscribe(history => {
      this.dataSource = history;
    });
  }
}
