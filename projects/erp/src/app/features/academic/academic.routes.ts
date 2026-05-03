import { Routes } from '@angular/router'; export const ACADEMIC_ROUTES: Routes = [{ path: '', loadComponent: () => import('./class-list/class-list').then(m => m.ClassListComponent) }];
