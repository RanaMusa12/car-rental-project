import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';
import { CarItem } from './car/car';
import { CarList } from './car/car-list/car-list';
import { CarPage } from './car/car-page/car-page';
import { History } from './history/history';
import { AdminHistory } from './admin-history/admin-history';

export const routes: Routes = [
  {
    path: '',
    component: CarList,
  },
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'main',
    component: CarItem,
  },
  {
    path: 'car/:id',
    component: CarPage,
  },
  {
    path: 'history',
    component: History,
  },
  {
    path: 'all-rentals',
    component: AdminHistory,
  },
];
