import { Component, ViewChild } from '@angular/core';
import { first } from 'rxjs';
import { CreateCustomerDialogComponent } from './create-customer-dialog/create-customer-dialog.component';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PeoplesService } from '../peoples.service';
import { CommonDialogService } from 'src/app/services/Common dialog service/common-dialog-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  customersDataSource = new MatTableDataSource<any>();
  customersDisplayedColumns: string[] = ['srNo', 'customerName', 'customerId', 'email', 'phone', 'address', 'city', 'country', 'created', 'status', 'action'];

  panelOpenState = false;
  customersData: any = []

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
    this.customersDataSource.paginator = this.paginator;
    this.customersDataSource.sort = this.sort;
  }


  // filter apply
  filterApply(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.customersDataSource.filter = filterValue.trim().toLocaleLowerCase();
  }


  addCustomer(id: any) {
    const dialogRef = this.dialog.open(CreateCustomerDialogComponent, {
      panelClass: 'medium-dialog',
      autoFocus: false,
      data: {
        id: id
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.peoplesService?.customerCast?.pipe(first()).subscribe((data: any) => {
        console.log('Data', data);

        if (Array.isArray(data)) {
          this.customersData = data;
        } else {
          const brandExists = this.customersData.some(
            (brand: any) => brand.brandCode == data.brandCode
          );
          if (!brandExists) {
            this.customersData.push(data);
          }
        }
        console.log('customersData', this.customersData);
        console.log('customersDataSource', this.customersDataSource.data);
        this.loader.stopLoader();
        this.cd.openSuccessModal('Successful !');
        this.customersDataSource.data = [...this.customersData];
      });
    });
  }

  editCustomer(index: number, id: any) {
    const selectedCustomer = this.customersData[index];
    const dialogRef = this.dialog.open(CreateCustomerDialogComponent, {
      panelClass: 'medium-dialog',
      autoFocus: false,
      data: {
        id: id,
        customer: selectedCustomer,
        index: index
      },
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.peoplesService?.customerCast?.pipe(first()).subscribe((updatedCustomer: any) => {
        this.customersDataSource.data[data.index] = updatedCustomer;
        // this.customersDataSource.data = [...this.customersDataSource.data];
        this.customersDataSource._updateChangeSubscription();
        this.loader.stopLoader();
        this.cd.openSuccessModal('Successful !');
      });
    });
  }

  deleteCustomer(index: number) {
    this.cd.openConfirmModal('Are you sure you want to delete this customer?', () => {
      this.customersData.splice(index, 1);
      this.customersDataSource.data = [...this.customersData];
      this.customersDataSource._updateChangeSubscription();
    });
  }

}
