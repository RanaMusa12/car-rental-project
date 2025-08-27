import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { carHistory } from './History.model';
import { RentService } from './rent.service';
import { Auth } from '@angular/fire/auth';
import { DatePipe } from '@angular/common';
import { onAuthStateChanged } from '@angular/fire/auth';

@Component({
  selector: 'app-history',
  imports: [MatTableModule, DatePipe],
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class History implements OnInit {
  displayedColumns: string[] = ['car', 'from', 'to', 'total'];
  dataSource: carHistory[] = [];

  constructor(private rentService: RentService, private auth: Auth) {}

ngOnInit(): void {
  onAuthStateChanged(this.auth, user => {
    if (!user) {
      console.warn('Not logged in!');
      return;
    }

    this.rentService.getUserHistory(user.uid).subscribe(history => {
      console.log('History data:', history); // 👈 debug what comes back
      this.dataSource = history;
    });
  });
}

}