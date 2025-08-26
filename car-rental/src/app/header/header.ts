// import { Component, inject } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import {
//   MatDialog,
//   MatDialogTitle,
//   MatDialogContent,
//   MatDialogActions,
//   MatDialogClose,
// } from '@angular/material/dialog';
// import { Dialog } from './dialog/dialog';
// import { CommonModule } from '@angular/common';
// import { AuthService } from '../auth/auth.service';

// @Component({
//   selector: 'app-header',
//   standalone: true,
//   imports: [RouterLink, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, CommonModule],
//   templateUrl: './header.html',
//   styleUrls: ['./header.css']
// })
// export class Header {
//   private dialog = inject(MatDialog);

//   constructor(
//     public authService: AuthService
//   ){}

//   openDialog(): void {
//     const dialogRef = this.dialog.open(Dialog, {
     
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       console.log('Dialog closed with result:', result);
//     });
//   }

//   onLogOut(){
//     this.authService.logout();
//   }
// }
