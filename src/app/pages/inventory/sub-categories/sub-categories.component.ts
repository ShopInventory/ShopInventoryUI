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
import { CreateSubCategoryDialogComponent } from './create-sub-category-dialog/create-sub-category-dialog.component';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subCategoriesDataSource = new MatTableDataSource<any>();
  subCategoriesDisplayedColumns: string[] = ['srNo','categoryId', 'subCategoryName', 'subCategoryCode', 'created', 'status', 'action'];

  panelOpenState = false;
  subCategoriesData: any = []

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
    this.subCategoriesDataSource.paginator = this.paginator;
    this.subCategoriesDataSource.sort = this.sort;
  }


  // filter apply
  filterApply(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subCategoriesDataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  addSubCategory(id: any) {
    const dialogRef = this.dialog.open(CreateSubCategoryDialogComponent, {
      panelClass: 'medium-dialog',
      autoFocus: false,
      data: {
        id: id
      },
    });

    dialogRef.afterClosed().subscribe((res: any) => {
      this.inventoryService?.subCategoryCast?.pipe(first()).subscribe((data: any) => {
        console.log('Data', data);

        if (Array.isArray(data)) {
          this.subCategoriesData = data;
        } else {
          const subCategoryExists = this.subCategoriesData.some(
            (subCategory: any) => subCategory.subCategoryCode == data.subCategoryCode
          );
          if (!subCategoryExists) {
            this.subCategoriesData.push(data);
          }
        }
        console.log('subCategoriesData', this.subCategoriesData);
        console.log('subCategoriesDataSource', this.subCategoriesDataSource.data);
        this.loader.stopLoader();
        this.subCategoriesDataSource.data = [...this.subCategoriesData];
      });
    });
  }

  editSubCategory(index: number, id: any) {
    const selectedSubCategory = this.subCategoriesData[index];
    const dialogRef = this.dialog.open(CreateSubCategoryDialogComponent, {
      panelClass: 'medium-dialog',
      autoFocus: false,
      data: {
        id: id,
        subCategory: selectedSubCategory,
        index: index
      },
    });

    dialogRef.afterClosed().subscribe((data: any) => {
      this.inventoryService?.subCategoryCast?.pipe(first()).subscribe((updatedSubCategory: any) => {
        this.subCategoriesDataSource.data[data.index] = updatedSubCategory;
        // this.subCategoriesDataSource.data = [...this.subCategoriesDataSource.data];
        this.subCategoriesDataSource._updateChangeSubscription();
        this.loader.stopLoader();
      });
    });
  }

  deleteSubCategory(index: number) {
    this.cd.openConfirmModal('Are you sure you want to delete this category?', () => {
      this.subCategoriesData.splice(index, 1);
      this.subCategoriesDataSource.data = [...this.subCategoriesData];
      this.subCategoriesDataSource._updateChangeSubscription();
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
