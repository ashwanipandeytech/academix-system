import { Routes } from '@angular/router'; export const LIBRARY_ROUTES: Routes = [{ path: '', loadComponent: () => import('./book-list/book-list').then(m => m.BookListComponent) }];
