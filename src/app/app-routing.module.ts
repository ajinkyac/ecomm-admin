import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentOrdersComponent } from './orders/current/current-orders.component';
import { PendingOrdersComponent } from './orders/pending/pending-orders.component';
import { ProcessedOrdersComponent } from './orders/processed/processed-orders.component';

// TODO: Orders could be a module and be lazily loaded using loadChildren and the module takes care of it's own routing.
const routes: Routes = [
  { path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'current-orders',
    component: CurrentOrdersComponent
  },
  {
    path: 'pending-orders',
    component: PendingOrdersComponent
  },
  {
    path: 'processed-orders',
    component: ProcessedOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
