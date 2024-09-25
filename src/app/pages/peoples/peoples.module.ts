import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/shared-module/material/material.module';
import { CustomersComponent } from './customers/customers.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CreateCustomerDialogComponent } from './customers/create-customer-dialog/create-customer-dialog.component';
import { CreateSupplierDialogComponent } from './suppliers/create-supplier-dialog/create-supplier-dialog.component';
import { CustomComponentsModule } from 'src/app/shared/shared-component/custom-components/custom-components.module';


const routes: Routes = [
  { path: '', component: CustomersComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'suppliers', component: SuppliersComponent },
];

@NgModule({
  declarations: [
    CustomersComponent,
    SuppliersComponent,

    // Dialog components
    CreateCustomerDialogComponent,
    CreateSupplierDialogComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    CustomComponentsModule
  ]
})
export class PeoplesModule { }
