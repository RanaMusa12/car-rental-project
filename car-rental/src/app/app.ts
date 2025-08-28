import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CarList } from './car/car-list/car-list';
import { AuthService } from './auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddDialog } from './header/dialog/dialog';
import { MatDialog } from '@angular/material/dialog';
import { FlexLayoutModule } from 'ngx-flexible-layout';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AddDialog,
    CarList,
    CommonModule,
    RouterLink,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('car-rental');

  constructor(public authService: AuthService) {}
  private dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(AddDialog, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with result:', result);
    });
  }

  onLogOut() {
    this.authService.logout();
  }
}
