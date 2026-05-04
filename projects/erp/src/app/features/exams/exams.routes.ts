import { Routes } from '@angular/router'; export const EXAM_ROUTES: Routes = [{ path: '', loadComponent: () => import('./exam-list/exam-list').then(m => m.ExamListComponent) }];
