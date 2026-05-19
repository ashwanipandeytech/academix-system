import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/landing/landing').then(m => m.LandingComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./features/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
  },
  {
    path: 'register-plan/:planName',
    loadChildren: () => import('./registration.routes').then(m => m.REGISTRATION_ROUTES)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./core/layout/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/dashboard-overview/dashboard-overview.component').then(m => m.DashboardOverviewComponent)
      },
      {
        path: 'students',
        loadComponent: () => import('./features/students/students-list/students.component').then(m => m.StudentsComponent)
      },
      {
        path: 'parents',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'parents' }
      },
      {
        path: 'admissions',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'admissions' }
      },
      {
        path: 'attendance',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'attendance' }
      },
      {
        path: 'teachers',
        loadComponent: () => import('./features/teachers/teachers-list/teachers.component').then(m => m.TeachersComponent)
      },
      {
        path: 'staff',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'staff' }
      },
      {
        path: 'fees',
        loadComponent: () => import('./features/finance/finance-overview/finance.component').then(m => m.FinanceComponent)
      },
      {
        path: 'accounting',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'accounting' }
      },
      {
        path: 'subscriptions',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'subscriptions' }
      },
      {
        path: 'academic',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'academic' }
      },
      {
        path: 'assignments',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'assignments' }
      },
      {
        path: 'exams',
        loadComponent: () => import('./features/exams/exams-list/exams.component').then(m => m.ExamsComponent)
      },
      {
        path: 'results',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'results' }
      },
      {
        path: 'events',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'events' }
      },
      {
        path: 'library',
        loadComponent: () => import('./features/library/library-list/library.component').then(m => m.LibraryComponent)
      },
      {
        path: 'inventory',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'inventory' }
      },
      {
        path: 'communication',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'communication' }
      },
      {
        path: 'website',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'website' }
      },
      {
        path: 'support',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'support' }
      },
      {
        path: 'transport',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'transport' }
      },
      {
        path: 'hostel',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'hostel' }
      },
      {
        path: 'live-classes',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'live-classes' }
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'settings' }
      },
      {
        path: 'permissions',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'permissions' }
      },
      {
        path: 'audit-logs',
        loadComponent: () => import('./features/operations/operations-page/operations-page').then(m => m.OperationsPageComponent),
        data: { page: 'audit-logs' }
      }
    ]
  }
];
