import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';
import { PeoplesService } from '../../peoples.service';
import { CommonDialogService } from 'src/app/services/Common dialog service/common-dialog-service.service';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-create-supplier-dialog',
  templateUrl: './create-supplier-dialog.component.html',
  styleUrls: ['./create-supplier-dialog.component.scss']
})
export class CreateSupplierDialogComponent {
  @ViewChild(MatAccordion) accordion!: MatAccordion;   // Accordion reference

  panelOpenState = false;  // Track expansion panel state
  id: any;  // Identifier for dialog action (add/edit)
  index: any;  // Row index if available
  selectedSupplier: any;  // Data of the supplier to be edited

  newStateId: any;
  newStateName: any;

  //Form Fields variable start
  // Reactive form group for adding a supplier
  addSupplierForm!: FormGroup
  //Form Fields variable end

  // Array to store image data
  images: any[] = []; // Array to hold image URLs

  // Supplier status options
  supplierStatusOptions = [
    { value: '0', status: 'In-Active' },
    { value: '1', status: 'Active' }
  ];

  // State List
  statesList = [
    { stateId: '1', stateNameEn: 'Andhra Pradesh', stateNameHn: 'आंध्र प्रदेश' },
    { stateId: '2', stateNameEn: 'Arunachal Pradesh', stateNameHn: 'अरुणाचल प्रदेश' },
    { stateId: '3', stateNameEn: 'Assam', stateNameHn: 'असम' },
    { stateId: '4', stateNameEn: 'Bihar', stateNameHn: 'बिहार' },
    { stateId: '5', stateNameEn: 'Chhattisgarh', stateNameHn: 'छत्तीसगढ़' },
    { stateId: '6', stateNameEn: 'Goa', stateNameHn: 'गोवा' },
    { stateId: '7', stateNameEn: 'Gujarat', stateNameHn: 'गुजरात' },
    { stateId: '8', stateNameEn: 'Haryana', stateNameHn: 'हरियाणा' },
    { stateId: '9', stateNameEn: 'Himachal Pradesh', stateNameHn: 'हिमाचल प्रदेश' },
    { stateId: '10', stateNameEn: 'Jharkhand', stateNameHn: 'झारखंड' },
    { stateId: '11', stateNameEn: 'Karnataka', stateNameHn: 'कर्नाटका' },
    { stateId: '12', stateNameEn: 'Kerala', stateNameHn: 'केरल' },
    { stateId: '13', stateNameEn: 'Madhya Pradesh', stateNameHn: 'मध्य प्रदेश' },
    { stateId: '14', stateNameEn: 'Maharashtra', stateNameHn: 'महाराष्ट्र' },
    { stateId: '15', stateNameEn: 'Manipur', stateNameHn: 'मणिपुर' },
    { stateId: '16', stateNameEn: 'Meghalaya', stateNameHn: 'मेघालय' },
    { stateId: '17', stateNameEn: 'Mizoram', stateNameHn: 'मिजोरम' },
    { stateId: '18', stateNameEn: 'Nagaland', stateNameHn: 'नागालैंड' },
    { stateId: '19', stateNameEn: 'Odisha', stateNameHn: 'ओडिशा' },
    { stateId: '20', stateNameEn: 'Punjab', stateNameHn: 'पंजाब' },
    { stateId: '21', stateNameEn: 'Rajasthan', stateNameHn: 'राजस्थान' },
    { stateId: '22', stateNameEn: 'Sikkim', stateNameHn: 'सिक्किम' },
    { stateId: '23', stateNameEn: 'Tamil Nadu', stateNameHn: 'तमिल नाडु' },
    { stateId: '24', stateNameEn: 'Telangana', stateNameHn: 'तेलंगाना' },
    { stateId: '25', stateNameEn: 'Tripura', stateNameHn: 'त्रिपुरा' },
    { stateId: '26', stateNameEn: 'Uttar Pradesh', stateNameHn: 'उत्तर प्रदेश' },
    { stateId: '27', stateNameEn: 'Uttarakhand', stateNameHn: 'उत्तराखंड' },
    { stateId: '28', stateNameEn: 'West Bengal', stateNameHn: 'पश्चिम बंगाल' },
    { stateId: '29', stateNameEn: 'Andaman and Nicobar Islands', stateNameHn: 'अंडमान और निकोबार द्वीपसमूह' },
    { stateId: '30', stateNameEn: 'Chandigarh', stateNameHn: 'चंडीगढ़' },
    { stateId: '31', stateNameEn: 'Dadra and Nagar Haveli and Daman and Diu', stateNameHn: 'दादरा और नगर हवेली और दमन और दीव' },
    { stateId: '32', stateNameEn: 'Lakshadweep', stateNameHn: 'लक्षद्वीप' },
    { stateId: '33', stateNameEn: 'Delhi', stateNameHn: 'दिल्ली' },
    { stateId: '34', stateNameEn: 'Puducherry', stateNameHn: 'पुडुचेरी' }
  ];

