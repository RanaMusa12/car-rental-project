import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Dialog } from './dialog/dialog';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {
  private dialog = inject(MatDialog);

  openDialog(): void {
    const dialogRef = this.dialog.open(Dialog, {
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }
}
