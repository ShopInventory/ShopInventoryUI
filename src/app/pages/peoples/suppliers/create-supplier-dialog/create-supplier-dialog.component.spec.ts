import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSupplierDialogComponent } from './create-supplier-dialog.component';

describe('CreateSupplierDialogComponent', () => {
  let component: CreateSupplierDialogComponent;
  let fixture: ComponentFixture<CreateSupplierDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSupplierDialogComponent]
    });
    fixture = TestBed.createComponent(CreateSupplierDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
