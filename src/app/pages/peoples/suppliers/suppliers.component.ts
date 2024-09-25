import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PeoplesService } from '../peoples.service';
import { CommonDialogService } from 'src/app/services/Common dialog service/common-dialog-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateSupplierDialogComponent } from './create-supplier-dialog/create-supplier-dialog.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  suppliersDataSource = new MatTableDataSource<any>();
  suppliersDisplayedColumns: string[] = ['srNo', 'supplierName', 'supplierCompanyName', 'supplierId', 'email', 'phone', 'address', 'city', 'country', 'created', 'status', 'action'];

  panelOpenState = false;
  suppliersData: any = []

  constructor(
    private router: Router,
    private peoplesService: PeoplesService,
    private cd: CommonDialogService,
    private loader: LoaderService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.suppliersDataSource.paginator = this.paginator;
    this.suppliersDataSource.sort = this.sort;
  }


  // filter apply
  filterApply(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.suppliersDataSource.filter = filterValue.trim().toLocaleLowerCase();
  }


  addSupplier(id: any) {
    const dialogRef = this.dialog.open(CreateSupplierDialogComponent, {
      panelClass: 'medium-dialog',
      autoFocus: false,
      data: {
        id: id
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.peoplesService?.supplierCast?.pipe(first()).subscribe((data: any) => {
        console.log('Data', data);

        if (Array.isArray(data)) {
          this.suppliersData = data;
        } else {
          const brandExists = this.suppliersData.some(
            (brand: any) => brand.brandCode == data.brandCode
          );
          if (!brandExists) {
            this.suppliersData.push(data);
          }
        }
        console.log('suppliersData', this.suppliersData);
        console.log('suppliersDataSource', this.suppliersDataSource.data);
        this.loader.stopLoader();
        this.cd.openSuccessModal('Successful !');
        this.suppliersDataSource.data = [...this.suppliersData];
      });
    });
  }

  editSupplier(index: number, id: any) {
    const selectedSupplier = this.suppliersData[index];
    const dialogRef = this.dialog.open(CreateSupplierDialogComponent, {
      panelClass: 'medium-dialog',
      autoFocus: false,
      data: {
        id: id,
        supplier: selectedSupplier,
        index: index
      },
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.peoplesService?.supplierCast?.pipe(first()).subscribe((updatedSupplier: any) => {
        this.suppliersDataSource.data[data.index] = updatedSupplier;
        // this.suppliersDataSource.data = [...this.suppliersDataSource.data];
        this.suppliersDataSource._updateChangeSubscription();
        this.loader.stopLoader();
        this.cd.openSuccessModal('Successful !');
      });
    });
  }

  deleteSupplier(index: number) {
    this.cd.openConfirmModal('Are you sure you want to delete this supplier?', () => {
      this.suppliersData.splice(index, 1);
      this.suppliersDataSource.data = [...this.suppliersData];
      this.suppliersDataSource._updateChangeSubscription();
    });
  }

}
