import { first } from 'rxjs';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { ViewChild, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderService } from 'src/app/services/loader.service';
import { InventoryService } from '../inventory.service';
import { CommonDialogService } from 'src/app/services/Common dialog service/common-dialog-service.service';
import { CreateCategoryDialogComponent } from './create-category-dialog/create-category-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categoriesDataSource = new MatTableDataSource<any>();
  categoriesDisplayedColumns: string[] = ['srNo', 'categoryName', 'categoryCode', 'created', 'status', 'action'];

  panelOpenState = false;
  categoriesData: any = []

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
    this.categoriesDataSource.paginator = this.paginator;
    this.categoriesDataSource.sort = this.sort;
  }

    // filter apply
    filterApply(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.categoriesDataSource.filter = filterValue.trim().toLocaleLowerCase();
    }

  setValues() {
    this.getCategoryDetails();
  }

  getCategoryDetails(categoryId?: any) {
    const reqData = {
      categoryId: categoryId
    }
    this.loader.startLoader();
    this.inventoryService.getCategoryDetails(reqData).subscribe({
      next: (res: any) => {
        this.loader.stopLoader();
        // this.categoriesData = res?.data;
        console.log('Data', res?.data);

        if (Array.isArray(res?.data)) {
          this.categoriesData = res?.data;
        } else {
          const categoryExists = this.categoriesData.some(
            (category: any) => category.categoryCode == res?.data.categoryCode
          );
          if (!categoryExists) {
            this.categoriesData.push(res?.data);
          }
        }
        console.log('categoriesData', this.categoriesData);
        console.log('categoriesDataSource', this.categoriesDataSource.data);
        // this.loader.stopLoader();
        // this.cd.openSuccessModal('Successful !');
        this.categoriesDataSource.data = [...this.categoriesData];
      },
      error: (err) => {
        this.loader.stopLoader();
        this.cd.openErrorModal('CONNECTION_TIME_OUT', 'Error');
      }
    });
  }

  addCategory(id: any) {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      panelClass: 'medium-dialog',
      autoFocus: false,
      data: {
        id: id
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
        console.log('Datares', res);
      // this.inventoryService?.categoryCast?.pipe(first()).subscribe((data: any) => {
      //   console.log('Data', data);

      //   if (Array.isArray(data)) {
      //     this.categoriesData = data;
      //   } else {
      //     const categoryExists = this.categoriesData.some(
      //       (category: any) => category.categoryCode == data.categoryCode
      //     );
      //     if (!categoryExists) {
      //       this.categoriesData.push(data);
      //     }
      //   }
      //   console.log('categoriesData', this.categoriesData);
      //   console.log('categoriesDataSource', this.categoriesDataSource.data);
      //   this.loader.stopLoader();
      //   this.cd.openSuccessModal('Successful !');
      //   this.categoriesDataSource.data = [...this.categoriesData];
      // });
      this.getCategoryDetails();
    });
  }

  editCategory(index: number, id: any) {
    const selectedCategory = this.categoriesData[index];
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      panelClass: 'medium-dialog',
      autoFocus: false,
      data: {
        id: id,
        category: selectedCategory,
        index: index
      },
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.inventoryService?.categoryCast?.pipe(first()).subscribe((updatedCategory: any) => {
        this.categoriesDataSource.data[data.index] = updatedCategory;
        // this.categoriesDataSource.data = [...this.categoriesDataSource.data];
        this.categoriesDataSource._updateChangeSubscription();
        this.loader.stopLoader();
        this.cd.openSuccessModal('Successful !');
      });
    });
  }

  deleteCategory(index: number) {
    this.cd.openConfirmModal('Are you sure you want to delete this category?', () => {
      this.categoriesData.splice(index, 1);
      this.categoriesDataSource.data = [...this.categoriesData];
      this.categoriesDataSource._updateChangeSubscription();
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
