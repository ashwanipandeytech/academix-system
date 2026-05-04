import { Routes } from '@angular/router';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { RegistrationService } from './core/services/registration.service';

export const REGISTRATION_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/plan-registration/plan-registration').then(m => m.PlanRegistrationComponent),
    providers: [
      provideFirestore(() => getFirestore()),
      RegistrationService
    ],
    title: 'Register Plan - EduERP'
  }
];
