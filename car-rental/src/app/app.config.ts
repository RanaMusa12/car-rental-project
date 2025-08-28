import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyANj6Gh1KRC4oGlE4ChQt-YUovDqNHXKsw',
  authDomain: 'car-rental-641f2.firebaseapp.com',
  projectId: 'car-rental-641f2',
  storageBucket: 'car-rental-641f2.firebasestorage.app',
  messagingSenderId: '638366205309',
  appId: '1:638366205309:web:51e365881244a706583814',
  measurementId: 'G-MN03SM6KL6',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
  ],
};
