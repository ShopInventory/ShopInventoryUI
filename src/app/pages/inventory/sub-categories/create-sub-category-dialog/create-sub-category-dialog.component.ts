import { Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { LoaderService } from 'src/app/services/loader.service';
import { InventoryService } from '../../inventory.service';
import { CommonDialogService } from 'src/app/services/Common dialog service/common-dialog-service.service';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sub-create-category-dialog',
  templateUrl: './create-sub-category-dialog.component.html',
  styleUrls: ['./create-sub-category-dialog.component.scss']
})
export class CreateSubCategoryDialogComponent {

  productTypes = [
    {
      productTypeName: 'Electrical',
      value: '1',
    },
    {
      productTypeName: 'Electronics',
      value: '2',
    },
  ];

  productCategories = [
    {
      productCategoryName: 'Lighting',
      productCategoryId: '1',
    },
    {
      productCategoryName: 'Wiring and Cables',
      productCategoryId: '2',
    },
    {
      productCategoryName: 'Switches and Sockets',
      productCategoryId: '3',
    },
    {
      productCategoryName: 'Electrical Tools',
      productCategoryId: '4',
    },
    {
      productCategoryName: 'Conduit and Fittings',
      productCategoryId: '5',
    },
    {
      productCategoryName: 'Circuit Protection',
      productCategoryId: '6',
    },
    {
      productCategoryName: 'Batteries and Power Supplies',
      productCategoryId: '7',
    },
    {
      productCategoryName: 'Transformers and Converters',
      productCategoryId: '8',
    },
    {
      productCategoryName: 'Motors and Drives',
      productCategoryId: '9',
    },
    {
      productCategoryName: 'Heating and Cooling',
      productCategoryId: '10',
    },
  ];

  units = [
    {
      unitName: 'Piece (pcs)',
      value: '1',
    },
    {
      unitName: 'Dozen (doz)',
      value: '2',
    },
    {
      unitName: 'Set (set)',
      value: '3',
    },
    {
      unitName: 'Packet (pkt)',
      value: '4',
    },
    {
      unitName: 'Meter (m)',
      value: '5',
    },
    {
      unitName: 'Feet (ft)',
      value: '6',
    },
    {
      unitName: 'Liter (L)',
      value: '7',
    },
    {
      unitName: 'Pair',
      value: '8',
    },
    {
      unitName: 'Watts (W)',
      value: '9',
    },
    {
      unitName: 'Amperes (A)',
      value: '10',
    },
    {
      unitName: 'Volts (V)',
      value: '11',
    },
    {
      unitName: 'Unit (unit)',
      value: '12',
    },
  ];

  brands = [
    {
      brandId: '1',
      brandName: 'Samsung',
      brandCode: 'SAMS',
    },
    {
      brandId: '2',
      brandName: 'Philips',
      brandCode: 'PHIL',
    },
    {
      brandId: '3',
      brandName: 'Sony',
      brandCode: 'SONY',
    },
    {
      brandId: '4',
      brandName: 'LG',
      brandCode: 'LG',
    },
    {
      brandId: '5',
      brandName: 'Panasonic',
      brandCode: 'PANA',
    },
    {
      brandId: '6',
      brandName: 'Toshiba',
      brandCode: 'TOSH',
    },
    {
      brandId: '7',
      brandName: 'Hitachi',
      brandCode: 'HITA',
    },
    {
      brandId: '8',
      brandName: 'Sharp',
      brandCode: 'SHRP',
    },
    {
      brandId: '9',
      brandName: 'JVC',
      brandCode: 'JVC',
    },
    {
      brandId: '10',
      brandName: 'Sanyo',
      brandCode: 'SANY',
    },
    {
      brandId: '11',
      brandName: 'Bose',
      brandCode: 'BOSE',
    },
    {
      brandId: '12',
      brandName: 'Pioneer',
      brandCode: 'PION',
    },
    {
      brandId: '13',
      brandName: 'Yamaha',
      brandCode: 'YAMA',
    },
    {
      brandId: '14',
      brandName: 'Kenwood',
      brandCode: 'KENW',
    },
    {
      brandId: '15',
      brandName: 'Onkyo',
      brandCode: 'ONKY',
    },
  ];


  @ViewChild(MatAccordion) accordion!: MatAccordion;

  panelOpenState = false;
  id: any;
  index: any;
  selectedSubCategory: any;

  //Form Fields variable start
  addSubCategoryForm!: FormGroup
  //Form Fields variable end

