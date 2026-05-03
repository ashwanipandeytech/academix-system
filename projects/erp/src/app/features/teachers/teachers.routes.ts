import { Routes } from '@angular/router'; export const TEACHER_ROUTES: Routes = [{ path: '', loadComponent: () => import('./teacher-list/teacher-list').then(m => m.TeacherListComponent) }];
