import { Component, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { InventoryService } from '../inventory.service';
import { CommonDialogService } from 'src/app/services/Common dialog service/common-dialog-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateBrandDialogComponent } from './create-brand-dialog/create-brand-dialog.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  brandsDataSource = new MatTableDataSource<any>();
  brandsDisplayedColumns: string[] = ['srNo', 'brandName', 'brandCode', 'created', 'status', 'action'];

  panelOpenState = false;
  brandsData: any = []

  constructor(
    private router: Router,
    private inventoryService: InventoryService,
    private cd: CommonDialogService,
    private loader: LoaderService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.setValues();
  }

  ngAfterViewInit(): void {
    this.brandsDataSource.paginator = this.paginator;
    this.brandsDataSource.sort = this.sort;
  }


  // filter apply
  filterApply(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.brandsDataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  setValues() {
    this.getBrandDetails();
  }


  getBrandDetails(categoryId?: any) {
    const reqData = {
      categoryId: categoryId
    }
    this.loader.startLoader();
    this.inventoryService.getBrandDetails(reqData).subscribe({
      next: (res: any) => {
        this.loader.stopLoader();
        // this.brandsData = res?.data;
        console.log('Data', res?.data);

        if (Array.isArray(res?.data)) {
          this.brandsData = res?.data;
        } else {
          const brandExists = this.brandsData.some(
            (brand: any) => brand.brandCode == res?.data.brandCode
          );
          if (!brandExists) {
            this.brandsData.push(res?.data);
          }
        }
        console.log('brandsData', this.brandsData);
        console.log('brandsDataSource', this.brandsDataSource.data);
        // this.loader.stopLoader();
        // this.cd.openSuccessModal('Successful !');
        this.brandsDataSource.data = [...this.brandsData];
      },
      error: (err) => {
        this.loader.stopLoader();
        this.cd.openErrorModal('CONNECTION_TIME_OUT', 'Error');
      }
    });
  }

  addBrand(id: any) {
    const dialogRef = this.dialog.open(CreateBrandDialogComponent, {
      panelClass: 'medium-dialog',
      autoFocus: false,
      data: {
        id: id
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.inventoryService?.brandCast?.pipe(first()).subscribe((data: any) => {
        console.log('Data', data);

        if (Array.isArray(data)) {
          this.brandsData = data;
        } else {
          const brandExists = this.brandsData.some(
            (brand: any) => brand.brandCode == data.brandCode
          );
          if (!brandExists) {
            this.brandsData.push(data);
          }
        }
        console.log('brandsData', this.brandsData);
        console.log('brandsDataSource', this.brandsDataSource.data);
        this.loader.stopLoader();
        this.brandsDataSource.data = [...this.brandsData];
      });
    });
  }

  editBrand(index: number, id: any) {
    const selectedBrand = this.brandsData[index];
    const dialogRef = this.dialog.open(CreateBrandDialogComponent, {
      panelClass: 'medium-dialog',
      autoFocus: false,
      data: {
        id: id,
        brand: selectedBrand,
        index: index
      },
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.inventoryService?.brandCast?.pipe(first()).subscribe((updatedBrand: any) => {
        this.brandsDataSource.data[data.index] = updatedBrand;
        // this.brandsDataSource.data = [...this.brandsDataSource.data];
        this.brandsDataSource._updateChangeSubscription();
        this.loader.stopLoader();
      });
    });
  }

  deleteBrand(index: number) {
    this.cd.openConfirmModal('Are you sure you want to delete this brand?', () => {
      this.brandsData.splice(index, 1);
      this.brandsDataSource.data = [...this.brandsData];
      this.brandsDataSource._updateChangeSubscription();
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