  images: any[] = []; // Array to hold image URLs
  productCategoriesData: any = []
  subCategoryStatusOptions = [
    { value: '0', status: 'In-Active' },
    { value: '1', status: 'Active' }
  ];


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateSubCategoryDialogComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private cd: CommonDialogService,
    private loader: LoaderService,
  ) {
    dialogRef.disableClose = true;
    this.id = data.id;
    this.index = data.index;
    this.selectedSubCategory = data.subCategory;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setValues();
  }


  initializeForm() {
    this.addSubCategoryForm = this.formBuilder.group({
      categoryId: ['', Validators.required],
      subCategoryName: ['', Validators.required],
      subCategoryCode: ['', Validators.required],
      subCategoryAddDate: ['', Validators.required],
      subCategoryStatus: ['', Validators.required],
      subCategoryDescription: ['', Validators.required],
    });
  }

  setValues() {
    if (this.id == 'edit-sub-category') {
      this.editCategory(this.selectedSubCategory);
      console.log('index', this.index);
    }
  }

  get isAddSubCategoryFormValid(): boolean {
    return this.addSubCategoryForm.valid;
  }

  generateSubCategoryCode() {
    const form = this.addSubCategoryForm;
    if (!form) {
      throw new Error('Form not initialized');
    }

    const categoryId = form.get('categoryId')?.value;
    let subCategoryName = form.get('subCategoryName')?.value;
    if (!categoryId || !subCategoryName) {
      throw new Error('Form values missing or invalid');
    }

    // Find category object
    const category = this.productCategories.find((category: any) => category.productCategoryId == categoryId);
    if (!category) {
      throw new Error(`Category with ID '${categoryId}' not found`);
    }

    const categoryCode = category.productCategoryName.substring(0, 3).toUpperCase();
    subCategoryName = subCategoryName.substring(0, 3).toUpperCase().padEnd(3, 'IN');

    // Generate a unique ID based on current date and time in milliseconds
    const currentDate = new Date();
    const uniqueId = currentDate.getTime().toString().slice(-6); // Take last 6 digits of the timestamp

    // Get the current month name
    const monthName = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
    const firstTwoChars = monthName.substring(0, 2); // Get the first two characters of the month name
    const lastChar = monthName.slice(-1); // Get the last character of the month name

    // Construct the sub category code with the month name characters
    const generatedSubCatCode = `${categoryCode}-${subCategoryName}-${firstTwoChars}-${uniqueId}-${lastChar}`;

    // Optionally, update the form control with the generated sub category code
    form.get('subCategoryCode')?.setValue(generatedSubCatCode); // Adjust 'subCategoryCode' to your actual form control name
    console.log('Generated Sub Category Code:', generatedSubCatCode);
  }

  editCategory(selectedSubCategory: any) {
    this.addSubCategoryForm.patchValue({
      categoryId: selectedSubCategory?.categoryId,
      subCategoryName: selectedSubCategory?.subCategoryName,
      subCategoryCode: selectedSubCategory?.subCategoryCode,
      subCategoryAddDate: selectedSubCategory?.subCategoryAddDate,
      subCategoryStatus: selectedSubCategory?.subCategoryStatus,
      subCategoryDescription: selectedSubCategory?.subCategoryDescription,
    })
  }


  getcategoryIdName(productCategoryId: number): string | undefined {
    const categoryId = this.productCategories.find((category: any) => category.productCategoryId == productCategoryId);
    return categoryId ? categoryId.productCategoryName : undefined;
  }

  /*--------
  ---------- final submission ----------
  ----------*/
  onSubmit() {
    console.log('addSubCategoryForm Value', this.addSubCategoryForm?.value);

    const categoryIdName = this.getcategoryIdName(this.addSubCategoryForm?.get('categoryId')?.value);
    let formValue: any = this.addSubCategoryForm?.value;
    formValue = {
      ...formValue,
      categoryIdName: categoryIdName,
    };

    this.cd.openConfirmModal('Are you sure you want to appove the request?', () => {
      this.loader.startLoader();
      this.inventoryService.addSubCategory(formValue);
    });

    this.dialogRef.close({
      index: this.index === 0 ? this.index : (this.index ? this.index : '')
    });
    // const navigateurl = `/inventory/products`;
    // this.router.navigateByUrl(navigateurl);
  }

  // utility functions
  getFormValidationErrors() {
    const result: any = [];
    Object.keys(this.addSubCategoryForm?.controls).forEach((key) => {
      const controlErrors: any = this.addSubCategoryForm?.get(key)?.errors;
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

