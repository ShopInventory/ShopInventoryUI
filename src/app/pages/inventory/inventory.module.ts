import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from 'src/app/shared/shared-module/material/material.module';
import { CreateProductDialogComponent } from './products/create-product-dialog/create-product-dialog.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryDialogComponent } from './categories/create-category-dialog/create-category-dialog.component';
import { SubCategoriesComponent } from './sub-categories/sub-categories.component';
import { CreateSubCategoryDialogComponent } from './sub-categories/create-sub-category-dialog/create-sub-category-dialog.component';
import { BrandsComponent } from './brands/brands.component';
import { CreateBrandDialogComponent } from './brands/create-brand-dialog/create-brand-dialog.component';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'sub-categories', component: SubCategoriesComponent },
  { path: 'brands', component: BrandsComponent},
];

@NgModule({
  declarations: [
    ProductsComponent,
    CategoriesComponent,
    SubCategoriesComponent,
    BrandsComponent,

    // Dialog components
    CreateProductDialogComponent,
    CreateCategoryDialogComponent,
    CreateSubCategoryDialogComponent,
    CreateBrandDialogComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
  ]
})
export class InventoryModule { }
