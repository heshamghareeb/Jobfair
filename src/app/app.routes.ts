import { Routes } from '@angular/router';
import { CustomerListComponent } from './views/customer-list/customer-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full' ,
  },
  {
    path: 'home',
    // pathMatch: 'full' ,
    // loadComponent: () => CustomerListComponent,
    loadComponent: () => import('./views/customer-list/customer-list.component').then((m) => m.CustomerListComponent),
    title: 'Home',
  },
  {
    path: 'test',
    // pathMatch: 'full' ,
    // loadComponent: () => CustomerListComponent,
    loadComponent: () => import('./views/transaction-graph/transaction-graph.component').then((m) => m.TransactionGraphComponent),
    title: 'Home',
  },
];
