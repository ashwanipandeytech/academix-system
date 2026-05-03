import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout';
import { authGuard } from './core/guards/auth.guard';

export const ERP_ROUTES: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./auth/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'academic',
        loadChildren: () => import('./features/academic/academic.routes').then(m => m.ACADEMIC_ROUTES)
      },
      {
        path: 'students',
        loadChildren: () => import('./features/students/students.routes').then(m => m.STUDENT_ROUTES)
      },
      {
        path: 'teachers',
        loadChildren: () => import('./features/teachers/teachers.routes').then(m => m.TEACHER_ROUTES)
      },
      {
        path: 'fees',
        loadChildren: () => import('./features/fees/fees.routes').then(m => m.FEE_ROUTES)
      },
      {
        path: 'library',
        loadChildren: () => import('./features/library/library.routes').then(m => m.LIBRARY_ROUTES)
      },
      {
        path: 'exams',
        loadChildren: () => import('./features/exams/exams.routes').then(m => m.EXAM_ROUTES)
      },
      {
        path: 'inventory',
        loadChildren: () => import('./features/inventory/inventory.routes').then(m => m.INVENTORY_ROUTES)
      },
      {
        path: 'communication',
        loadChildren: () => import('./features/communication/communication.routes').then(m => m.COMMUNICATION_ROUTES)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];
