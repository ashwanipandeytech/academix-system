import { Routes } from '@angular/router'; export const FEE_ROUTES: Routes = [{ path: '', loadComponent: () => import('./fee-structure/fee-structure').then(m => m.FeeStructureComponent) }];
