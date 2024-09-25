import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

// const routes: Routes = [];
export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'inventory',
    loadChildren: () =>
      import('./inventory/inventory.module').then((m) => m.InventoryModule),
  },
  {
    path: 'peoples',
    loadChildren: () =>
      import('./peoples/peoples.module').then((m) => m.PeoplesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
