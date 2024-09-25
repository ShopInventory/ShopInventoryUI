import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { Router } from '@angular/router';
import { CommonDialogService } from 'src/app/services/Common dialog service/common-dialog-service.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonDialogContentComponent } from 'src/app/shared/shared-component/common-dialog-content/common-dialog-content.component';
import { InventoryService } from '../../inventory.service';

@Component({
  selector: 'app-create-product-dialog',
  templateUrl: './create-product-dialog.component.html',
  styleUrls: ['./create-product-dialog.component.scss']
})
export class CreateProductDialogComponent {

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

  //Form Fields variable start
  addProductForm!: FormGroup
  //Form Fields variable end

  images: any[] = []; // Array to hold image URLs
  productCategoriesData: any = []


  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateProductDialogComponent>,
    private router: Router,
    private formBuilder: FormBuilder,
    private inventoryService: InventoryService,
    private cd: CommonDialogService,
    private loader: LoaderService,
  ) {
    dialogRef.disableClose = true;
    this.id = data.id;
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setValues();
  }


  initializeForm() {
    this.addProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productType: ['', Validators.required],
      productCategory: ['', Validators.required],
      productSubCategory: ['', Validators.required],
      productBrand: ['', Validators.required],
      productQty: ['', Validators.required],
      productUnit: ['', Validators.required],
      productSku: ['', Validators.required],
      productCreateDate: ['', Validators.required],
      productDescription: ['', Validators.required],
    });
  }

  setValues() {
  }

  get isAddProductFormValid(): boolean {
    return this.addProductForm.valid;
  }

  generateSKU() {
    const form = this.addProductForm;

    if (!form) {
      throw new Error('Form not initialized');
    }

    const productCategory = form.get('productCategory')?.value;
    const productSubCategory = form.get('productSubCategory')?.value;
    const productBrand = form.get('productBrand')?.value;

    if (!productCategory || !productSubCategory || !productBrand) {
      throw new Error('Form values missing or invalid');
    }

    // Find category object
    const category = this.productCategories.find((category: any) => category.productCategoryId == productCategory);
    if (!category) {
      throw new Error(`Category with ID '${productCategory}' not found`);
    }

    // Find subcategory object
    const subCategory = this.productCategories.find((subcat: any) => subcat.productCategoryId == productSubCategory);
    if (!subCategory) {
      throw new Error(`Subcategory with ID '${productSubCategory}' not found`);
    }

    // Find brand object
    const brand = this.brands.find((b: any) => b.brandId == productBrand);
    if (!brand) {
      throw new Error(`Brand with ID '${productBrand}' not found`);
    }

    const categoryCode = category.productCategoryName.substring(0, 3).toUpperCase();
    const subCategoryCode = subCategory.productCategoryName.substring(0, 3).toUpperCase();
    const brandCode = brand.brandCode.substring(0, 3).toUpperCase();

    // Generate a unique ID based on current date and time in milliseconds
    const currentDate = new Date();
    const uniqueId = currentDate.getTime().toString().slice(-6); // Take last 6 digits of the timestamp

    const generatedSKU = `${categoryCode}-${subCategoryCode}-${brandCode}-${uniqueId}`;

    // Optionally, update the form control with the generated SKU
    form.get('productSku')?.setValue(generatedSKU); // Adjust 'generatedSKU' to your actual form control name

    console.log('Generated SKU:', generatedSKU);
  }


  getProductTypeName(productTypeId: number): string | undefined {
    const productType = this.productTypes.find((productType: any) => productType.value == productTypeId);
    return productType ? productType.productTypeName : undefined;
  }

  getProductCategoryName(productCategoryId: number): string | undefined {
    const productCategory = this.productCategories.find((category: any) => category.productCategoryId == productCategoryId);
    return productCategory ? productCategory.productCategoryName : undefined;
  }

  getProductSubCategoryName(productSubCategoryId: number): string | undefined {
    const productSubCategory = this.productCategories.find((category: any) => category.productCategoryId == productSubCategoryId);
    return productSubCategory ? productSubCategory.productCategoryName : undefined;
  }

  getUnitName(unitId: number): string | undefined {
    const unit = this.units.find((unit: any) => unit.value == unitId);
    return unit ? unit.unitName : undefined;
  }

  getBrandName(brandId: number): string | undefined {
    const brand = this.brands.find((brand: any) => brand.brandId == brandId);
    return brand ? brand.brandName : undefined;
  }


  /*--------
  ---------- final submission ----------
  ----------*/
  onSubmit() {
    console.log('AddProductForm Value', this.addProductForm?.value);
    const productTypeName = this.getProductTypeName(this.addProductForm?.get('productType')?.value);
    const productCategoryName = this.getProductCategoryName(this.addProductForm?.get('productCategory')?.value);
    const productSubCategoryName = this.getProductCategoryName(this.addProductForm?.get('productSubCategory')?.value);
    const productUnitName = this.getUnitName(this.addProductForm?.get('productUnit')?.value);
    const productBrandName = this.getBrandName(this.addProductForm?.get('productBrand')?.value);
    let formValue: any = this.addProductForm?.value;
    formValue = {
      ...formValue,
      productTypeName: productTypeName,
      productCategoryName: productCategoryName,
      productSubCategoryName: productSubCategoryName,
      productUnitName: productUnitName,
      productBrandName: productBrandName,
    };

    this.cd.openConfirmModal('Are you sure you want to appove the request?', () => {
      this.loader.startLoader();
      this.inventoryService.addProduct(formValue);
    });
    this.dialogRef.close();
    // const navigateurl = `/inventory/products`;
    // this.router.navigateByUrl(navigateurl);
  }

  // utility functions
  getFormValidationErrors() {
    const result: any = [];
    Object.keys(this.addProductForm?.controls).forEach((key) => {
      const controlErrors: any = this.addProductForm?.get(key)?.errors;
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

  openAddCategory() {
    // this.cd.openSuccessModal('Successful !');
  }

  // Trigger file input click
  triggerFileUpload(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  // Handle file selection
  onFilesSelected(event: any) {
    const files = event.target.files;
    if (files) {
      // Convert FileList to Array
      const fileArray = Array.from(files);

      fileArray.forEach((file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          // this.images.push(e.target.result); // Add image to array
          this.images.push({
            src: e.target.result,
            name: file.name,
            size: (file.size / 1024).toFixed(2), // Size in KB
            type: file.type
          });
        };
        reader.readAsDataURL(file);
      });
    }
    event.target.value = ''; // Clear the input after upload
  }

  // Delete an image from the preview list
  deleteImage(index: number) {
    this.images.splice(index, 1); // Remove the image at the given index
  }
}

