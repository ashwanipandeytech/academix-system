import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
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
        path: 'teachers',
        loadComponent: () => import('./features/teachers/teachers-list/teachers.component').then(m => m.TeachersComponent)
      },
      {
        path: 'fees',
        loadComponent: () => import('./features/finance/finance-overview/finance.component').then(m => m.FinanceComponent)
      },
      {
        path: 'exams',
        loadComponent: () => import('./features/exams/exams-list/exams.component').then(m => m.ExamsComponent)
      },
      {
        path: 'library',
        loadComponent: () => import('./features/library/library-list/library.component').then(m => m.LibraryComponent)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];
