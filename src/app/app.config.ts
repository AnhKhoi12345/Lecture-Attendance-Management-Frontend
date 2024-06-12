import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth} from '@angular/fire/auth';
import { provideClientHydration } from '@angular/platform-browser';
import { withFetch } from '@angular/common/http';
import { environment } from '../environments/environment';

const firebaseConfig = {
  apiKey: "AIzaSyBoq4KOOID6PuFETi-SideQHX78mJvpnbY",
  authDomain: "vgu-attendance-management.firebaseapp.com",
  projectId: "vgu-attendance-management",
  storageBucket: "vgu-attendance-management.appspot.com",
  messagingSenderId: "251948816899",
  appId: "1:251948816899:web:c8e6124bfb11bf8a914c36",
  measurementId: "G-W39BVMLVST"
};
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
  ]
};
