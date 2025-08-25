import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../car.service'
import { Observable, window } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {
  MatDialog,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { Dialog } from './dialog/dialog';
import { DialogEdit } from './dialog-edit/dialog-edit';
import { Car } from '../car.model';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-car-page',
  imports: [CommonModule, MatIcon,RouterLink, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './car-page.html',
  styleUrl: './car-page.css'
})
export class CarPage implements OnInit {

   constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router,
    public authService :AuthService
  
  ) {}
  car$!: Observable<any>;
  ngOnInit(): void {
    
      const id = this.route.snapshot.paramMap.get('id'); // <-- get URL param
    if (id) {
      this.car$ = this.carService.getCarById(id); // fetch car by Firebase ID
    }
  }

   currentIndex = 0;
  


  prevImage(car:any) {
    if (!car?.images) return;
    this.currentIndex =
      (this.currentIndex - 1 + car.images.length) % car.images.length;
  }

  nextImage(car:any) {
    if (!car?.images) return;
    this.currentIndex = (this.currentIndex + 1) % car.images.length;
  }

  private dialog = inject(MatDialog);

  openDialog(car :Car): void {
    const dialogRef = this.dialog.open(Dialog, {
     data: { id: car.id } 
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }


    openEditDialog(car :Car): void {
    const dialogRef = this.dialog.open(DialogEdit, {
     data: { id: car.id } 
    });



    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed with result:', result);
    });
  }


   onDelete(id:any){
   if (confirm('Are you sure you want to delete this car?')) {
    this.carService.deleteCar(id).then(() => {
       this.router.navigate(['/']);
    });

   }
  }

}