  // Banks List
  banksList = [
    { bankId: '1', bankNameEn: 'State Bank of India', bankNameHn: 'भारतीय स्टेट बैंक' },
    { bankId: '2', bankNameEn: 'Punjab National Bank', bankNameHn: 'पंजाब नेशनल बैंक' },
    { bankId: '3', bankNameEn: 'HDFC Bank', bankNameHn: 'एचडीएफसी बैंक' },
    { bankId: '4', bankNameEn: 'ICICI Bank', bankNameHn: 'आईसीआईसीआई बैंक' },
    { bankId: '5', bankNameEn: 'Axis Bank', bankNameHn: 'एक्सिस बैंक' },
    { bankId: '6', bankNameEn: 'Bank of Baroda', bankNameHn: 'बैंक ऑफ बड़ौदा' },
    { bankId: '7', bankNameEn: 'Canara Bank', bankNameHn: 'कैनरा बैंक' },
    { bankId: '8', bankNameEn: 'Union Bank of India', bankNameHn: 'यूनियन बैंक ऑफ इंडिया' },
    { bankId: '9', bankNameEn: 'Kotak Mahindra Bank', bankNameHn: 'कोटक महिंद्रा बैंक' },
    { bankId: '10', bankNameEn: 'Bank of India', bankNameHn: 'बैंक ऑफ इंडिया' },
    { bankId: '11', bankNameEn: 'Indian Bank', bankNameHn: 'इंडियन बैंक' },
    { bankId: '12', bankNameEn: 'IDBI Bank', bankNameHn: 'आईडीबीआई बैंक' },
    { bankId: '13', bankNameEn: 'Central Bank of India', bankNameHn: 'सेंट्रल बैंक ऑफ इंडिया' },
    { bankId: '14', bankNameEn: 'Indian Overseas Bank', bankNameHn: 'इंडियन ओवरसीज बैंक' },
    { bankId: '15', bankNameEn: 'UCO Bank', bankNameHn: 'यूको बैंक' },
    { bankId: '16', bankNameEn: 'Bank of Maharashtra', bankNameHn: 'बैंक ऑफ महाराष्ट्र' },
    { bankId: '17', bankNameEn: 'Punjab & Sind Bank', bankNameHn: 'पंजाब और सिंध बैंक' },
    { bankId: '18', bankNameEn: 'Indian Bank', bankNameHn: 'इंडियन बैंक' },
    { bankId: '19', bankNameEn: 'Allahabad Bank', bankNameHn: 'इलाहाबाद बैंक' },
    { bankId: '20', bankNameEn: 'South Indian Bank', bankNameHn: 'साउथ इंडियन बैंक' }
  ];

