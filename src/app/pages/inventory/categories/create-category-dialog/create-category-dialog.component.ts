import { Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { LoaderService } from 'src/app/services/loader.service';
import { InventoryService } from '../../inventory.service';
import { CommonDialogService } from 'src/app/services/Common dialog service/common-dialog-service.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { brands, productCategories, productTypes, units } from 'src/app/constants/common-data/pages-common-data';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.scss']
})
export class CreateCategoryDialogComponent {

  productTypes = productTypes;
  productCategories = productCategories;
  units = units;
  brands = brands;

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  panelOpenState = false;
  id: any;
  index: any;
  selectedCategory: any;

  //Form Fields variable start
  addCategoryForm!: FormGroup
  //Form Fields variable end

  images: any[] = []; // Array to hold image URLs
  productCategoriesData: any = []
  categoryStatusOptions = [
    { value: '0', status: 'In-Active' },
    { value: '1', status: 'Active' }
  ];


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private cd: CommonDialogService,
    private loader: LoaderService,
  ) {
    dialogRef.disableClose = true;
    this.id = data.id;
    this.index = data.index;
    this.selectedCategory = data.category;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setValues();
  }


  initializeForm() {
    this.addCategoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      categoryCode: ['', Validators.required],
      categoryAddDate: ['', Validators.required],
      categoryStatus: ['', Validators.required],
      categoryDescription: ['', Validators.required],
    });
  }

  setValues() {
    if (this.id == 'edit-category') {
      this.editCategory(this.selectedCategory);
      console.log('index', this.index);
    }
  }

  get isAddCategoryFormValid(): boolean {
    return this.addCategoryForm.valid;
  }

  generateCategoryCode() {
    const form = this.addCategoryForm;
    if (!form) {
      throw new Error('Form not initialized');
    }

    let categoryName = form.get('categoryName')?.value;
    if (!categoryName) {
      throw new Error('Form values missing or invalid');
    }

    categoryName = categoryName.substring(0, 3).toUpperCase().padEnd(3, 'IN');

    // Generate a unique ID based on current date and time in milliseconds
    const currentDate = new Date();
    const uniqueId = currentDate.getTime().toString().slice(-6); // Take last 6 digits of the timestamp

    // Get the current month name
    const monthName = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
    const firstTwoChars = monthName.substring(0, 2); // Get the first two characters of the month name
    const lastChar = monthName.slice(-1); // Get the last character of the month name

    // Construct the category code with the month name characters
    const generatedCatCode = `${categoryName}-${firstTwoChars}-${uniqueId}-${lastChar}`;

    // Optionally, update the form control with the generated category code
    form.get('categoryCode')?.setValue(generatedCatCode); // Adjust 'categoryCode' to your actual form control name
    console.log('Generated Category Code:', generatedCatCode);
  }

  editCategory(selectedCategory: any) {
    this.addCategoryForm.patchValue({
      categoryName: selectedCategory?.categoryName,
      categoryCode: selectedCategory?.categoryCode,
      categoryAddDate: selectedCategory?.categoryAddDate,
      categoryStatus: selectedCategory?.categoryStatus,
      categoryDescription: selectedCategory?.categoryDescription,
    })
  }

  /*--------
  ---------- final submission ----------
  ----------*/
  onSubmit2() {
    console.log('addCategoryForm Value', this.addCategoryForm?.value);
    let formValue: any = this.addCategoryForm?.value;

    this.cd.openConfirmModal('Are you sure you want to appove the request?', () => {
      this.loader.startLoader();
      this.inventoryService.addCategory(formValue);
    });

    this.dialogRef.close({
      index: this.index === 0 ? this.index : (this.index ? this.index : '')
    });
    // const navigateurl = `/inventory/products`;
    // this.router.navigateByUrl(navigateurl);
  }


  onSubmit() {
    console.log('addCategoryForm Value', this.addCategoryForm?.value);

    const formValue = this.addCategoryForm?.value;

    this.cd.openConfirmModal('Are you sure you want to create this category?', () => {
      this.loader.startLoader();

      this.inventoryService.saveCategoryDetails(formValue).subscribe({
        next: (res: any) => {
          this.loader.stopLoader();
          const message = res.status ? `${res.message} and created category id is ${res?.data?.categoryId}` : res.error;

          res.status ? this.cd.openSuccessModal(message) : this.cd.openErrorModal(message, 'Error');
        },
        error: (err) => {
          this.loader.stopLoader();
          this.cd.openErrorModal(err.error.description, err.error.code);
        }
      });
    });

    this.dialogRef.close({
      index: this.index === 0 ? this.index : (this.index ? this.index : '')
    });

  }



  // utility functions
  getFormValidationErrors() {
    const result: any = [];
    Object.keys(this.addCategoryForm?.controls).forEach((key) => {
      const controlErrors: any = this.addCategoryForm?.get(key)?.errors;
      if (controlErrors) {
        Object.keys(controlErrors).forEach((keyError) => {
          result.push({
            control: key,
            error: keyError,
            value: controlErrors[keyError],
          });
        });
      }
    });
    return result;
  }

}

