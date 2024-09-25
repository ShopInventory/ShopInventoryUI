import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubCategoryDialogComponent } from './create-sub-category-dialog.component';

describe('CreateSubCategoryDialogComponent', () => {
  let component: CreateSubCategoryDialogComponent;
  let fixture: ComponentFixture<CreateSubCategoryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateSubCategoryDialogComponent]
    });
    fixture = TestBed.createComponent(CreateSubCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