  // Branch List
  branchesList = [
    { branchId: '1', branchNameEn: 'Connaught Place', branchNameHn: 'कनॉट प्लेस' },
    { branchId: '2', branchNameEn: 'Fort', branchNameHn: 'फोर्ट' },
    { branchId: '3', branchNameEn: 'Andheri East', branchNameHn: 'अंधेरी पूर्व' },
    { branchId: '4', branchNameEn: 'Bengaluru MG Road', branchNameHn: 'बेंगलुरु एमजी रोड' },
    { branchId: '5', branchNameEn: 'Bandra West', branchNameHn: 'बंदर पश्चिम' },
    { branchId: '6', branchNameEn: 'Chennai T Nagar', branchNameHn: 'चेन्नई टी नगर' },
    { branchId: '7', branchNameEn: 'Kolkata Park Street', branchNameHn: 'कोलकाता पार्क स्ट्रीट' },
    { branchId: '8', branchNameEn: 'Hyderabad Banjara Hills', branchNameHn: 'हैदराबाद बंजारा हिल्स' },
    { branchId: '9', branchNameEn: 'Ahmedabad Navrangpura', branchNameHn: 'अहमदाबाद नवरणगपुरा' },
    { branchId: '10', branchNameEn: 'Pune Camp', branchNameHn: 'पुणे कैंप' },
    { branchId: '11', branchNameEn: 'Jaipur C-Scheme', branchNameHn: 'जयपुर सी-स्कीम' },
    { branchId: '12', branchNameEn: 'Lucknow Hazratganj', branchNameHn: 'लखनऊ हज़रतगंज' },
    { branchId: '13', branchNameEn: 'Gurgaon Sector 14', branchNameHn: 'गुड़गांव सेक्टर 14' },
    { branchId: '14', branchNameEn: 'Noida Sector 18', branchNameHn: 'नोएडा सेक्टर 18' },
    { branchId: '15', branchNameEn: 'Surat Adajan', branchNameHn: 'सूरत अडाजन' },
    { branchId: '16', branchNameEn: 'Vadodara Sayajigunj', branchNameHn: 'वडोदरा सायजीगंज' },
    { branchId: '17', branchNameEn: 'Indore MG Road', branchNameHn: 'इंदौर एमजी रोड' },
    { branchId: '18', branchNameEn: 'Nashik College Road', branchNameHn: 'नाशिक कॉलेज रोड' },
    { branchId: '19', branchNameEn: 'Coimbatore RS Puram', branchNameHn: 'कोयंबटूर आरएस पुरम' },
    { branchId: '20', branchNameEn: 'Thane Manpada', branchNameHn: 'ठाणे मनपाड़ा' }
  ];



  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CreateSupplierDialogComponent>,
    private formBuilder: FormBuilder,
    private peoplesService: PeoplesService,
    private cd: CommonDialogService,
    private loader: LoaderService,
  ) {
    // Dialog setup: Prevent dialog close unless explicitly triggered
    dialogRef.disableClose = true;
    this.id = data.id;
    this.index = data.index;
    this.selectedSupplier = data.supplier;
  }

  // Initialize the form and set values
  ngOnInit(): void {
    this.initializeForm();
    this.setValues();
  }

  // Create the form with validation rules
  initializeForm() {
    this.addSupplierForm = this.formBuilder.group({
      supplierName: ['', Validators.required],
      supplierCompanyName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      gstNo: ['', Validators.required],
      panNo: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['', Validators.required],
      address: ['', Validators.required],
      supplierAddDate: ['', Validators.required],
      supplierStatus: ['', Validators.required],
      supplierId: ['', Validators.required],
      supplierDescription: ['', Validators.required],
      // supplier bank information
      supplierBankBenificiaryName: ['', Validators.required],
      supplierBankIfscCode: ['', [Validators.required, Validators.pattern(/^[A-Z]{4}0[A-Z0-9]{6}$/)]],
      supplierBankName: ['', Validators.required],
      supplierBankBranchName: ['', Validators.required],
      supplierBankAccountNo: ['', [Validators.required, Validators.maxLength(17)]],
      confirmBankAccountNo: ['', [Validators.required, this.matchingAccounts.bind(this)]]
    });
  }

  // If editing, populate form with selected supplier data
  setValues() {
    if (this.id == 'edit-supplier') {
      this.editSupplier(this.selectedSupplier);
      console.log('index', this.index);
    }
  }

  // Check form validity
  get isAddSupplierFormValid(): boolean {
    return this.addSupplierForm.valid;
  }

  // Generate a unique supplier code based on name and phone number
  generateSupplierCode() {
    const form = this.addSupplierForm;
    if (!form) {
      throw new Error('Form not initialized');
    }

    let supplierName = form.get('supplierName')?.value;
    if (!supplierName) {
      throw new Error('Form values missing or invalid');
    }

    supplierName = supplierName.substring(0, 3).toUpperCase().padEnd(3, 'IN');
    const mobNoLastDigits = form.get('phone')?.value.toString().slice(-4);

    // Generate a unique ID based on current date and time in milliseconds
    const currentDate = new Date();
    const uniqueId = currentDate.getTime().toString().slice(-2); // Take last 6 digits of the timestamp

    // Get the current month name
    const monthName = currentDate.toLocaleString('default', { month: 'long' }).toUpperCase();
    const firstTwoChars = monthName.substring(0, 2); // Get the first two characters of the month name
    const lastChar = monthName.slice(-1); // Get the last character of the month name

    // Construct the sub category code with the month name characters
    const generatedSupplierId = `${supplierName}-${firstTwoChars}-${uniqueId}-${mobNoLastDigits}-${lastChar}`;

    // Optionally, update the form control with the generated sub category code
    form.get('supplierId')?.setValue(generatedSupplierId); // Adjust 'supplierId' to your actual form control name
    console.log('Generated Supplier Code:', generatedSupplierId);
  }

  // Patch form with selected supplier data
  editSupplier(selectedSupplier: any) {
    // this.addSupplierForm.patchValue({
    //   supplierName: selectedSupplier?.supplierName,
    //   email: selectedSupplier?.email,
    //   phone: selectedSupplier?.phone,
    //   city: selectedSupplier?.city,
    //   country: selectedSupplier?.country,
    //   address: selectedSupplier?.address,
    //   supplierId: selectedSupplier?.supplierId,
    //   supplierAddDate: selectedSupplier?.supplierAddDate,
    //   supplierStatus: selectedSupplier?.supplierStatus,
    //   supplierDescription: selectedSupplier?.supplierDescription,
    // })
    this.addSupplierForm.patchValue({ ...selectedSupplier });


    // If a profile image exists, update the image array
    if (selectedSupplier?.profileImage) {
      this.images = [{
        src: selectedSupplier.profileImage.src, // Assuming profileImage has 'src' property
        name: selectedSupplier.profileImage.name,
        size: selectedSupplier.profileImage.size,
        type: selectedSupplier.profileImage.type
      }];
    }
  }

  /*--------
  ---------- final submission ----------
  ----------*/
  // Submit the supplier data
  onSubmit() {
    console.log('addSupplierForm Value', this.addSupplierForm?.value);

    let formValue: any = this.addSupplierForm?.value;

    // Include image data in the form value
    if (this.images.length > 0) {
      formValue.profileImage = this.images[0];
    }

    this.cd.openConfirmModal('Are you sure you want to add supplier details?', () => {
      this.loader.startLoader();
      this.peoplesService.addSupplier(formValue);
    });

    this.dialogRef.close({
      index: this.index === 0 ? this.index : (this.index ? this.index : '')
    });
  }

  // utility functions
  // Custom validator for matching bank account numbers
  matchingAccounts(control: FormControl): { [key: string]: boolean } | null {
    const supplierBankAccountNo = this.addSupplierForm?.get('supplierBankAccountNo')?.value;
    const confirmBankAccountNo = control.value;

    if (supplierBankAccountNo !== confirmBankAccountNo) {
      return { 'mismatch': true };
    }

    return null;
  }

  // Validate form and return errors
  getFormValidationErrors() {
    const result: any = [];
    Object.keys(this.addSupplierForm?.controls).forEach((key) => {
      const controlErrors: any = this.addSupplierForm?.get(key)?.errors;
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

  // Trigger file input click
  triggerFileUpload(fileInput: HTMLInputElement) {
    fileInput.click();
  }

  // Handle file selection and validate file type
  onFileSelected(event: any) {
    const file = event.target.files[0]; // Get the first selected file
    const fileType = file.type.toLowerCase(); // Get the file type in lowercase

    if (file) {
      // Check if the file type is not JPEG or JPG
      if (fileType !== 'image/jpeg' && fileType !== 'image/jpg') {
        // Display alert if the file type is not allowed
        alert('Only JPG or JPEG file format is allowed.');
        // Clear the input field
        event.target.value = null;
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64String = e.target.result;

        // Log the base64 encoded string to the console
        console.log('Base64 Image:', base64String);

        this.images = []; // Clear any existing image
        this.images.push({
          src: base64String, // base64 encoded image data
          name: file.name,
          size: (file.size / 1024).toFixed(2), // Size in KB
          type: file.type
        });
      };
      reader.readAsDataURL(file); // Convert image to base64 format
    }
    event.target.value = ''; // Clear the input after upload
  }

  // Delete the image from the preview
  // Remove selected image
  deleteImage() {
    this.images = []; // Clear the image array
  }


  onStateIdChange(event: any) {
    console.log('event SubServiceCategoryIdChange', event);
    this.newStateId = event.selectedRow.stateId;
    this.newStateName = event.selectedRow.stateNameEn;
  }
}
