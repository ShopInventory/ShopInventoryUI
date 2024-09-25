import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { first } from 'rxjs';
import { CommonDialogService } from 'src/app/services/Common dialog service/common-dialog-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateProductDialogComponent } from './create-product-dialog/create-product-dialog.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productCategoriesDataSource = new MatTableDataSource<any>();
  productCategoriesDisplayedColumns: string[] = ['srNo', 'productName', 'productType', 'productCategory', 'productSubCategory', 'productBrand', 'productUnit', 'productQty', 'created', 'action'];

  panelOpenState = false;
  productCategoriesData: any = []

  constructor(
    private router: Router,
    private inventoryService: InventoryService,
    private cd: CommonDialogService,
    private loader: LoaderService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.productCategoriesDataSource.paginator = this.paginator;
    this.productCategoriesDataSource.sort = this.sort;
  }

  addProduct(id: any) {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      panelClass: 'large-dialog',
      autoFocus: false,
      data: {
        id: id
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.inventoryService?.productCast?.pipe(first()).subscribe((data: any) => {
        if (Array.isArray(data)) {
          this.productCategoriesData = data;
        } else {
          const productExists = this.productCategoriesData.some(
            (product: any) => product.productSku == data.productSku
          );
          if (!productExists) {
            this.productCategoriesData.push(data);
          }
        }
        console.log('productCategoriesData', this.productCategoriesData);
        console.log('productCategoriesDataSource', this.productCategoriesDataSource.data);
        setTimeout(() => {
          this.loader.stopLoader();
          this.productCategoriesDataSource.data = [...this.productCategoriesData];
        }, 2000);
      });
    });
  }

  openSuccessDialog() {
    // alert('Hello')
    // this.cd.openSuccessModal('Successful !');
    // this.cd.openConfirmModal('Successful !');
    // this.cd.openConsentConfirmModal('Successful !');
    // this.cd.openErrorModal('Successful !');
    // this.loader.startLoader();
    // setTimeout(() => {
    //   this.loader.stopLoader();
    // }, 1000);

  }
}
