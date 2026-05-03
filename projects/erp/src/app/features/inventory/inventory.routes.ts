import { Routes } from '@angular/router'; export const INVENTORY_ROUTES: Routes = [{ path: '', loadComponent: () => import('./product-list/product-list').then(m => m.ProductListComponent) }];
