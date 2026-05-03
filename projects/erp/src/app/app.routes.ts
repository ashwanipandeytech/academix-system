import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing').then(m => m.LandingComponent),
    title: 'EduERP - Smart School Management'
  },
  {
    path: 'register-plan/:planName',
    loadChildren: () => import('./registration.routes').then(m => m.REGISTRATION_ROUTES)
  },
  {
    path: 'erp',
    loadChildren: () => import('./erp.routes').then(m => m.ERP_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
