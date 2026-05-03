import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing').then(m => m.LandingComponent),
    title: 'EduERP - Smart School Management'
  },
  {
    path: 'register-plan/:planName',
    loadComponent: () => import('./features/landing/plan-registration/plan-registration').then(m => m.PlanRegistrationComponent),
    title: 'Register Plan - EduERP'
  },
  {
    path: 'erp',
    loadChildren: () => import('./erp.routes').then(m => m.ERP_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
