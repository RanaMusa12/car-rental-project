import { Routes } from '@angular/router';
import { Signup } from './auth/signup/signup';
import { Login } from './auth/login/login';
import { CarItem } from './car/car';
import { CarList } from './car/car-list/car-list';
import { CarPage } from './car/car-page/car-page';

export const routes: Routes = [
    {
        path:'',
        component:CarList,
   
    },
    {
        path:'signup',
        component: Signup
    },
    {
        path:'login',
        component: Login
    },
    {
        path:'main',
        component:CarItem
    },
    {
        path:'car/:id',
        component:CarPage
    }
];
