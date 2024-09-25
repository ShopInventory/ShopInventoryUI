import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBrandDialogComponent } from './create-brand-dialog.component';

describe('CreateBrandDialogComponent', () => {
  let component: CreateBrandDialogComponent;
  let fixture: ComponentFixture<CreateBrandDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBrandDialogComponent]
    });
    fixture = TestBed.createComponent(CreateBrandDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
