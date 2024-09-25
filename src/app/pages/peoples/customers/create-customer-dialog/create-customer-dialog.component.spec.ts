import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerDialogComponent } from './create-customer-dialog.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PeoplesService } from '../../peoples.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';
import { CommonDialogService } from 'src/app/services/Common dialog service/common-dialog-service.service';

describe('CreateCustomerDialogComponent', () => {
  let component: CreateCustomerDialogComponent;
  let fixture: ComponentFixture<CreateCustomerDialogComponent>;

  let mockPeoplesService: any;
  let mockDialogService: any;
  let mockLoaderService: any;
  let mockDialogRef: any;

  beforeEach(async () => {
    mockPeoplesService = jasmine.createSpyObj(['addCustomer']);
    mockDialogService = jasmine.createSpyObj(['openConfirmModal']);
    mockLoaderService = jasmine.createSpyObj(['startLoader', 'stopLoader']);
    mockDialogRef = jasmine.createSpyObj(['close']);

    await TestBed.configureTestingModule({
      declarations: [CreateCustomerDialogComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: PeoplesService, useValue: mockPeoplesService },
        { provide: CommonDialogService, useValue: mockDialogService },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: { id: 'add-customer', index: 0, customer: {} } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Test: Component creation
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Test: Form Initialization
  it('should initialize the form with empty values and required validators', () => {
    component.initializeForm();
    const form = component.addCustomerForm;

    expect(form).toBeDefined();
    expect(form.controls['customerName'].value).toBe('');
    expect(form.controls['email'].value).toBe('');
    expect(form.controls['phone'].value).toBe('');
    expect(form.controls['customerName'].hasValidator(Validators.required)).toBeTrue();
  });

  // Test: Form Validity - Valid Case
  it('should return true when the form is valid', () => {
    component.initializeForm();
    component.addCustomerForm.patchValue({
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      city: 'New York',
      country: 'USA',
      address: '123 Main St',
      customerAddDate: new Date(),
      customerStatus: '1',
      customerId: 'CUS-123',
      customerDescription: 'Regular customer',
    });

    expect(component.isAddCustomerFormValid).toBeTrue();
  });

  // Test: Form Validity - Invalid Case
  it('should return false when the form is invalid', () => {
    component.initializeForm();
    component.addCustomerForm.patchValue({
      customerName: '',
      email: '',
    });

    expect(component.isAddCustomerFormValid).toBeFalse();
  });

  // Test: Customer Code Generation
  it('should generate a unique customer code', () => {
    component.initializeForm();
    component.addCustomerForm.patchValue({
      customerName: 'John',
      phone: '1234567890',
    });

    component.generateCustomerCode();
    const generatedCode = component.addCustomerForm.controls['customerId'].value;

    expect(generatedCode).toMatch(/^JOH-\w{2}-\d{2}-\d{4}-\w{1}$/);
  });

  // Test: Image Upload - Success
  it('should successfully upload an image and store it', () => {
    const mockFile = new File([''], 'image.jpg', { type: 'image/jpeg' });
    const mockEvent = { target: { files: [mockFile] } };

    // Create a proper mock for FileReader
    const mockFileReader = jasmine.createSpyObj('FileReader', ['readAsDataURL'], {
      onload: null,
      result: null,
    });

    // Mock the FileReader's 'onload' method to be assigned
    spyOn(window, 'FileReader').and.returnValue(mockFileReader as any);

    // Trigger the file selection
    component.onFileSelected(mockEvent);

    // Simulate the `onload` event
    mockFileReader.result = 'data:image/jpeg;base64,someBase64String';
    if (mockFileReader.onload) {
      mockFileReader.onload({
        target: {
          result: mockFileReader.result
        }
      } as ProgressEvent<FileReader>);
    }

    // Assertions to check if the image is properly stored
    expect(component.images.length).toBe(1);
    expect(component.images[0].src).toBe('data:image/jpeg;base64,someBase64String');
    expect(component.images[0].name).toBe('image.jpg');
    expect(component.images[0].type).toBe('image/jpeg');
  });


  // Test: Image Upload - Invalid File Type
  it('should not allow non-jpeg file types and clear input', () => {
    const mockFile = new File([''], 'image.png', { type: 'image/png' });
    const mockEvent = { target: { files: [mockFile] } };

    spyOn(window, 'alert');
    component.onFileSelected(mockEvent);

    expect(window.alert).toHaveBeenCalledWith('Only JPG or JPEG file format is allowed.');
    expect(component.images.length).toBe(0);
  });

  // Test: Submitting the form
  it('should call the addCustomer service and close the dialog on form submission', () => {
    // Initialize the form and set form values
    component.initializeForm();
    component.addCustomerForm.patchValue({
      customerName: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      city: 'New York',
      country: 'USA',
      address: '123 Main St',
      customerAddDate: new Date(),
      customerStatus: '1',
      customerId: 'CUS-123',
      customerDescription: 'Regular customer',
    });

    // Explicitly define the parameter types for the spy
    mockDialogService.openConfirmModal.and.callFake((_: any, callback: () => void) => callback());
    mockPeoplesService.addCustomer.and.returnValue(of({}));

    // Simulate the form submission
    component.onSubmit();

    // Test if the dialog service was called
    expect(mockDialogService.openConfirmModal).toHaveBeenCalled();

    // Test if the addCustomer service was called with the correct form values
    expect(mockPeoplesService.addCustomer).toHaveBeenCalledWith(component.addCustomerForm.value);

    // Test if the dialog was closed after submission
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

});
