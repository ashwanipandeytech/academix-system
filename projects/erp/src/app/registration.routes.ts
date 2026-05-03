import { Routes } from '@angular/router';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const REGISTRATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/plan-registration/plan-registration').then(m => m.PlanRegistrationComponent),
    providers: [provideFirestore(() => getFirestore())],
    title: 'Register Plan - EduERP'
  }
];
